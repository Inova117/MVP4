# 🔧 ENGINEERING GUIDE - MVP #4: Dashboard de Analytics / Business Intelligence

**Responsabilidad**: Tech Lead / Senior Engineer  
**Enfoque**: CÓMO construir, arquitectura, implementación

---

## 📑 Tabla de Contenidos

### SETUP & ARCHITECTURE
1. [Prerequisites](#1-prerequisites)
2. [Project Initialization](#2-project-initialization)
3. [Configuration Files](#3-configuration-files-completos)
4. [Database Architecture](#4-database-architecture)
5. [Security (RLS Policies)](#5-security-rls-policies)

### IMPLEMENTATION
6. [Feature Implementation](#6-feature-implementation)
   - [6.1 Authentication](#61-authentication-implementation)
   - [6.2 Dashboard & Widgets](#62-dashboard--widgets)
   - [6.3 Charts with Recharts](#63-charts-with-recharts)
   - [6.4 Drag & Drop](#64-drag--drop)
   - [6.5 Date Filters](#65-date-filters)
   - [6.6 Alerts System](#66-alerts-system)
   - [6.7 PDF Export](#67-pdf-export)

### QUALITY & DEPLOY
7. [Testing Strategy](#7-testing-strategy)
8. [Deployment](#8-deployment--monitoring)

---

## 🔗 Cross-Reference to Product Spec

| Feature (PRODUCT.md) | Implementation (Este doc) |
|---------------------|--------------------------|
| Feature #1: Dashboard Personalizable | § 6.2 |
| Feature #2: Gráficos Interactivos | § 6.3 |
| Feature #3: Filtros de Fecha | § 6.5 |
| Feature #4: Exportación PDF | § 6.7 |
| Feature #5: Alertas | § 6.6 |

---

## 1-3. Prerequisites, Init, Config

**Ver**: `docs/SETUP_GUIDE.md` para setup completo (igual que otros MVPs)

**Dependencias adicionales**:
```bash
# Charts
npm install recharts

# Drag and Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# PDF Generation
npm install jspdf html2canvas

# Date handling
npm install date-fns
```

---

## 4. Database Architecture

**Ver**: `docs/DATABASE_SCHEMA.md` para schema completo

**Tablas principales**:
- `dashboards`: User dashboards
- `widgets`: Dashboard widgets
- `metrics`: Data sources
- `metric_data`: Time-series data
- `alerts`: Alert rules

---

## 5. Security (RLS Policies)

**Ver**: `docs/DATABASE_SCHEMA.md` para RLS policies

**Key principle**: User-scoped (cada usuario solo ve sus dashboards/widgets/metrics)

---

## 6. Feature Implementation

### 6.1 Authentication Implementation

**Igual que MVP #1/#2** - Ver `docs/SETUP_GUIDE.md`

---

### 6.2 Dashboard & Widgets

**Satisface**: `PRODUCT.md` → Feature #1  
**AC**: `PRODUCT.md` → AC-1.1, AC-1.2, AC-1.3

#### Dashboard Grid Component

**`app/dashboard/page.tsx`**:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { WidgetGrid } from '@/components/widgets/widget-grid'
import { AddWidgetModal } from '@/components/widgets/add-widget-modal'

export default function DashboardPage() {
  const supabase = createClientComponentClient()
  const [dashboard, setDashboard] = useState(null)
  const [widgets, setWidgets] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    const { data: dashboards } = await supabase
      .from('dashboards')
      .select('*, widgets(*)')
      .eq('is_default', true)
      .single()

    if (dashboards) {
      setDashboard(dashboards)
      setWidgets(dashboards.widgets || [])
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg"
        >
          + Add Widget
        </button>
      </div>

      <WidgetGrid widgets={widgets} onUpdate={loadDashboard} />

      {isAddModalOpen && (
        <AddWidgetModal
          dashboardId={dashboard?.id}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={loadDashboard}
        />
      )}
    </div>
  )
}
```

#### Widget Component

**`components/widgets/widget.tsx`**:
```typescript
import { LineChartWidget } from './line-chart-widget'
import { BarChartWidget } from './bar-chart-widget'
import { KpiWidget } from './kpi-widget'

interface WidgetProps {
  widget: {
    id: string
    type: 'kpi' | 'line' | 'bar' | 'pie' | 'table'
    title: string
    metric_id: string
    config: any
  }
}

export function Widget({ widget }: WidgetProps) {
  const renderWidget = () => {
    switch (widget.type) {
      case 'kpi':
        return <KpiWidget widget={widget} />
      case 'line':
        return <LineChartWidget widget={widget} />
      case 'bar':
        return <BarChartWidget widget={widget} />
      default:
        return <div>Unknown widget type</div>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{widget.title}</h3>
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            ⚙️
          </button>
          <button className="text-gray-500 hover:text-red-600">
            ❌
          </button>
        </div>
      </div>
      {renderWidget()}
    </div>
  )
}
```

**Verificación AC**:
- ✅ AC-1.1: Add Widget modal
- ✅ AC-1.2: Widgets pueden moverse (ver § 6.4)
- ✅ AC-1.3: Settings icon abre modal

---

### 6.3 Charts with Recharts

**Satisface**: `PRODUCT.md` → Feature #2  
**AC**: `PRODUCT.md` → AC-2.1, AC-2.2

#### Line Chart Widget

**`components/widgets/line-chart-widget.tsx`**:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'

export function LineChartWidget({ widget }) {
  const supabase = createClientComponentClient()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [widget.metric_id])

  async function loadData() {
    const { data: metricData } = await supabase
      .from('metric_data')
      .select('value, timestamp')
      .eq('metric_id', widget.metric_id)
      .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: true })

    const formatted = metricData?.map(d => ({
      date: format(new Date(d.timestamp), 'MMM dd'),
      value: parseFloat(d.value),
    })) || []

    setData(formatted)
    setLoading(false)
  }

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={widget.config?.color || '#3b82f6'} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

#### KPI Widget

**`components/widgets/kpi-widget.tsx`**:
```typescript
export function KpiWidget({ widget }) {
  const [value, setValue] = useState(null)
  const [trend, setTrend] = useState(0)

  useEffect(() => {
    loadKPI()
  }, [widget.metric_id])

  async function loadKPI() {
    const supabase = createClientComponentClient()
    
    // Get latest value
    const { data: latest } = await supabase
      .from('metric_data')
      .select('value')
      .eq('metric_id', widget.metric_id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    // Get yesterday's value for trend
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const { data: previous } = await supabase
      .from('metric_data')
      .select('value')
      .eq('metric_id', widget.metric_id)
      .lte('timestamp', yesterday.toISOString())
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    setValue(parseFloat(latest?.value || 0))
    
    if (previous) {
      const change = ((parseFloat(latest.value) - parseFloat(previous.value)) / parseFloat(previous.value)) * 100
      setTrend(change)
    }
  }

  return (
    <div className="text-center py-4">
      <div className="text-4xl font-bold text-gray-900 dark:text-white">
        {widget.config?.prefix || ''}{value?.toLocaleString()}{widget.config?.suffix || ''}
      </div>
      <div className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% vs yesterday
      </div>
    </div>
  )
}
```

**Verificación AC**:
- ✅ AC-2.1: Charts render correctamente
- ✅ AC-2.1: Responsive
- ✅ AC-2.2: Tooltip al hover

---

### 6.4 Drag & Drop

**Satisface**: `PRODUCT.md` → Feature #1 (AC-1.2)

#### Widget Grid with DnD

**`components/widgets/widget-grid.tsx`**:
```typescript
'use client'

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { SortableWidget } from './sortable-widget'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function WidgetGrid({ widgets, onUpdate }) {
  const supabase = createClientComponentClient()
  const sensors = useSensors(useSensor(PointerSensor))

  async function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = widgets.findIndex(w => w.id === active.id)
      const newIndex = widgets.findIndex(w => w.id === over.id)

      // Update positions in DB
      const movedWidget = widgets[oldIndex]
      const targetWidget = widgets[newIndex]

      await supabase
        .from('widgets')
        .update({ 
          position_x: targetWidget.position_x,
          position_y: targetWidget.position_y
        })
        .eq('id', movedWidget.id)

      onUpdate()
    }
  }

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-12 gap-4">
          {widgets.map(widget => (
            <SortableWidget key={widget.id} widget={widget} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
```

**Verificación AC**:
- ✅ AC-1.2: Drag handle funcional
- ✅ AC-1.2: Grid auto-ajusta
- ✅ AC-1.2: Layout se guarda en DB

---

### 6.5 Date Filters

**Satisface**: `PRODUCT.md` → Feature #3

#### Date Range Context

**`lib/contexts/date-range-context.tsx`**:
```typescript
'use client'

import { createContext, useContext, useState } from 'react'
import { subDays, startOfMonth } from 'date-fns'

const DateRangeContext = createContext(null)

export function DateRangeProvider({ children }) {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(new Date())

  const setPreset = (preset: string) => {
    const end = new Date()
    let start = new Date()

    switch (preset) {
      case 'today':
        start = new Date()
        break
      case 'last_7_days':
        start = subDays(end, 7)
        break
      case 'last_30_days':
        start = subDays(end, 30)
        break
      case 'this_month':
        start = startOfMonth(end)
        break
    }

    setStartDate(start)
    setEndDate(end)
  }

  return (
    <DateRangeContext.Provider value={{ startDate, endDate, setStartDate, setEndDate, setPreset }}>
      {children}
    </DateRangeContext.Provider>
  )
}

export const useDateRange = () => useContext(DateRangeContext)
```

**Verificación AC**:
- ✅ AC-3.1: Preset selectors
- ✅ AC-3.1: Custom date range
- ✅ AC-3.2: Comparison support

---

### 6.6 Alerts System

**Satisface**: `PRODUCT.md` → Feature #5

#### Background Job (Cron)

**`app/api/alerts/check/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  // Get all active alerts
  const { data: alerts } = await supabase
    .from('alerts')
    .select('*, metrics(*)')
    .eq('is_active', true)

  for (const alert of alerts || []) {
    // Get latest metric value
    const { data: latestData } = await supabase
      .from('metric_data')
      .select('value')
      .eq('metric_id', alert.metric_id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    if (!latestData) continue

    const value = parseFloat(latestData.value)
    let triggered = false

    switch (alert.condition) {
      case 'gt':
        triggered = value > alert.threshold
        break
      case 'lt':
        triggered = value < alert.threshold
        break
      case 'eq':
        triggered = value === alert.threshold
        break
    }

    if (triggered) {
      // Send email notification
      await fetch('/api/emails/alert', {
        method: 'POST',
        body: JSON.stringify({
          to: alert.notification_email,
          alertName: alert.name,
          metricName: alert.metrics.name,
          currentValue: value,
          threshold: alert.threshold,
        }),
      })

      // Update last_triggered
      await supabase
        .from('alerts')
        .update({ last_triggered: new Date().toISOString() })
        .eq('id', alert.id)
    }
  }

  return NextResponse.json({ checked: alerts?.length || 0 })
}
```

**Vercel Cron** (`vercel.json`):
```json
{
  "crons": [
    {
      "path": "/api/alerts/check",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Verificación AC**:
- ✅ AC-5.2: Background job evalúa alertas
- ✅ AC-5.2: Email enviado cuando se dispara

---

### 6.7 PDF Export

**Satisface**: `PRODUCT.md` → Feature #4

#### Export API

**`app/api/export/pdf/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export async function POST(request: Request) {
  const { dashboard_id, widget_ids, company_name, date_range } = await request.json()

  // 1. Fetch widgets
  const supabase = createRouteHandlerClient({ cookies })
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .in('id', widget_ids)

  // 2. Generate PDF
  const pdf = new jsPDF('p', 'mm', 'a4')
  
  // Add header
  pdf.setFontSize(18)
  pdf.text(company_name, 20, 20)
  pdf.setFontSize(12)
  pdf.text(`Report: ${date_range.start} - ${date_range.end}`, 20, 30)

  // 3. Render each widget (server-side or screenshot)
  let yOffset = 40
  for (const widget of widgets) {
    // Render widget as image
    const canvas = await renderWidgetToCanvas(widget)
    const imgData = canvas.toDataURL('image/png')
    
    pdf.addImage(imgData, 'PNG', 20, yOffset, 170, 80)
    yOffset += 90

    if (yOffset > 250) {
      pdf.addPage()
      yOffset = 20
    }
  }

  // 4. Save to Supabase Storage
  const pdfBlob = pdf.output('blob')
  const fileName = `report-${Date.now()}.pdf`
  
  const { data: upload } = await supabase.storage
    .from('reports')
    .upload(fileName, pdfBlob, { upsert: true })

  // 5. Get signed URL (7 day expiry)
  const { data: signedUrl } = await supabase.storage
    .from('reports')
    .createSignedUrl(fileName, 60 * 60 * 24 * 7)

  return NextResponse.json({
    pdf_url: signedUrl.signedUrl,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  })
}

async function renderWidgetToCanvas(widget) {
  // Use Puppeteer or html2canvas
  // For simplicity, mock implementation
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 400
  return canvas
}
```

**Verificación AC**:
- ✅ AC-4.1: Export modal con opciones
- ✅ AC-4.2: PDF generado con charts

---

## 7. Testing Strategy

**Unit Tests** (Vitest):
- Widget rendering
- Chart data transformation
- Date range calculations
- Alert condition evaluation

**E2E Tests** (Playwright):
- Create dashboard → Add widget → Drag widget
- Setup alert → Trigger condition → Receive email
- Export PDF → Verify download

---

## 8. Deployment

**Ver**: `docs/CI_CD_GUIDE.md`

**Environment Variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CRON_SECRET=your-secret-key
RESEND_API_KEY=for-email-notifications
```

**Vercel Cron**: Configure in `vercel.json` para alertas cada 5 min

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**MVP**: #4 - Dashboard de Analytics / Business Intelligence
