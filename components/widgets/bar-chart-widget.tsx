// Bar Chart Widget - Categorical data visualization
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
    ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'

interface BarChartWidgetProps {
    widget: Widget
}

export function BarChartWidget({ widget }: BarChartWidgetProps) {
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

            const formatted = metricData.map((d) => ({
                date: format(new Date(d.timestamp), 'MMM dd'),
                value: d.value,
            }))

            setData(formatted)
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                No data available for this period
            </div>
        )
    }

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" horizontal={true} vertical={false} />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                    dy={10}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '12px',
                    }}
                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                    itemStyle={{ color: 'var(--foreground)' }}
                />
                <Bar
                    dataKey="value"
                    fill={widget.config.color || '#d946ef'}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={50}
                    className="opacity-90 hover:opacity-100 transition-opacity"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
