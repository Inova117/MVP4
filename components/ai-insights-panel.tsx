// AI Insights Panel Component
'use client'

import { useState, useEffect } from 'react'
import { XIcon, SparklesIcon, TrendingUpIcon, AlertTriangleIcon, LightbulbIcon, InfoIcon } from 'lucide-react'
import { generateInsights, getHealthScore, type Insight } from '@/lib/ai-insights/analyzer'
import { getActiveDataSource, type DataSourceType } from '@/lib/mock-data/data-source-registry'

interface AIInsightsPanelProps {
    isOpen: boolean
    onClose: () => void
}

export function AIInsightsPanel({ isOpen, onClose }: AIInsightsPanelProps) {
    const [insights, setInsights] = useState<Insight[]>([])
    const [healthScore, setHealthScore] = useState<ReturnType<typeof getHealthScore> | null>(null)
    const [activeSource, setActiveSource] = useState<DataSourceType>('google-analytics')
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            analyzeData()
        }

        // Listen for data source changes
        const handleSourceChange = (e: CustomEvent) => {
            setActiveSource(e.detail)
            analyzeData(e.detail)
        }

        window.addEventListener('dataSourceChanged', handleSourceChange as EventListener)
        return () => window.removeEventListener('dataSourceChanged', handleSourceChange as EventListener)
    }, [isOpen])

    const analyzeData = (sourceId?: DataSourceType) => {
        setIsAnalyzing(true)

        // Simulate AI thinking time
        setTimeout(() => {
            const source = sourceId || getActiveDataSource()
            const newInsights = generateInsights(source)
            const health = getHealthScore(source)

            setInsights(newInsights)
            setHealthScore(health)
            setActiveSource(source)
            setIsAnalyzing(false)
        }, 800)
    }

    if (!isOpen) return null

    const getInsightIcon = (type: Insight['type']) => {
        switch (type) {
            case 'success':
                return <TrendingUpIcon className="w-5 h-5 text-emerald-600" />
            case 'warning':
                return <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
            case 'recommendation':
                return <LightbulbIcon className="w-5 h-5 text-indigo-600" />
            case 'info':
                return <InfoIcon className="w-5 h-5 text-blue-600" />
        }
    }

    const getHealthColor = () => {
        if (!healthScore) return 'bg-slate-500'
        switch (healthScore.status) {
            case 'excellent': return 'bg-emerald-500'
            case 'good': return 'bg-green-500'
            case 'needs-attention': return 'bg-amber-500'
            case 'critical': return 'bg-red-500'
        }
    }

    return (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-border">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <SparklesIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-foreground">AI Insights</h2>
                            <p className="text-xs text-muted-foreground">Powered by Claude</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Health Score */}
                {healthScore && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Overall Health</span>
                            <span className="text-2xl font-bold text-foreground">{healthScore.score}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${getHealthColor()}`}
                                style={{ width: `${healthScore.score}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">{healthScore.summary}</p>
                    </div>
                )}
            </div>

            {/* Insights List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <SparklesIcon className="w-12 h-12 text-indigo-600 animate-pulse" />
                            <div className="absolute inset-0 bg-indigo-600/20 rounded-full animate-ping" />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">Analyzing your data...</p>
                    </div>
                ) : insights.length === 0 ? (
                    <div className="text-center py-20">
                        <InfoIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No insights available</p>
                    </div>
                ) : (
                    insights.map((insight) => (
                        <div
                            key={insight.id}
                            className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-border hover:border-primary-500/30 transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {getInsightIcon(insight.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary-600 transition-colors">
                                            {insight.title}
                                        </h3>
                                        {insight.priority === 'high' && (
                                            <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                                                High Priority
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-3">
                                        {insight.description}
                                    </p>

                                    {insight.metric && (
                                        <div className="flex items-center gap-4 mb-3 text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">{insight.metric}:</span>
                                                <span className="font-semibold text-foreground">{insight.value}</span>
                                            </div>
                                            {insight.change && (
                                                <div className={`flex items-center gap-1 ${insight.change > 0 ? 'text-emerald-600' : 'text-red-600'
                                                    }`}>
                                                    <TrendingUpIcon className={`w-3 h-3 ${insight.change < 0 ? 'rotate-180' : ''}`} />
                                                    <span>{Math.abs(insight.change)}%</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {insight.action && (
                                        <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-border/50">
                                            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                                                💡 Recommended Action
                                            </p>
                                            <p className="text-xs text-foreground">
                                                {insight.action}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border bg-slate-50 dark:bg-slate-900/50">
                <button
                    onClick={() => analyzeData()}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
                >
                    <SparklesIcon className="w-4 h-4" />
                    {isAnalyzing ? 'Analyzing...' : 'Refresh Insights'}
                </button>
            </div>
        </div>
    )
}
