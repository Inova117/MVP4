'use client'

import { BarChart3Icon } from 'lucide-react'

export function ChartLoading() {
  return (
    <div className="flex h-full min-h-[180px] flex-col justify-end gap-2 px-2 pb-2">
      <div className="flex flex-1 items-end gap-2">
        {[40, 65, 50, 80, 60, 90, 72, 55].map((h, i) => (
          <div
            key={i}
            className="skeleton flex-1 rounded-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function ChartEmpty({
  message = 'No data for this period',
}: {
  message?: string
}) {
  return (
    <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 text-muted-foreground">
      <BarChart3Icon className="h-7 w-7 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
