// Add Widget Modal - Create new widgets
'use client'

import { useState } from 'react'
import { dataClient } from '@/lib/supabase'
import type { Metric } from '@/types'
import { XIcon } from 'lucide-react'

interface AddWidgetModalProps {
    dashboardId: string
    onClose: () => void
    onSuccess: () => void
}

const widgetTypes = [
    { value: 'kpi', label: 'KPI Card', description: 'Display a single metric value' },
    { value: 'line', label: 'Line Chart', description: 'Time-series visualization' },
    { value: 'bar', label: 'Bar Chart', description: 'Categorical comparison' },
    { value: 'pie', label: 'Pie Chart', description: 'Proportional breakdown' },
] as const

export function AddWidgetModal({ dashboardId, onClose, onSuccess }: AddWidgetModalProps) {
    const [step, setStep] = useState<'type' | 'config'>('type')
    const [selectedType, setSelectedType] = useState<'kpi' | 'line' | 'bar' | 'pie'>('kpi')
    const [title, setTitle] = useState('')
    const [metricId, setMetricId] = useState('')
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState('#0ea5e9')

    // Load metrics when moving to config step
    const handleTypeSelect = async (type: typeof selectedType) => {
        setSelectedType(type)
        setStep('config')

        const availableMetrics = await dataClient.getMetrics()
        setMetrics(availableMetrics)
        if (availableMetrics.length > 0) {
            setMetricId(availableMetrics[0].id)
        }
    }

    const handleCreate = async () => {
        if (!title || !metricId) return

        setLoading(true)
        try {
            await dataClient.createWidget({
                dashboard_id: dashboardId,
                type: selectedType,
                title,
                metric_id: metricId,
                config: { color },
                position_x: 0,
                position_y: 0,
                width: selectedType === 'kpi' ? 3 : 6,
                height: selectedType === 'kpi' ? 2 : 4,
            })

            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error creating widget:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="glass bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-white/20 dark:border-white/10">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                        <div>
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Add Widget</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">Customize your dashboard view</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
                        {step === 'type' ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {widgetTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => handleTypeSelect(type.value)}
                                            className="group p-5 border border-border/60 rounded-xl hover:border-primary-500/50 hover:bg-gradient-to-br hover:from-primary-50/50 hover:to-transparent dark:hover:from-primary-950/30 transition-all duration-300 text-left relative overflow-hidden"
                                        >
                                            <div className="relative z-10">
                                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{type.label}</h3>
                                                <p className="text-sm text-muted-foreground">{type.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <button
                                        onClick={() => setStep('type')}
                                        className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 mb-6 transition-colors"
                                    >
                                        ← Back to selection
                                    </button>

                                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50 mb-6">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 font-bold">
                                            {widgetTypes.find(t => t.value === selectedType)?.label[0]}
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Selected Type</div>
                                            <div className="font-medium text-foreground">{widgetTypes.find(t => t.value === selectedType)?.label}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/80">
                                            Widget Title
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g., Monthly Revenue"
                                            className="w-full px-4 py-2.5 bg-background/50 border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-muted-foreground/50"
                                            autoFocus
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/80">
                                            Data Metric
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={metricId}
                                                onChange={(e) => setMetricId(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-background/50 border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none"
                                            >
                                                {metrics.map((metric) => (
                                                    <option key={metric.id} value={metric.id}>
                                                        {metric.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-3 pointer-events-none text-muted-foreground">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-3 text-foreground/80">
                                            Accent Color
                                        </label>
                                        <div className="flex gap-3">
                                            {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => setColor(c)}
                                                    className={`w-9 h-9 rounded-full transition-all duration-200 ${color === c ? 'ring-2 ring-offset-2 ring-foreground scale-110 shadow-md' : 'hover:scale-105 opacity-70 hover:opacity-100'
                                                        }`}
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {step === 'config' && (
                        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-border/50 bg-muted/10">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!title || !metricId || loading}
                                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm"
                            >
                                {loading ? 'Creating...' : 'Create Widget'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
