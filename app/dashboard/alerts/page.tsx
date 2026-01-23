'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusIcon, LayoutDashboardIcon, BellIcon } from 'lucide-react'
import { AlertList } from '@/components/alerts/alert-list'
import { CreateAlertModal } from '@/components/alerts/create-alert-modal'
import { getDataClient } from '@/lib/supabase'
import type { Alert } from '@/types'

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const dataClient = getDataClient()

    useEffect(() => {
        loadAlerts()
    }, [])

    async function loadAlerts() {
        try {
            const data = await dataClient.getAlerts()
            setAlerts(data)
        } catch (error) {
            console.error('Failed to load alerts:', error)
        } finally {
            setLoading(false)
        }
    }

    // Reuse header style from dashboard, but with different content
    // TODO: Ideally extract header component
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-20 border-b border-white/10 glass">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Alerts
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1.5 font-medium">
                                Monitor metrics and get notified
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Navigation Tabs */}
                            <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
                                >
                                    <LayoutDashboardIcon className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-primary-600 shadow-sm">
                                    <BellIcon className="w-4 h-4" />
                                    Alerts
                                </div>
                            </div>

                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 hover:shadow-glow transition-all duration-300 font-medium text-sm shadow-primary"
                            >
                                <PlusIcon className="w-4 h-4" />
                                New Alert
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <AlertList alerts={alerts} onUpdate={loadAlerts} />
                )}
            </div>

            {/* Mobile / Modals */}
            {showCreateModal && (
                <CreateAlertModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={loadAlerts}
                />
            )}
        </div>
    )
}
