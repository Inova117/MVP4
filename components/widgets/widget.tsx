// Widget Component - Routes to specific widget type
'use client'

import { KpiWidget } from './kpi-widget'
import { LineChartWidget } from './line-chart-widget'
import { BarChartWidget } from './bar-chart-widget'
import { PieChartWidget } from './pie-chart-widget'
import { WidgetSettingsModal } from './widget-settings-modal'
import type { Widget as WidgetType } from '@/types'
import { GripVerticalIcon, SettingsIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

interface WidgetProps {
    widget: WidgetType
    onDelete: () => void
    dragHandleProps?: Record<string, unknown>
}

export function Widget({ widget, onDelete, dragHandleProps }: WidgetProps) {
    const [showActions, setShowActions] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const renderWidget = () => {
        switch (widget.type) {
            case 'kpi':
                return <KpiWidget widget={widget} />
            case 'line':
                return <LineChartWidget widget={widget} />
            case 'bar':
                return <BarChartWidget widget={widget} />
            case 'pie':
                return <PieChartWidget widget={widget} />
            default:
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Unknown widget type: {widget.type}
                    </div>
                )
        }
    }

    return (
        <div
            className="glass-card h-full flex flex-col rounded-xl overflow-hidden group"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button
                        {...dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground/60 hover:text-primary-500 transition-colors"
                        title="Drag to move"
                    >
                        <GripVerticalIcon className="w-4 h-4" />
                    </button>
                    <h3 className="font-semibold text-sm text-foreground/90 tracking-wide uppercase text-[11px]">{widget.title}</h3>
                </div>

                {/* Actions */}
                <div
                    className={`flex items-center gap-1 transition-all duration-300 ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                        }`}
                >
                    <button
                        className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-950/30 text-muted-foreground hover:text-primary-600 rounded-md transition-colors"
                        onClick={() => setShowSettings(true)}
                        title="Settings"
                    >
                        <SettingsIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-500 rounded-md transition-colors"
                        onClick={() => {
                            if (confirm('Delete this widget?')) {
                                onDelete()
                            }
                        }}
                        title="Delete Widget"
                    >
                        <Trash2Icon className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 min-h-0 relative">
                {renderWidget()}
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <WidgetSettingsModal
                    widget={widget}
                    onClose={() => setShowSettings(false)}
                    onSuccess={() => {
                        setShowSettings(false)
                        // Force re-render by triggering parent update
                        window.location.reload()
                    }}
                />
            )}
        </div>
    )
}
