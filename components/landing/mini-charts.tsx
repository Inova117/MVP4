// Lightweight, dependency-free SVG charts for the marketing page.
'use client'

function smoothPath(values: number[], w: number, h: number, pad = 6) {
  const n = values.length
  if (n < 2) return { line: '', area: '' }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => [
    (i / (n - 1)) * w,
    h - ((v - min) / range) * (h - pad * 2) - pad,
  ])
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, n - 1)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`
  }
  const area = `${d} L ${w} ${h} L 0 ${h} Z`
  return { line: d, area }
}

export function Sparkline({
  values,
  color,
  className = '',
}: {
  values: number[]
  color: string
  className?: string
}) {
  const w = 100
  const h = 32
  const { line, area } = smoothPath(values, w, h, 4)
  const id = `spk-${color.replace('#', '')}-${values.length}-${Math.round(values[0] ?? 0)}`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MiniLineChart({
  values,
  color,
  animate = true,
}: {
  values: number[]
  color: string
  animate?: boolean
}) {
  const w = 320
  const h = 130
  const { line, area } = smoothPath(values, w, h, 12)
  const id = `mlc-${color.replace('#', '')}`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={0}
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke="hsl(var(--border))"
          strokeOpacity={0.5}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        pathLength={1}
        className={animate ? 'animate-draw' : undefined}
      />
    </svg>
  )
}

export interface DonutSegment {
  label: string
  value: number
  color: string
}

export function MiniDonut({
  segments,
  centerTop,
  centerBottom,
}: {
  segments: DonutSegment[]
  centerTop?: string
  centerBottom?: string
}) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1
  const top = segments.reduce(
    (a, b) => (b.value > a.value ? b : a),
    segments[0]
  )
  const r = 42
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex h-full items-center gap-4">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
          <circle
            cx={55}
            cy={55}
            r={r}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={11}
          />
          {segments.map((s) => {
            const len = (s.value / total) * c
            const el = (
              <circle
                key={s.label}
                cx={55}
                cy={55}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={11}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            )
            offset += len
            return el
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold tabular-nums text-foreground">
            {centerTop ?? `${Math.round((top.value / total) * 100)}%`}
          </span>
          <span className="max-w-[68px] truncate text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
            {centerBottom ?? top.label}
          </span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-1.5">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {s.label}
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {Math.round((s.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
