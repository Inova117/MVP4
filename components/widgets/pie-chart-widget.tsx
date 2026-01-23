// Pie Chart Widget - Proportional data visualization
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'

interface PieChartWidgetProps {
    widget: Widget
}

const COLORS = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444']

export function PieChartWidget({ widget }: PieChartWidgetProps) {
    const { startDate, endDate } = useDateRange()
    const [data, setData] = useState<Array<{ name: string; value: number }>>([])
    const [loading, setLoading] = useState(true)

    const loadData = useCallback(async () => {
        try {
            setLoading(true)

            const metricData = await dataClient.getMetricData(
                widget.metric_id,
                startDate,
                endDate
            )

            // Group data by week for pie chart
            const weeklyData: Record<string, number> = {}
            metricData.forEach((d) => {
                const week = `Week ${Math.ceil(new Date(d.timestamp).getDate() / 7)}`
                weeklyData[week] = (weeklyData[week] || 0) + d.value
            })

            const formatted = Object.entries(weeklyData).map(([name, value]) => ({
                name,
                value: Math.round(value),
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
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '12px',
                    }}
                    itemStyle={{ color: 'var(--foreground)' }}
                />
                {widget.config.showLegend && (
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '11px', color: 'var(--muted-foreground)' }}
                    />
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}
