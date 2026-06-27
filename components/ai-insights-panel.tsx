// AI Insights Panel Component
'use client'

import { useState, useEffect } from 'react'
import {
  XIcon,
  SparklesIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  InfoIcon,
  RefreshCwIcon,
} from 'lucide-react'
import {
  generateInsights,
  getHealthScore,
  type Insight,
} from '@/lib/ai-insights/analyzer'
import {
  getActiveDataSource,
  type DataSourceType,
} from '@/lib/mock-data/data-source-registry'

interface AIInsightsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AIInsightsPanel({ isOpen, onClose }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [healthScore, setHealthScore] = useState<ReturnType<
    typeof getHealthScore
  > | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (isOpen) analyzeData()

    const handleSourceChange = (e: Event) =>
      analyzeData((e as CustomEvent<DataSourceType>).detail)
    window.addEventListener('dataSourceChanged', handleSourceChange)
    return () =>
      window.removeEventListener('dataSourceChanged', handleSourceChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const analyzeData = (sourceId?: DataSourceType) => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const source = sourceId || getActiveDataSource()
      setInsights(generateInsights(source))
      setHealthScore(getHealthScore(source))
      setIsAnalyzing(false)
    }, 700)
  }

  if (!isOpen) return null

  const getInsightStyle = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return { Icon: TrendingUpIcon, className: 'text-success bg-success/10' }
      case 'warning':
        return {
          Icon: AlertTriangleIcon,
          className: 'text-warning bg-warning/10',
        }
      case 'recommendation':
        return { Icon: LightbulbIcon, className: 'text-primary bg-primary/10' }
      default:
        return { Icon: InfoIcon, className: 'text-info bg-info/10' }
    }
  }

  const healthColor = () => {
    if (!healthScore) return 'bg-muted-foreground'
    switch (healthScore.status) {
      case 'excellent':
        return 'bg-success'
      case 'good':
        return 'bg-info'
      case 'needs-attention':
        return 'bg-warning'
      default:
        return 'bg-danger'
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-border bg-card shadow-2xl animate-slide-in-right sm:w-[460px]">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-primary/8 to-accent/8 px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  AI Insights
                </h2>
                <p className="text-xs text-muted-foreground">
                  Powered by Claude
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {healthScore && (
            <div className="surface p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Overall Health
                </span>
                <span className="font-display text-2xl font-bold tabular-nums text-foreground">
                  {healthScore.score}
                  <span className="text-base text-muted-foreground">/100</span>
                </span>
              </div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${healthColor()}`}
                  style={{ width: `${healthScore.score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {healthScore.summary}
              </p>
            </div>
          )}
        </div>

        {/* List */}
        <div className="flex-1 space-y-3 overflow-y-auto p-5 custom-scrollbar">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <SparklesIcon className="h-12 w-12 animate-pulse text-primary" />
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Analyzing your data…
              </p>
            </div>
          ) : insights.length === 0 ? (
            <div className="py-24 text-center">
              <InfoIcon className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No insights available
              </p>
            </div>
          ) : (
            insights.map((insight) => {
              const { Icon, className } = getInsightStyle(insight.type)
              return (
                <div
                  key={insight.id}
                  className="surface group p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${className}`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground">
                          {insight.title}
                        </h3>
                        {insight.priority === 'high' && (
                          <span className="chip shrink-0 bg-danger/10 text-danger">
                            High
                          </span>
                        )}
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        {insight.description}
                      </p>

                      {insight.metric && (
                        <div className="mb-3 flex items-center gap-3 text-xs">
                          <span className="text-muted-foreground">
                            {insight.metric}
                          </span>
                          <span className="font-bold tabular-nums text-foreground">
                            {insight.value}
                          </span>
                          {insight.change && (
                            <span
                              className={`flex items-center gap-0.5 font-semibold ${insight.change > 0 ? 'text-success' : 'text-danger'}`}
                            >
                              <TrendingUpIcon
                                className={`h-3 w-3 ${insight.change < 0 ? 'rotate-180' : ''}`}
                              />
                              {Math.abs(insight.change)}%
                            </span>
                          )}
                        </div>
                      )}

                      {insight.action && (
                        <div className="rounded-lg border border-border/60 bg-card-muted/60 p-3">
                          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-primary">
                            <LightbulbIcon className="h-3.5 w-3.5" />{' '}
                            Recommended action
                          </p>
                          <p className="text-xs text-foreground">
                            {insight.action}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-card-muted/50 px-5 py-4">
          <button
            onClick={() => analyzeData()}
            disabled={isAnalyzing}
            className="btn-primary w-full"
          >
            <RefreshCwIcon
              className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`}
            />
            {isAnalyzing ? 'Analyzing…' : 'Refresh Insights'}
          </button>
        </div>
      </div>
    </>
  )
}
