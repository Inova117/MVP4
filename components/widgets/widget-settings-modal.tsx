// Widget Settings Modal - Edit existing widgets
'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { dataClient } from '@/lib/supabase'
import type { Widget } from '@/types'
import { XIcon } from 'lucide-react'

interface WidgetSettingsModalProps {
    widget: Widget
    onClose: () => void
    onSuccess: () => void
}

export function WidgetSettingsModal({ widget, onClose, onSuccess }: WidgetSettingsModalProps) {
    const [title, setTitle] = useState(widget.title)
    const [color, setColor] = useState(widget.config.color || '#0ea5e9')
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        setLoading(true)
        try {
            await dataClient.updateWidget(widget.id, {
                title,
                config: {
                    ...widget.config,
                    color,
                },
            })

            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error updating widget:', error)
        } finally {
            setLoading(false)
        }
    }

    // Only render on client side
    if (typeof window === 'undefined') return null

    const modalContent = (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <div className="glass bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl max-w-md w-full animate-slide-up border border-white/20 dark:border-white/10 pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0">
                        <h2 className="text-lg font-bold text-foreground">Widget Settings</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground/80">
                                Widget Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2.5 bg-background/50 border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-muted-foreground/50"
                                placeholder="Enter widget title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3 text-foreground/80">
                                Accent Color
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-10 h-10 rounded-full transition-all duration-200 ${color === c
                                                ? 'ring-2 ring-offset-2 ring-foreground scale-110 shadow-md'
                                                : 'hover:scale-105 opacity-70 hover:opacity-100'
                                            }`}
                                        style={{ backgroundColor: c }}
                                        aria-label={`Select color ${c}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                            <div className="text-sm text-muted-foreground space-y-2 bg-muted/20 p-4 rounded-xl border border-border/30">
                                <div className="flex justify-between items-center">
                                    <span>Type</span>
                                    <span className="font-medium text-foreground capitalize">{widget.type} Chart</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Grid Size</span>
                                    <span className="font-medium text-foreground">{widget.width} × {widget.height}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-6 py-4 border-t border-border/50 bg-muted/10 shrink-0">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition font-medium text-sm order-2 sm:order-1"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!title || loading}
                            className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm order-1 sm:order-2"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

    return createPortal(modalContent, document.body)
}
