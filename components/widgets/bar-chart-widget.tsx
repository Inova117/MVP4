// Bar Chart Widget - time series OR categorical breakdown
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'
import {
  BRAND,
  chartColor,
  axisTick,
  gridStroke,
  tooltipStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  formatCompact,
} from '@/lib/chart-theme'
import { getBreakdownData } from '@/lib/mock-data/source-config'
import { ChartLoading, ChartEmpty } from './chart-state'

export function BarChartWidget({ widget }: { widget: Widget }) {
  const { startDate, endDate } = useDateRange()
  const [data, setData] = useState<Array<{ label: string; value: number }>>([])
  const [loading, setLoading] = useState(true)

  const breakdown = widget.config.breakdown

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      if (breakdown) {
        // Categorical breakdown — sorted desc for a clean ranking look.
        const rows = [...getBreakdownData(breakdown)].sort(
          (a, b) => b.value - a.value
        )
        setData(rows.map((r) => ({ label: r.name, value: r.value })))
      } else {
        const metricData = await dataClient.getMetricData(
          widget.metric_id,
          startDate,
          endDate
        )
        setData(
          metricData.map((d) => ({
            label: format(new Date(d.timestamp), 'MMM d'),
            value: d.value,
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

  const color = widget.config.color || BRAND

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={180}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid
          stroke={gridStroke}
          strokeOpacity={0.6}
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={axisTick}
          tickLine={false}
          axisLine={false}
          minTickGap={breakdown ? 4 : 24}
          interval={breakdown ? 0 : 'preserveStartEnd'}
          dy={8}
        />
        <YAxis
          tick={axisTick}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => formatCompact(v)}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={tooltipItemStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(v: number) => [v.toLocaleString(), widget.title]}
          cursor={{ fill: color, fillOpacity: 0.08 }}
        />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          maxBarSize={breakdown ? 56 : 28}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={breakdown ? chartColor(i) : color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
