import {
  TrendingUpIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  InfoIcon,
  type LucideIcon,
} from 'lucide-react'

type InsightType = 'success' | 'warning' | 'recommendation' | 'info'

const STYLES: Record<InsightType, { Icon: LucideIcon; className: string }> = {
  success: { Icon: TrendingUpIcon, className: 'bg-success/10 text-success' },
  warning: { Icon: AlertTriangleIcon, className: 'bg-warning/10 text-warning' },
  recommendation: {
    Icon: LightbulbIcon,
    className: 'bg-primary/10 text-primary',
  },
  info: { Icon: InfoIcon, className: 'bg-info/10 text-info' },
}

export interface InsightCardProps {
  type: InsightType
  title: string
  description: string
  metric?: string
  value?: string
  delta?: string
  priority?: 'Alta' | 'Media' | 'Baja'
  action?: string
  compact?: boolean
}

export function InsightCard({
  type,
  title,
  description,
  metric,
  value,
  delta,
  priority,
  action,
  compact = false,
}: InsightCardProps) {
  const { Icon, className } = STYLES[type]
  return (
    <div
      className={`surface transition-colors hover:border-primary/30 ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${className}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {priority && (
              <span
                className={`chip shrink-0 ${
                  priority === 'Alta'
                    ? 'bg-danger/10 text-danger'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {priority}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {metric && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="text-muted-foreground">{metric}</span>
              {value && (
                <span className="font-bold tabular-nums text-foreground">
                  {value}
                </span>
              )}
              {delta && (
                <span className="flex items-center gap-0.5 font-semibold text-success">
                  <TrendingUpIcon className="h-3 w-3" />
                  {delta}
                </span>
              )}
            </div>
          )}

          {action && !compact && (
            <div className="mt-3 rounded-lg border border-border/60 bg-card-muted/60 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <LightbulbIcon className="h-3.5 w-3.5" /> Acción sugerida
              </p>
              <p className="text-xs text-foreground">{action}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
