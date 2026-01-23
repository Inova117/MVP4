// Data Source Selector Component
'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon, ChevronDownIcon } from 'lucide-react'
import {
    getAllDataSources,
    getActiveDataSource,
    setActiveDataSource,
    type DataSourceType
} from '@/lib/mock-data/data-source-registry'

export function DataSourceSelector() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSource, setActive] = useState<DataSourceType>('google-analytics')

    const sources = getAllDataSources()
    const currentSource = sources.find(s => s.id === activeSource)

    useEffect(() => {
        // Load from localStorage
        setActive(getActiveDataSource())
    }, [])

    const handleSelect = (sourceId: DataSourceType) => {
        setActive(sourceId)
        setActiveDataSource(sourceId)
        setIsOpen(false)

        // Reload page to apply new data source
        window.location.reload()
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary-500 transition-all shadow-sm min-w-[280px]"
            >
                <span className="text-2xl">{currentSource?.icon}</span>
                <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-foreground">{currentSource?.name}</div>
                    <div className="text-xs text-muted-foreground">Data Source</div>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden animate-slide-up">
                        <div className="p-2 border-b border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-muted-foreground px-3 py-2">
                                Switch between different data sources to see various metrics
                            </p>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {sources.map((source) => (
                                <button
                                    key={source.id}
                                    onClick={() => handleSelect(source.id)}
                                    className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${source.id === activeSource ? 'bg-primary-50 dark:bg-primary-950/20' : ''
                                        }`}
                                >
                                    <span className="text-2xl mt-0.5">{source.icon}</span>
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-foreground">{source.name}</span>
                                            {source.id === activeSource && (
                                                <CheckCircleIcon className="w-4 h-4 text-primary-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{source.description}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${source.category === 'marketing'
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                    : source.category === 'business'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                                }`}>
                                                {source.category}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${source.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                                }`}>
                                                {source.status}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
