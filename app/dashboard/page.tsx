// Main Dashboard Page
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { DateRangeProvider } from '@/lib/contexts/date-range-context'
import { WidgetGrid } from '@/components/widgets/widget-grid'
import { DateRangeSelector } from '@/components/date-range-selector'
import { AddWidgetModal } from '@/components/widgets/add-widget-modal'
import { ExportPdfModal } from '@/components/export-pdf-modal'
import type { Dashboard, Widget } from '@/types'
import {
  PlusIcon,
  FileDownIcon,
  SparklesIcon,
  LayoutGridIcon,
} from 'lucide-react'
import { DataSourceSelector } from '@/components/data-source-selector'
import { AIInsightsPanel } from '@/components/ai-insights-panel'
import { AppShell } from '@/components/app-shell'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  getActiveDataSource,
  type DataSourceType,
} from '@/lib/mock-data/data-source-registry'
import {
  dashboardIdForSource,
  getSourceMeta,
} from '@/lib/mock-data/source-config'

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [source, setSource] = useState<DataSourceType>('google-analytics')
  const [reloadKey, setReloadKey] = useState(0)

  const loadDashboard = useCallback(async (activeSource: DataSourceType) => {
    try {
      const dash = await dataClient.getDashboard(
        dashboardIdForSource(activeSource)
      )
      if (dash) {
        setDashboard(dash)
        setWidgets(await dataClient.getWidgets(dash.id))
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load + live response to data-source changes (no full page reload).
  useEffect(() => {
    const initial = getActiveDataSource()
    setSource(initial)
    loadDashboard(initial)

    const handleSourceChange = (e: Event) => {
      const next = (e as CustomEvent<DataSourceType>).detail
      setSource(next)
      setLoading(true)
      loadDashboard(next)
      setReloadKey((k) => k + 1)
    }
    window.addEventListener('dataSourceChanged', handleSourceChange)
    return () =>
      window.removeEventListener('dataSourceChanged', handleSourceChange)
  }, [loadDashboard])

  const refresh = useCallback(() => {
    loadDashboard(source)
    setReloadKey((k) => k + 1)
  }, [loadDashboard, source])

  const meta = getSourceMeta(source)

  const actions = (
    <>
      <DateRangeSelector />
      <div className="mx-0.5 hidden h-6 w-px bg-border sm:block" />
      <ThemeToggle variant="bar" />
      <button
        className="hidden rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
        onClick={() => setShowExportModal(true)}
        title="Export PDF report"
      >
        <FileDownIcon className="h-5 w-5" />
      </button>
      <button
        className={`hidden items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 sm:inline-flex ${
          showAIInsights
            ? 'bg-primary text-primary-foreground shadow-glow'
            : 'bg-primary/10 text-primary hover:bg-primary/15'
        }`}
        onClick={() => setShowAIInsights(!showAIInsights)}
        title="AI Insights"
      >
        <SparklesIcon className="h-4 w-4" />
        AI Insights
      </button>
      <button className="btn-primary" onClick={() => setShowAddModal(true)}>
        <PlusIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Add Widget</span>
      </button>
    </>
  )

  return (
    <DateRangeProvider>
      <AppShell
        title={meta.name}
        subtitle={meta.subtitle}
        lead={<DataSourceSelector />}
        actions={actions}
      >
        {loading ? (
          <DashboardSkeleton />
        ) : widgets.length === 0 ? (
          <EmptyState onAdd={() => setShowAddModal(true)} />
        ) : (
          <WidgetGrid key={reloadKey} widgets={widgets} onUpdate={refresh} />
        )}

        {showAddModal && dashboard && (
          <AddWidgetModal
            dashboardId={dashboard.id}
            onClose={() => setShowAddModal(false)}
            onSuccess={refresh}
          />
        )}

        {showExportModal && dashboard && (
          <ExportPdfModal
            dashboardName={dashboard.name}
            onClose={() => setShowExportModal(false)}
          />
        )}

        <AIInsightsPanel
          isOpen={showAIInsights}
          onClose={() => setShowAIInsights(false)}
        />
      </AppShell>
    </DateRangeProvider>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="surface h-[196px] p-5">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton mt-5 h-9 w-32" />
            <div className="skeleton mt-6 h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="surface h-[304px] p-5 lg:col-span-2">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton mt-6 h-[220px] w-full" />
        </div>
        <div className="surface h-[304px] p-5">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton mx-auto mt-10 h-40 w-40 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="surface bg-grid flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <LayoutGridIcon className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-lg font-bold">Your dashboard is empty</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Add your first widget to start visualizing this data source.
      </p>
      <button className="btn-primary mt-6" onClick={onAdd}>
        <PlusIcon className="h-4 w-4" />
        Add Widget
      </button>
    </div>
  )
}
