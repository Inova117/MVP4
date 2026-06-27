// Pie/Donut Widget - categorical breakdown
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import {
  chartColor,
  tooltipStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  formatCompact,
} from '@/lib/chart-theme'
import { getBreakdownData } from '@/lib/mock-data/source-config'
import { ChartLoading, ChartEmpty } from './chart-state'

export function PieChartWidget({ widget }: { widget: Widget }) {
  const { startDate, endDate } = useDateRange()
  const [data, setData] = useState<Array<{ name: string; value: number }>>([])
  const [loading, setLoading] = useState(true)

  const breakdown = widget.config.breakdown

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      if (breakdown) {
        setData(
          [...getBreakdownData(breakdown)].sort((a, b) => b.value - a.value)
        )
      } else {
        // Legacy / custom widgets: group the metric series by ISO week.
        const metricData = await dataClient.getMetricData(
          widget.metric_id,
          startDate,
          endDate
        )
        const weekly: Record<string, number> = {}
        metricData.forEach((d) => {
          const week = `Week ${Math.ceil(new Date(d.timestamp).getDate() / 7)}`
          weekly[week] = (weekly[week] || 0) + d.value
        })
        setData(
          Object.entries(weekly).map(([name, value]) => ({
            name,
            value: Math.round(value),
          }))
        )
      }
    } catch (error) {
      console.error('Error loading chart data:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [widget.metric_id, startDate, endDate, breakdown])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) return <ChartLoading />
  if (data.length === 0) return <ChartEmpty />

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex h-full min-h-[180px] flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative h-40 flex-1 sm:h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={chartColor(i)} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={tooltipItemStyle}
              labelStyle={tooltipLabelStyle}
              formatter={(v: number) => [
                `${v.toLocaleString()} (${((v / total) * 100).toFixed(0)}%)`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total
          </span>
          <span className="font-display text-lg font-bold tabular-nums text-foreground">
            {formatCompact(total)}
          </span>
        </div>
      </div>

      <ul className="flex-1 space-y-1.5 overflow-y-auto pr-1 text-sm custom-scrollbar sm:max-h-full">
        {data.slice(0, 6).map((d, i) => (
          <li key={d.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: chartColor(i) }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {d.name}
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
