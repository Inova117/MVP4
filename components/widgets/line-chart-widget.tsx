// Line Chart Widget - Time series visualization
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'
import {
  BRAND,
  axisTick,
  gridStroke,
  tooltipStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  formatCompact,
} from '@/lib/chart-theme'
import { ChartLoading, ChartEmpty } from './chart-state'

export function LineChartWidget({ widget }: { widget: Widget }) {
  const { startDate, endDate } = useDateRange()
  const [data, setData] = useState<Array<{ date: string; value: number }>>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const metricData = await dataClient.getMetricData(
        widget.metric_id,
        startDate,
        endDate
      )
      setData(
        metricData.map((d) => ({
          date: format(new Date(d.timestamp), 'MMM d'),
          value: d.value,
        }))
      )
    } catch (error) {
      console.error('Error loading chart data:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [widget.metric_id, startDate, endDate])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) return <ChartLoading />
  if (data.length === 0) return <ChartEmpty />

  const color = widget.config.color || BRAND
  const { prefix = '', suffix = '' } = widget.config
  const gradId = `line-grad-${widget.id}`

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke={gridStroke}
          strokeOpacity={0.6}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={axisTick}
          tickLine={false}
          axisLine={false}
          minTickGap={28}
          dy={8}
        />
        <YAxis
          tick={axisTick}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => `${prefix}${formatCompact(v)}`}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={tooltipItemStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(v: number) => [
            `${prefix}${v.toLocaleString()}${suffix}`,
            widget.title,
          ]}
          cursor={{ stroke: color, strokeOpacity: 0.3, strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradId})`}
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
            stroke: 'hsl(var(--card))',
            fill: color,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
