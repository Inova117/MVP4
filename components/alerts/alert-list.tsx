'use client'

import { format } from 'date-fns'
import { BellIcon, BellOffIcon, Trash2Icon, ArrowUpRightIcon, ArrowDownRightIcon, ActivityIcon } from 'lucide-react'
import type { Alert } from '@/types'
import { useState } from 'react'
import { getDataClient } from '@/lib/supabase'

interface AlertListProps {
    alerts: Alert[]
    onUpdate: () => void
}

export function AlertList({ alerts, onUpdate }: AlertListProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const dataClient = getDataClient()

    const handleToggle = async (alert: Alert) => {
        setLoadingId(alert.id)
        try {
            await dataClient.updateAlert(alert.id, { is_active: !alert.is_active })
            onUpdate()
        } catch (error) {
            console.error('Failed to toggle alert:', error)
        } finally {
            setLoadingId(null)
        }
    }

    const handleDelete = async (alertId: string) => {
        if (!confirm('Are you sure you want to delete this alert?')) return
        setLoadingId(alertId)
        try {
            await dataClient.deleteAlert(alertId)
            onUpdate()
        } catch (error) {
            console.error('Failed to delete alert:', error)
        } finally {
            setLoadingId(null)
        }
    }

    if (alerts.length === 0) {
        return (
            <div className="text-center py-12 glass rounded-2xl border-dashed border-2 border-border/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/10 mb-4 text-primary-500">
                    <BellOffIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No alerts configured</h3>
                <p className="text-muted-foreground text-sm">
                    Create an alert to get notified when metrics change
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${alert.is_active
                            ? 'bg-white/60 dark:bg-slate-900/60 border-border shadow-sm hover:shadow-md hover:border-primary-500/30'
                            : 'bg-slate-50/50 dark:bg-slate-900/30 border-border/50 opacity-75'
                        }`}
                >
                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-start gap-4">
                            <div
                                className={`p-3 rounded-xl ${alert.is_active
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                    }`}
                            >
                                <ActivityIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    {alert.name}
                                    {!alert.is_active && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground font-medium">
                                            Paused
                                        </span>
                                    )}
                                </h3>
                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1 font-mono">
                                        {formatCondition(alert.condition)}
                                        <span className="text-foreground font-semibold">{alert.threshold}</span>
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span>{alert.notification_email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleToggle(alert)}
                                disabled={loadingId === alert.id}
                                className={`p-2 rounded-lg transition-colors ${alert.is_active
                                        ? 'text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                        : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                title={alert.is_active ? 'Pause Alert' : 'Resume Alert'}
                            >
                                {alert.is_active ? (
                                    <BellIcon className="w-5 h-5" />
                                ) : (
                                    <BellOffIcon className="w-5 h-5" />
                                )}
                            </button>
                            <button
                                onClick={() => handleDelete(alert.id)}
                                disabled={loadingId === alert.id}
                                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                title="Delete Alert"
                            >
                                <Trash2Icon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Active Indicator Bar */}
                    {alert.is_active && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />
                    )}
                </div>
            ))}
        </div>
    )
}

function formatCondition(condition: string) {
    const map: Record<string, any> = {
        gt: <span className="flex items-center text-emerald-500"><ArrowUpRightIcon className="w-3 h-3 mr-1" /> Greater than</span>,
        lt: <span className="flex items-center text-rose-500"><ArrowDownRightIcon className="w-3 h-3 mr-1" /> Less than</span>,
        eq: 'Equal to',
        pct_change: '% Change',
    }
    return map[condition] || condition
}
