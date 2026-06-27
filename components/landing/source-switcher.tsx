'use client'

import { useState } from 'react'
import {
  BarChart3Icon,
  MegaphoneIcon,
  ShoppingBagIcon,
  DatabaseIcon,
  Users,
  MousePointerClick,
  Target,
  LogOut,
  DollarSign,
  Eye,
  TrendingUp,
  ShoppingCart,
  Tag,
  UserPlus,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import { KpiStat, type KpiStatProps } from './kpi-stat'
import { MiniLineChart, MiniDonut, type DonutSegment } from './mini-charts'
import { SectionHeading } from './section-heading'

const K = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  sky: '#0ea5e9',
  teal: '#14b8a6',
  amber: '#f59e0b',
  rose: '#f43f5e',
}

interface SourceTab {
  id: string
  name: string
  subtitle: string
  accent: string
  icon: LucideIcon
  live?: boolean
  kpis: KpiStatProps[]
  lineTitle: string
  line: number[]
  donutTitle: string
  donut: DonutSegment[]
}

const kpiColors = [K.indigo, K.violet, K.sky, K.teal]

const SOURCES: SourceTab[] = [
  {
    id: 'ga',
    name: 'Web Analytics',
    subtitle: 'Traffic, engagement & conversions from Google Analytics 4',
    accent: K.sky,
    icon: BarChart3Icon,
    kpis: [
      {
        label: 'Active Users',
        value: '48.2K',
        delta: '12.4%',
        up: true,
        color: kpiColors[0],
        icon: Users,
        spark: [30, 34, 32, 40, 44, 42, 52, 58],
      },
      {
        label: 'Sessions',
        value: '162.4K',
        delta: '8.1%',
        up: true,
        color: kpiColors[1],
        icon: MousePointerClick,
        spark: [60, 58, 64, 70, 66, 78, 82, 90],
      },
      {
        label: 'Conversion Rate',
        value: '3.8%',
        delta: '0.6pp',
        up: true,
        color: kpiColors[2],
        icon: Target,
        spark: [20, 24, 22, 28, 30, 29, 34, 38],
      },
      {
        label: 'Bounce Rate',
        value: '41.2%',
        delta: '2.3%',
        up: false,
        color: kpiColors[3],
        icon: LogOut,
        spark: [60, 56, 58, 52, 50, 48, 44, 41],
      },
    ],
    lineTitle: 'Sessions Trend',
    line: [
      42, 48, 45, 55, 60, 52, 64, 70, 66, 78, 86, 80, 92, 99, 96, 110, 118, 124,
    ],
    donutTitle: 'Traffic Sources',
    donut: [
      { label: 'Organic Search', value: 42, color: K.indigo },
      { label: 'Direct', value: 26, color: K.violet },
      { label: 'Referral', value: 18, color: K.sky },
      { label: 'Social', value: 14, color: K.teal },
    ],
  },
  {
    id: 'meta',
    name: 'Paid Social',
    subtitle: 'Campaign performance across Facebook & Instagram Ads',
    accent: K.violet,
    icon: MegaphoneIcon,
    kpis: [
      {
        label: 'Ad Spend',
        value: '$42.8K',
        delta: '6.2%',
        up: true,
        color: kpiColors[0],
        icon: DollarSign,
        spark: [40, 44, 42, 50, 48, 56, 54, 60],
      },
      {
        label: 'Impressions',
        value: '3.4M',
        delta: '11.0%',
        up: true,
        color: kpiColors[1],
        icon: Eye,
        spark: [50, 54, 60, 58, 66, 72, 70, 82],
      },
      {
        label: 'Avg CTR',
        value: '1.8%',
        delta: '0.3pp',
        up: true,
        color: kpiColors[2],
        icon: MousePointerClick,
        spark: [22, 24, 23, 26, 28, 27, 30, 33],
      },
      {
        label: 'ROAS',
        value: '4.6×',
        delta: '0.4×',
        up: true,
        color: kpiColors[3],
        icon: TrendingUp,
        spark: [30, 32, 36, 34, 40, 42, 44, 48],
      },
    ],
    lineTitle: 'Daily Ad Spend',
    line: [30, 34, 40, 36, 44, 52, 48, 56, 50, 60, 58, 66, 62, 70, 74, 80],
    donutTitle: 'Spend by Platform',
    donut: [
      { label: 'Facebook', value: 58, color: K.violet },
      { label: 'Instagram', value: 42, color: K.indigo },
    ],
  },
  {
    id: 'ecom',
    name: 'Online Store',
    subtitle: 'Sales, orders & customer behavior from your storefront',
    accent: K.teal,
    icon: ShoppingBagIcon,
    kpis: [
      {
        label: 'Revenue',
        value: '$468.1K',
        delta: '14.0%',
        up: true,
        color: kpiColors[0],
        icon: DollarSign,
        spark: [40, 46, 44, 52, 58, 54, 66, 72],
      },
      {
        label: 'Orders',
        value: '4.7K',
        delta: '9.0%',
        up: true,
        color: kpiColors[1],
        icon: ShoppingCart,
        spark: [50, 52, 58, 56, 64, 70, 68, 78],
      },
      {
        label: 'Avg Order Value',
        value: '$100.87',
        delta: '3.0%',
        up: true,
        color: kpiColors[2],
        icon: Tag,
        spark: [60, 62, 61, 64, 66, 65, 68, 70],
      },
      {
        label: 'Cart Abandonment',
        value: '72.3%',
        delta: '2.2%',
        up: false,
        color: kpiColors[3],
        icon: ShoppingBagIcon,
        spark: [78, 77, 76, 75, 74, 73, 73, 72],
      },
    ],
    lineTitle: 'Revenue Trend',
    line: [36, 42, 38, 48, 54, 50, 62, 58, 70, 66, 78, 74, 86, 92, 88, 100],
    donutTitle: 'Revenue by Category',
    donut: [
      { label: 'Electronics', value: 32, color: K.indigo },
      { label: 'Clothing', value: 22, color: K.violet },
      { label: 'Home & Garden', value: 19, color: K.sky },
      { label: 'Sports', value: 15, color: K.teal },
      { label: 'Books', value: 12, color: K.amber },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Metrics',
    subtitle: 'Revenue, growth & retention from your application database',
    accent: K.indigo,
    icon: DatabaseIcon,
    live: true,
    kpis: [
      {
        label: 'MRR',
        value: '$124.5K',
        delta: '12.0%',
        up: true,
        color: kpiColors[0],
        icon: DollarSign,
        spark: [40, 44, 48, 52, 56, 60, 66, 72],
      },
      {
        label: 'Daily Revenue',
        value: '$18.2K',
        delta: '6.0%',
        up: true,
        color: kpiColors[1],
        icon: TrendingUp,
        spark: [44, 46, 50, 48, 54, 58, 56, 64],
      },
      {
        label: 'New Signups',
        value: '1.3K',
        delta: '18.0%',
        up: true,
        color: kpiColors[2],
        icon: UserPlus,
        spark: [30, 34, 38, 42, 40, 50, 56, 62],
      },
      {
        label: 'Churn Rate',
        value: '2.1%',
        delta: '0.4%',
        up: false,
        color: kpiColors[3],
        icon: Activity,
        spark: [30, 29, 28, 27, 26, 25, 23, 21],
      },
    ],
    lineTitle: 'Revenue Trend',
    line: [40, 44, 42, 50, 56, 52, 64, 60, 72, 70, 80, 76, 88, 92, 96, 104],
    donutTitle: 'MRR by Tier',
    donut: [
      { label: 'Enterprise', value: 50, color: K.indigo },
      { label: 'Professional', value: 28, color: K.violet },
      { label: 'Starter', value: 22, color: K.sky },
    ],
  },
]

export function SourceSwitcher() {
  const [active, setActive] = useState(0)
  const src = SOURCES[active]

  return (
    <section
      id="fuentes"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Dashboards source-aware"
        title="Una fuente, o todas. El panel se adapta a cada una."
        highlight="adapta"
        subtitle="Cambia de fuente con un clic y todo el dashboard se reconstruye — KPIs, gráficas y desglose — con los datos reales de esa fuente. El mismo motor, cuatro historias distintas."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[18rem_1fr]">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
          {SOURCES.map((s, i) => {
            const Icon = s.icon
            const on = i === active
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative flex min-w-[15rem] items-start gap-3 rounded-xl border p-3.5 text-left transition-all lg:min-w-0 ${
                  on
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {on && (
                  <span className="absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary to-accent lg:block" />
                )}
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: `${s.accent}1f`, color: s.accent }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {s.name}
                    </span>
                    {s.live && (
                      <span className="chip bg-success/10 text-success">
                        Live
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
                    {s.subtitle}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Preview */}
        <div key={src.id} className="surface animate-fade-in p-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {src.kpis.map((k) => (
              <KpiStat key={k.label} {...k} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="surface p-4 lg:col-span-2">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {src.lineTitle}
              </p>
              <div className="h-32">
                <MiniLineChart
                  key={src.id}
                  values={src.line}
                  color={src.accent}
                />
              </div>
            </div>
            <div className="surface p-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {src.donutTitle}
              </p>
              <div className="h-32">
                <MiniDonut segments={src.donut} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Así de rápido cambia entre fuentes — en la demo real es instantáneo.
          </p>
        </div>
      </div>
    </section>
  )
}
