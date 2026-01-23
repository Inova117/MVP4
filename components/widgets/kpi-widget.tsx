// KPI Widget - Displays single metric value with trend
'use client'

import { useState, useEffect, useCallback } from 'react'
import { dataClient } from '@/lib/supabase'
import { useDateRange } from '@/lib/contexts/date-range-context'
import type { Widget } from '@/types'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { subDays } from 'date-fns'

interface KpiWidgetProps {
    widget: Widget
}

export function KpiWidget({ widget }: KpiWidgetProps) {
    const { startDate, endDate } = useDateRange()
    const [value, setValue] = useState<number | null>(null)
    const [trend, setTrend] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    const loadKPI = useCallback(async () => {
        try {
            setLoading(true)

            // Get current period data
            const currentData = await dataClient.getMetricData(
                widget.metric_id,
                startDate,
                endDate
            )

            if (currentData.length === 0) {
                setValue(0)
                setTrend(0)
                return
            }

            // Calculate current value (average or sum based on metric)
            const currentValue =
                currentData.reduce((sum, d) => sum + d.value, 0) / currentData.length

            // Get previous period for comparison
            const daysDiff = Math.ceil(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            )
            const prevStart = subDays(startDate, daysDiff)
            const prevEnd = subDays(endDate, daysDiff)

            const prevData = await dataClient.getMetricData(
                widget.metric_id,
                prevStart,
                prevEnd
            )

            if (prevData.length > 0) {
                const prevValue =
                    prevData.reduce((sum, d) => sum + d.value, 0) / prevData.length
                const percentChange = ((currentValue - prevValue) / prevValue) * 100
                setTrend(percentChange)
            }

            setValue(currentValue)
        } catch (error) {
            console.error('Error loading KPI:', error)
            setValue(0)
        } finally {
            setLoading(false)
        }
    }, [widget.metric_id, startDate, endDate])

    useEffect(() => {
        loadKPI()
    }, [loadKPI])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[120px]">
                <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    const formattedValue = value !== null ? value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }) : '0'

    const displayValue = `${widget.config.prefix || ''}${formattedValue}${widget.config.suffix || ''}`

    return (
        <div className="flex flex-col items-center justify-center h-full py-2 animate-fade-in text-center">
            <div
                className="text-5xl font-display font-bold mb-3 tracking-tight drop-shadow-sm"
                style={{ color: widget.config.color || '#6366f1' }}
            >
                {displayValue}
            </div>

            {trend !== 0 && (
                <div
                    className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${trend >= 0
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                        }`}
                >
                    {trend >= 0 ? (
                        <TrendingUpIcon className="w-4 h-4" />
                    ) : (
                        <TrendingDownIcon className="w-4 h-4" />
                    )}
                    <span>
                        {Math.abs(trend).toFixed(1)}% vs period
                    </span>
                </div>
            )}
        </div>
    )
}
