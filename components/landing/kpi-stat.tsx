'use client'

import { TrendingUpIcon, TrendingDownIcon, type LucideIcon } from 'lucide-react'
import { Sparkline } from './mini-charts'

export interface KpiStatProps {
  label: string
  value: string
  delta: string
  up: boolean
  color: string
  icon: LucideIcon
  spark: number[]
}

export function KpiStat({
  label,
  value,
  delta,
  up,
  color,
  icon: Icon,
  spark,
}: KpiStatProps) {
  return (
    <div className="surface flex flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
          style={{ backgroundColor: `${color}1f`, color }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="font-display text-2xl font-extrabold tabular-nums leading-none text-foreground">
        {value}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
            up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}
        >
          {up ? (
            <TrendingUpIcon className="h-3 w-3" />
          ) : (
            <TrendingDownIcon className="h-3 w-3" />
          )}
          {delta}
        </span>
        <div className="h-6 w-16">
          <Sparkline values={spark} color={color} />
        </div>
      </div>
    </div>
  )
}
