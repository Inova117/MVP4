// Centralized chart theme — keeps every visualization on one coherent palette.

// Cohesive analytics ramp: indigo → violet → sky → teal, with amber/rose as warm accents.
export const CHART_PALETTE = [
  '#6366f1', // indigo (brand)
  '#8b5cf6', // violet (accent)
  '#0ea5e9', // sky
  '#14b8a6', // teal
  '#f59e0b', // amber
  '#f43f5e', // rose
  '#a855f7', // purple
  '#22d3ee', // cyan
]

// Brand primary used as the default series color for KPI/line/bar widgets.
export const BRAND = '#6366f1'
export const BRAND_ACCENT = '#8b5cf6'

export const SEMANTIC = {
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#f43f5e',
  info: '#0ea5e9',
}

export function chartColor(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length]
}

// Recharts inline styles that respect the active (light/dark) theme via CSS vars.
export const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'hsl(var(--popover))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  boxShadow:
    '0 4px 12px -2px rgb(16 24 40 / 0.10), 0 12px 32px -8px rgb(16 24 40 / 0.14)',
  fontSize: '12px',
  padding: '8px 12px',
}

export const tooltipItemStyle: React.CSSProperties = {
  color: 'hsl(var(--foreground))',
  fontWeight: 600,
}

export const tooltipLabelStyle: React.CSSProperties = {
  color: 'hsl(var(--muted-foreground))',
  fontSize: '11px',
  marginBottom: '2px',
  fontWeight: 500,
}

export const axisTick = {
  fontSize: 11,
  fill: 'hsl(var(--muted-foreground))',
} as const

export const gridStroke = 'hsl(var(--border))'

// Compact number formatting for axis ticks & tooltips (1.2k, 3.4M …).
export function formatCompact(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000)
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}k`
  if (abs < 1 && abs > 0) return value.toFixed(2)
  return `${Math.round(value)}`
}
