// KPI Widget - single metric with trend + sparkline
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import {
  TrendingUpIcon,
  TrendingDownIcon,
  Users,
  MousePointerClick,
  Target,
  LogOut,
  DollarSign,
  Eye,
  TrendingUp,
  ShoppingCart,
  Tag,
  ShoppingBag,
  UserPlus,
  Activity,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { BRAND, formatCompact } from '@/lib/chart-theme'

const ICONS: Record<string, LucideIcon> = {
  Users,
  MousePointerClick,
  Target,
  LogOut,
  DollarSign,
  Eye,
  TrendingUp,
  ShoppingCart,
  Tag,
  ShoppingBag,
  UserPlus,
  Activity,
  BarChart3,
}

function aggregate(values: number[], agg: 'sum' | 'avg' | 'last'): number {
  if (values.length === 0) return 0
  if (agg === 'sum') return values.reduce((a, b) => a + b, 0)
  if (agg === 'last') return values[values.length - 1]
  return values.reduce((a, b) => a + b, 0) / values.length
}

export function KpiWidget({ widget }: { widget: Widget }) {
  const { startDate, endDate } = useDateRange()
  const [series, setSeries] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const agg = widget.config.aggregation ?? 'avg'

  const loadKPI = useCallback(async () => {
    try {
      setLoading(true)
      const data = await dataClient.getMetricData(
        widget.metric_id,
        startDate,
        endDate
      )
      setSeries(data.map((d) => d.value))
    } catch (error) {
      console.error('Error loading KPI:', error)
      setSeries([])
    } finally {
      setLoading(false)
    }
  }, [widget.metric_id, startDate, endDate])

  useEffect(() => {
    loadKPI()
  }, [loadKPI])

  if (loading) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="skeleton h-9 w-28" />
        <div className="skeleton h-10 w-full" />
      </div>
    )
  }

  const value = aggregate(series, agg)

  // Trend: aggregate first vs second half of the visible period.
  let trend = 0
  if (series.length >= 2) {
    const mid = Math.floor(series.length / 2)
    const prev = aggregate(series.slice(0, mid), agg)
    const curr = aggregate(series.slice(mid), agg)
    if (prev !== 0) trend = ((curr - prev) / Math.abs(prev)) * 100
  }

  const color = widget.config.color || BRAND
  const Icon = (widget.config.icon && ICONS[widget.config.icon]) || BarChart3

  const formatted = widget.config.compact
    ? formatCompact(value)
    : value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
  const displayValue = `${widget.config.prefix || ''}${formatted}${widget.config.suffix || ''}`

  const sparkData = series.map((v, i) => ({ i, v }))
  const up = trend >= 0
  const gradId = `spark-${widget.id}`

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-3xl font-extrabold tracking-tight tabular-nums text-foreground sm:text-[2rem]">
            {displayValue}
          </div>
          {series.length >= 2 && trend !== 0 && (
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
              }`}
            >
              {up ? (
                <TrendingUpIcon className="h-3.5 w-3.5" />
              ) : (
                <TrendingDownIcon className="h-3.5 w-3.5" />
              )}
              {Math.abs(trend).toFixed(1)}%
              <span className="font-medium text-muted-foreground">vs prev</span>
            </div>
          )}
        </div>
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}1f`, color }}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {sparkData.length > 1 && (
        <div className="mt-auto -mx-1 h-12 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sparkData}
              margin={{ top: 2, right: 2, bottom: 0, left: 2 }}
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
