// Date Range Selector Component
'use client'

import {
  useDateRange,
  type DatePreset,
} from '@/lib/contexts/date-range-context'
import { CalendarIcon, ChevronDownIcon, CheckIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'

const presets: { value: DatePreset; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'this_month', label: 'This month' },
]

export function DateRangeSelector() {
  const { startDate, endDate, setPreset, setStartDate, setEndDate } =
    useDateRange()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<DatePreset>('this_month')
  const [customStart, setCustomStart] = useState(
    format(startDate, 'yyyy-MM-dd')
  )
  const [customEnd, setCustomEnd] = useState(format(endDate, 'yyyy-MM-dd'))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handlePresetSelect = (preset: DatePreset) => {
    setSelectedPreset(preset)
    setPreset(preset)
    setIsOpen(false)
  }

  const applyCustom = () => {
    const s = new Date(`${customStart}T00:00:00`)
    const e = new Date(`${customEnd}T23:59:59`)
    if (s > e) return
    setStartDate(s)
    setEndDate(e)
    setSelectedPreset('custom')
    setIsOpen(false)
  }

  const displayText =
    selectedPreset === 'custom'
      ? `${format(startDate, 'MMM d')} – ${format(endDate, 'MMM d')}`
      : presets.find((p) => p.value === selectedPreset)?.label || 'Select range'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/40"
      >
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{displayText}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover shadow-card-hover animate-slide-up">
          <div className="p-1.5">
            {presets.map((preset) => {
              const active = selectedPreset === preset.value
              return (
                <button
                  key={preset.value}
                  onClick={() => handlePresetSelect(preset.value)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {preset.label}
                  {active && <CheckIcon className="h-4 w-4" />}
                </button>
              )
            })}
          </div>
          <div className="border-t border-border/70 bg-card-muted/50 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Custom range
            </p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStart}
                max={customEnd}
                onChange={(e) => setCustomStart(e.target.value)}
                className="input-field px-2 py-1.5 text-xs"
              />
              <span className="text-muted-foreground">–</span>
              <input
                type="date"
                value={customEnd}
                min={customStart}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="input-field px-2 py-1.5 text-xs"
              />
            </div>
            <button
              onClick={applyCustom}
              className="btn-primary mt-2.5 w-full py-2 text-xs"
            >
              Apply range
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
