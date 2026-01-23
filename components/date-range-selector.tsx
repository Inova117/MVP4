// Date Range Selector Component
'use client'

import { useDateRange, type DatePreset } from '@/lib/contexts/date-range-context'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'

const presets: { value: DatePreset; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'this_month', label: 'This month' },
    { value: 'custom', label: 'Custom range' },
]

export function DateRangeSelector() {
    const { startDate, endDate, setPreset } = useDateRange()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPreset, setSelectedPreset] = useState<DatePreset>('this_month')

    const handlePresetSelect = (preset: DatePreset) => {
        setSelectedPreset(preset)
        setPreset(preset)
        setIsOpen(false)
    }

    const displayText =
        selectedPreset === 'custom'
            ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
            : presets.find((p) => p.value === selectedPreset)?.label || 'Select range'

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
            >
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{displayText}</span>
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-20">
                        <div className="py-1">
                            {presets.map((preset) => (
                                <button
                                    key={preset.value}
                                    onClick={() => handlePresetSelect(preset.value)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition ${selectedPreset === preset.value
                                            ? 'bg-muted font-medium'
                                            : ''
                                        }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
