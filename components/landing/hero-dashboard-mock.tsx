'use client'

import { useEffect, useState } from 'react'
import {
  ActivityIcon,
  BarChart3Icon,
  ChevronsUpDownIcon,
  CalendarRangeIcon,
  SparklesIcon,
  Users,
  MousePointerClick,
  Target,
  LogOut,
} from 'lucide-react'
import { KpiStat } from './kpi-stat'
import { MiniLineChart, MiniDonut } from './mini-charts'
import { InsightCard } from './insight-card'

const C = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  sky: '#0ea5e9',
  teal: '#14b8a6',
}

const KPIS = [
  {
    label: 'Active Users',
    value: '48.2K',
    delta: '12.4%',
    up: true,
    color: C.indigo,
    icon: Users,
    spark: [30, 34, 32, 40, 44, 42, 52, 58],
  },
  {
    label: 'Sessions',
    value: '162.4K',
    delta: '8.1%',
    up: true,
    color: C.violet,
    icon: MousePointerClick,
    spark: [60, 58, 64, 70, 66, 78, 82, 90],
  },
  {
    label: 'Conversion',
    value: '3.8%',
    delta: '0.6pp',
    up: true,
    color: C.sky,
    icon: Target,
    spark: [20, 24, 22, 28, 30, 29, 34, 38],
  },
  {
    label: 'Bounce Rate',
    value: '41.2%',
    delta: '2.3%',
    up: false,
    color: C.teal,
    icon: LogOut,
    spark: [60, 56, 58, 52, 50, 48, 44, 41],
  },
]

const LINE = [
  42, 48, 45, 55, 60, 52, 64, 70, 66, 78, 74, 86, 92, 88, 99, 104, 96, 110, 118,
  124,
]

const DONUT = [
  { label: 'Organic Search', value: 42, color: C.indigo },
  { label: 'Direct', value: 26, color: C.violet },
  { label: 'Referral', value: 18, color: C.sky },
  { label: 'Social', value: 14, color: C.teal },
]

export function HeroDashboardMock() {
  const [analyzing, setAnalyzing] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative">
      {/* Brand glows */}
      <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-6 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative transition-transform duration-500 lg:rotate-[-1deg] lg:hover:rotate-0">
        {/* Dashboard card */}
        <div className="surface overflow-hidden p-3 shadow-card-hover sm:p-4">
          {/* Faux topbar */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
                <ActivityIcon className="h-4 w-4 text-white" />
              </span>
              <span className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-1.5 shadow-sm">
                <span
                  className="grid h-6 w-6 place-items-center rounded-md"
                  style={{ backgroundColor: `${C.sky}1f`, color: C.sky }}
                >
                  <BarChart3Icon className="h-3.5 w-3.5" />
                </span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Data Source
                  </span>
                  <span className="block text-xs font-semibold text-foreground">
                    Google Analytics 4
                  </span>
                </span>
                <ChevronsUpDownIcon className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              <span className="hidden items-center gap-1.5 rounded-full bg-success/10 px-2 py-1 text-[10px] font-semibold text-success md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Live
              </span>
            </div>
            <span className="hidden items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 py-1.5 text-[11px] text-muted-foreground sm:inline-flex">
              <CalendarRangeIcon className="h-3.5 w-3.5" />
              Últimos 30 días
            </span>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {KPIS.map((k) => (
              <KpiStat key={k.label} {...k} />
            ))}
          </div>

          {/* Charts */}
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-3">
            <div className="surface p-3 lg:col-span-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Sessions Trend
              </p>
              <div className="h-28">
                <MiniLineChart values={LINE} color={C.indigo} />
              </div>
            </div>
            <div className="surface p-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Traffic Sources
              </p>
              <div className="h-28">
                <MiniDonut segments={DONUT} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Insights panel */}
        <div className="absolute -right-3 -top-6 hidden w-72 sm:block">
          <div className="glass rounded-2xl p-4 shadow-glow">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
                <SparklesIcon className="h-4 w-4 text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-foreground">AI Insights</p>
                <p className="text-[11px] text-muted-foreground">
                  Powered by Claude
                </p>
              </div>
              {analyzing && (
                <span className="ml-auto animate-fade-in rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                  Analizando…
                </span>
              )}
            </div>
            {!analyzing && (
              <div className="animate-slide-up">
                <InsightCard
                  type="success"
                  title="Conversiones desde Instagram +23%"
                  description="Considera mover $400 de Facebook a IG esta semana."
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
