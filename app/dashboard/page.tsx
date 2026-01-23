// Main Dashboard Page
'use client'

import { useState, useEffect } from 'react'
import { dataClient } from '@/lib/supabase'
import { DateRangeProvider } from '@/lib/contexts/date-range-context'
import { WidgetGrid } from '@/components/widgets/widget-grid'
import { DateRangeSelector } from '@/components/date-range-selector'
import { AddWidgetModal } from '@/components/widgets/add-widget-modal'
import { ExportPdfModal } from '@/components/export-pdf-modal'
import type { Dashboard, Widget } from '@/types'
import { PlusIcon, FileDownIcon, LayoutDashboardIcon, BellIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { DataSourceSelector } from '@/components/data-source-selector'
import { AIInsightsPanel } from '@/components/ai-insights-panel'

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null)
    const [widgets, setWidgets] = useState<Widget[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showExportModal, setShowExportModal] = useState(false)
    const [showAIInsights, setShowAIInsights] = useState(false)

    useEffect(() => {
        loadDashboard()
    }, [])

    async function loadDashboard() {
        try {
            // Get user's default dashboard
            const dashboards = await dataClient.getDashboards()
            const defaultDashboard = dashboards.find((d) => d.is_default) || dashboards[0]

            if (defaultDashboard) {
                setDashboard(defaultDashboard)
                const dashboardWidgets = await dataClient.getWidgets(defaultDashboard.id)
                setWidgets(dashboardWidgets)
            }
        } catch (error) {
            console.error('Error loading dashboard:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (!dashboard) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Dashboard Found</h2>
                    <p className="text-muted-foreground mb-4">Create your first dashboard to get started</p>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                        Create Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <DateRangeProvider>
            <div className="min-h-screen bg-background">
                {/* Header */}
                {/* Header with Glassmorphism */}
                <div className="sticky top-0 z-20 border-b border-white/10 glass">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Top Row: Title & Data Source */}
                        <div className="flex items-center justify-between py-5 border-b border-border/30">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    {dashboard.name}
                                </h1>
                                <p className="text-sm text-muted-foreground mt-1.5 font-medium">
                                    Analytics Overview & Real-time Insights
                                </p>
                            </div>

                            <DataSourceSelector />
                        </div>

                        {/* Bottom Row: Navigation & Actions */}
                        <div className="flex items-center justify-between py-4">

                            {/* Left: Navigation Tabs */}
                            <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-primary-600 shadow-sm">
                                    <LayoutDashboardIcon className="w-4 h-4" />
                                    Dashboard
                                </div>
                                <Link
                                    href="/dashboard/alerts"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
                                >
                                    <BellIcon className="w-4 h-4" />
                                    Alerts
                                </Link>
                            </div>

                            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-border shadow-sm">
                                <DateRangeSelector />
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                    onClick={() => setShowExportModal(true)}
                                    title="Export PDF"
                                >
                                    <FileDownIcon className="w-5 h-5" />
                                </button>

                                <button
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${showAIInsights
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/50'
                                        }`}
                                    onClick={() => setShowAIInsights(!showAIInsights)}
                                    title="AI Insights (⌘I)"
                                >
                                    <SparklesIcon className="w-4 h-4" />
                                    AI Insights
                                </button>

                                <button
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 hover:shadow-glow transition-all duration-300 font-medium text-sm shadow-primary"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Widget
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {widgets.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <PlusIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No widgets yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Add your first widget to start visualizing your data
                            </p>
                            <button
                                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                                onClick={() => setShowAddModal(true)}
                            >
                                Add Widget
                            </button>
                        </div>
                    ) : (
                        <WidgetGrid
                            widgets={widgets}
                            onUpdate={loadDashboard}
                        />
                    )}
                </div>

                {/* Add Widget Modal */}
                {showAddModal && dashboard && (
                    <AddWidgetModal
                        dashboardId={dashboard.id}
                        onClose={() => setShowAddModal(false)}
                        onSuccess={loadDashboard}
                    />
                )}

                {/* Export PDF Modal */}
                {showExportModal && dashboard && (
                    <ExportPdfModal
                        dashboardName={dashboard.name}
                        onClose={() => setShowExportModal(false)}
                    />
                )}

                {/* AI Insights Panel */}
                <AIInsightsPanel
                    isOpen={showAIInsights}
                    onClose={() => setShowAIInsights(false)}
                />
            </div>
        </DateRangeProvider >
    )
}
