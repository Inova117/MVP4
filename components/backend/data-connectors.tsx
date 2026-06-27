// Data Connectors Showcase Component
'use client'

import { useState } from 'react'
import {
  CheckCircleIcon,
  ClockIcon,
  CloudIcon,
  BarChart3Icon,
  MegaphoneIcon,
  TargetIcon,
  DatabaseIcon,
  FileSpreadsheetIcon,
  WebhookIcon,
  type LucideIcon,
} from 'lucide-react'
import { ConnectorDiagram } from './diagrams'

export function DataConnectors() {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(
    null
  )

  const connectors: Array<{
    id: string
    name: string
    icon: LucideIcon
    color: string
    status: 'ready' | 'planned'
    description: string
    metrics: string[]
    integration: string
  }> = [
    {
      id: 'google-analytics',
      name: 'Google Analytics 4',
      icon: BarChart3Icon,
      color: '#0ea5e9',
      status: 'ready',
      description: 'Web analytics and user behavior tracking',
      metrics: ['Active Users', 'Sessions', 'Page Views', 'Bounce Rate'],
      integration: 'OAuth 2.0 + Google Analytics Data API v1',
    },
    {
      id: 'meta-ads',
      name: 'Meta Business (FB/IG Ads)',
      icon: MegaphoneIcon,
      color: '#8b5cf6',
      status: 'ready',
      description: 'Social media advertising performance',
      metrics: ['Ad Spend', 'Impressions', 'Clicks', 'Conversions'],
      integration: 'OAuth 2.0 + Meta Marketing API',
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      icon: TargetIcon,
      color: '#6366f1',
      status: 'planned',
      description: 'Search and display advertising campaigns',
      metrics: ['Campaign Spend', 'CTR', 'Quality Score', 'ROAS'],
      integration: 'OAuth 2.0 + Google Ads API',
    },
    {
      id: 'internal-db',
      name: 'Internal Database',
      icon: DatabaseIcon,
      color: '#6366f1',
      status: 'ready',
      description: 'Custom metrics from your own database',
      metrics: ['Sales', 'Revenue', 'Custom KPIs', 'Business Events'],
      integration: 'Supabase PostgreSQL + Row Level Security',
    },
    {
      id: 'csv-upload',
      name: 'CSV / Excel Upload',
      icon: FileSpreadsheetIcon,
      color: '#14b8a6',
      status: 'planned',
      description: 'Import data from spreadsheets',
      metrics: ['Batch Imports', 'Historical Data', 'Manual Updates'],
      integration: 'File Upload + CSV Parser',
    },
    {
      id: 'api-webhook',
      name: 'REST API / Webhooks',
      icon: WebhookIcon,
      color: '#f59e0b',
      status: 'planned',
      description: 'Real-time data ingestion via API',
      metrics: ['Events', 'Transactions', 'Custom Data', 'External Systems'],
      integration: 'REST API + Event Streaming',
    },
  ]

  const statusBadge = (status: 'ready' | 'planned') =>
    status === 'ready' ? (
      <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
        <CheckCircleIcon className="h-3 w-3" />
        Available
      </span>
    ) : (
      <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
        <ClockIcon className="h-3 w-3" />
        Coming Soon
      </span>
    )

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-2 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <CloudIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Data Source Connectors
          </h2>
          <p className="text-sm text-muted-foreground">
            Plug in external platforms or your own database
          </p>
        </div>
      </div>

      <p className="mb-6 mt-4 text-sm text-muted-foreground">
        Extensible architecture supporting multiple data sources. Each connector
        implements a standard interface for seamless integration — switch
        sources live on the dashboard.
      </p>

      {/* Connector Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {connectors.map((connector) => {
          const Icon = connector.icon
          const active = selectedConnector === connector.id
          return (
            <button
              key={connector.id}
              onClick={() => setSelectedConnector(active ? null : connector.id)}
              className={`rounded-xl border-2 p-5 text-left transition-all ${
                active
                  ? 'border-primary bg-primary/5 shadow-card'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{
                      backgroundColor: `${connector.color}1f`,
                      color: connector.color,
                    }}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {connector.name}
                  </h3>
                </div>
                {statusBadge(connector.status)}
              </div>

              <p className="text-xs text-muted-foreground">
                {connector.description}
              </p>

              {active && (
                <div className="mt-4 space-y-3 border-t border-border pt-4 animate-fade-in">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-foreground">
                      Available metrics
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {connector.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-foreground">
                      Integration
                    </p>
                    <p className="rounded bg-muted p-2 font-mono text-xs text-muted-foreground">
                      {connector.integration}
                    </p>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Architecture Diagram */}
      <div className="mt-8 rounded-2xl border border-border bg-card-muted/40 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Connector Architecture
        </h3>
        <ConnectorDiagram />
      </div>

      {/* Code Example */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-2 font-mono text-xs text-slate-400">
            connectors/example.ts
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-slate-300">
          <code>{`// Connect to Google Analytics
import { createConnector } from '@/lib/connectors'

const ga4 = createConnector('google-analytics', {
  accessToken: 'ya29.a0AfH6...',
  propertyId: 'properties/123456789',
})

await ga4.connect()

const metrics = await ga4.fetchMetrics({
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31'),
})

// Metrics are automatically normalized
console.log(metrics) // [{ metric_id, value, timestamp }]`}</code>
        </pre>
      </div>
    </div>
  )
}
