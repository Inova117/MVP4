// Data Source Selector — switches the active dataset (drives the whole dashboard).
'use client'

import { useState, useEffect, useRef } from 'react'
import {
  CheckIcon,
  ChevronsUpDownIcon,
  BarChart3Icon,
  MegaphoneIcon,
  DatabaseIcon,
  ShoppingBagIcon,
  type LucideIcon,
} from 'lucide-react'
import {
  getAllDataSources,
  getActiveDataSource,
  setActiveDataSource,
  type DataSourceType,
} from '@/lib/mock-data/data-source-registry'

const SOURCE_META: Record<DataSourceType, { icon: LucideIcon; color: string }> =
  {
    'google-analytics': { icon: BarChart3Icon, color: '#0ea5e9' },
    'meta-ads': { icon: MegaphoneIcon, color: '#8b5cf6' },
    'internal-saas': { icon: DatabaseIcon, color: '#6366f1' },
    ecommerce: { icon: ShoppingBagIcon, color: '#14b8a6' },
  }

export function DataSourceSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSource, setActive] = useState<DataSourceType>('google-analytics')
  const ref = useRef<HTMLDivElement>(null)

  const sources = getAllDataSources()
  const current = sources.find((s) => s.id === activeSource)
  const CurrentIcon = SOURCE_META[activeSource]?.icon ?? BarChart3Icon

  useEffect(() => {
    setActive(getActiveDataSource())
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleSelect = (sourceId: DataSourceType) => {
    if (sourceId !== activeSource) {
      setActive(sourceId)
      setActiveDataSource(sourceId) // dispatches `dataSourceChanged` — dashboard reacts live
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 text-left shadow-sm transition-colors hover:border-primary/40"
      >
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
          style={{
            backgroundColor: `${SOURCE_META[activeSource]?.color}1f`,
            color: SOURCE_META[activeSource]?.color,
          }}
        >
          <CurrentIcon className="h-4 w-4" />
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Data Source
          </span>
          <span className="block max-w-[150px] truncate text-sm font-semibold text-foreground">
            {current?.name}
          </span>
        </span>
        <ChevronsUpDownIcon className="h-4 w-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-popover shadow-card-hover animate-slide-up">
          <div className="border-b border-border/70 px-4 py-2.5">
            <p className="text-xs font-medium text-muted-foreground">
              Switch source — the dashboard updates instantly
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto p-1.5 custom-scrollbar">
            {sources.map((source) => {
              const meta = SOURCE_META[source.id]
              const Icon = meta?.icon ?? BarChart3Icon
              const active = source.id === activeSource
              return (
                <button
                  key={source.id}
                  onClick={() => handleSelect(source.id)}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                >
                  <span
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                    style={{
                      backgroundColor: `${meta?.color}1f`,
                      color: meta?.color,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {source.name}
                      </span>
                      {source.status === 'active' && (
                        <span className="chip bg-success/10 text-success">
                          Live
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {source.description}
                    </span>
                  </span>
                  {active && (
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
