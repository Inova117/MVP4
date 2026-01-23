// Date Range Context - Global state for date filtering
'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { subDays, startOfMonth, startOfDay, endOfDay } from 'date-fns'

interface DateRangeContextType {
    startDate: Date
    endDate: Date
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
    setPreset: (preset: DatePreset) => void
    compareMode: boolean
    setCompareMode: (enabled: boolean) => void
}

export type DatePreset =
    | 'today'
    | 'yesterday'
    | 'last_7_days'
    | 'last_30_days'
    | 'this_month'
    | 'custom'

const DateRangeContext = createContext<DateRangeContextType | null>(null)

export function DateRangeProvider({ children }: { children: ReactNode }) {
    const [startDate, setStartDate] = useState(startOfMonth(new Date()))
    const [endDate, setEndDate] = useState(endOfDay(new Date()))
    const [compareMode, setCompareMode] = useState(false)

    const setPreset = (preset: DatePreset) => {
        const end = endOfDay(new Date())
        let start = startOfDay(new Date())

        switch (preset) {
            case 'today':
                start = startOfDay(new Date())
                break
            case 'yesterday':
                start = startOfDay(subDays(new Date(), 1))
                setEndDate(endOfDay(subDays(new Date(), 1)))
                setStartDate(start)
                return
            case 'last_7_days':
                start = startOfDay(subDays(end, 6))
                break
            case 'last_30_days':
                start = startOfDay(subDays(end, 29))
                break
            case 'this_month':
                start = startOfMonth(end)
                break
            case 'custom':
                // Don't change dates for custom
                return
        }

        setStartDate(start)
        setEndDate(end)
    }

    return (
        <DateRangeContext.Provider
            value={{
                startDate,
                endDate,
                setStartDate,
                setEndDate,
                setPreset,
                compareMode,
                setCompareMode,
            }}
        >
            {children}
        </DateRangeContext.Provider>
    )
}

export function useDateRange() {
    const context = useContext(DateRangeContext)
    if (!context) {
        throw new Error('useDateRange must be used within DateRangeProvider')
    }
    return context
}
