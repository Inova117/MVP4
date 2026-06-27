// On-brand, dependency-free architecture diagrams (replace unreliable Mermaid CDN).
'use client'

import {
  MonitorIcon,
  ServerIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  KeyRoundIcon,
  FileCheck2Icon,
  ArrowRightIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  GitMergeIcon,
  type LucideIcon,
} from 'lucide-react'

function Node({
  icon: Icon,
  label,
  sub,
  tone = 'primary',
}: {
  icon: LucideIcon
  label: string
  sub?: string
  tone?: 'primary' | 'accent' | 'success' | 'warning' | 'muted'
}) {
  const tones: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    muted: 'bg-muted text-muted-foreground border-border',
  }
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 ${tones[tone]}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <div className="leading-tight">
        <div className="text-xs font-bold text-foreground">{label}</div>
        {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
      </div>
    </div>
  )
}

function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center ${vertical ? 'h-6 w-full' : 'h-full w-8'}`}
    >
      <ArrowRightIcon
        className={`h-4 w-4 text-muted-foreground/50 ${vertical ? 'rotate-90' : ''}`}
      />
    </div>
  )
}

function Column({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex-1">
      <p className="mb-2.5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <div className="space-y-2 rounded-2xl border border-dashed border-border bg-card-muted/50 p-3">
        {children}
      </div>
    </div>
  )
}

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      <Column title="Client">
        <Node icon={MonitorIcon} label="Browser" sub="React UI" tone="muted" />
      </Column>
      <Connector />
      <Column title="Application · Next.js">
        <Node
          icon={ServerIcon}
          label="Server Components"
          sub="RSC + SSR"
          tone="primary"
        />
        <Node
          icon={ServerIcon}
          label="API Routes"
          sub="Edge functions"
          tone="primary"
        />
        <Node
          icon={FileCheck2Icon}
          label="Zod Validation"
          sub="Runtime safety"
          tone="warning"
        />
      </Column>
      <Connector />
      <Column title="Data · Supabase">
        <Node
          icon={DatabaseIcon}
          label="PostgreSQL"
          sub="Primary store"
          tone="success"
        />
        <Node
          icon={KeyRoundIcon}
          label="Auth · JWT"
          sub="Sessions"
          tone="accent"
        />
        <Node
          icon={ShieldCheckIcon}
          label="Row Level Security"
          sub="Tenant isolation"
          tone="accent"
        />
      </Column>
    </div>
  )
}

export function ConnectorDiagram() {
  const sources = [
    'Google Analytics',
    'Meta Ads',
    'Internal DB',
    'CSV Upload',
    'REST / Webhook',
  ]
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      <Column title="Source">
        <Node icon={LayoutDashboardIcon} label="Dashboard UI" tone="muted" />
      </Column>
      <Connector />
      <Column title="Ingestion">
        <Node
          icon={GitMergeIcon}
          label="Data Factory"
          sub="Adapter pattern"
          tone="primary"
        />
        <div className="space-y-1.5 pt-1">
          {sources.map((s) => (
            <div
              key={s}
              className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
            >
              {s}
            </div>
          ))}
        </div>
      </Column>
      <Connector />
      <Column title="Output">
        <Node
          icon={DatabaseIcon}
          label="Unified Metrics"
          sub="Normalized schema"
          tone="success"
        />
        <Node
          icon={BarChart3Icon}
          label="Visualization"
          sub="Widgets & charts"
          tone="warning"
        />
      </Column>
    </div>
  )
}

// Schema relationship map (replaces the Mermaid ERD).
export function SchemaDiagram() {
  const Entity = ({
    name,
    cols,
    tone,
  }: {
    name: string
    cols: string[]
    tone: 'primary' | 'accent' | 'success' | 'warning'
  }) => {
    const tones: Record<string, string> = {
      primary: 'border-primary/30',
      accent: 'border-accent/30',
      success: 'border-success/30',
      warning: 'border-warning/30',
    }
    return (
      <div
        className={`overflow-hidden rounded-xl border-2 bg-card ${tones[tone]}`}
      >
        <div className="border-b border-border bg-card-muted px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground">
          {name}
        </div>
        <ul className="divide-y divide-border/60">
          {cols.map((c) => (
            <li
              key={c}
              className="px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Entity
          name="users"
          tone="primary"
          cols={['id · PK', 'email', 'metadata']}
        />
        <Entity
          name="dashboards"
          tone="accent"
          cols={['id · PK', 'user_id · FK', 'name', 'layout']}
        />
        <Entity
          name="widgets"
          tone="success"
          cols={['id · PK', 'dashboard_id · FK', 'type', 'config']}
        />
        <Entity
          name="metrics"
          tone="warning"
          cols={['id · PK', 'user_id · FK', 'metric_name', 'value']}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card-muted/50 px-4 py-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Relationships</span>
        <span className="font-mono">users 1—∞ dashboards</span>
        <span className="font-mono">dashboards 1—∞ widgets</span>
        <span className="font-mono">users 1—∞ metrics</span>
        <span className="font-mono">users 1—∞ alerts</span>
      </div>
    </div>
  )
}
