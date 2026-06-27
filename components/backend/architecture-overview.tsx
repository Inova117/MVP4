// Architecture Overview Component
'use client'

import {
  Building2Icon,
  ZapIcon,
  ShieldCheckIcon,
  RadioIcon,
} from 'lucide-react'
import { ArchitectureDiagram } from './diagrams'

const features = [
  {
    icon: ZapIcon,
    tone: 'primary',
    title: 'Serverless',
    body: 'Auto-scales with demand. Pay only for what you use.',
  },
  {
    icon: ShieldCheckIcon,
    tone: 'success',
    title: 'Type-Safe',
    body: 'TypeScript + Zod validation. Catch errors at compile time.',
  },
  {
    icon: RadioIcon,
    tone: 'accent',
    title: 'Real-time',
    body: 'Supabase real-time subscriptions. Instant updates across clients.',
  },
] as const

const toneClass: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  accent: 'bg-accent/10 text-accent',
}

export function ArchitectureOverview() {
  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Building2Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Architecture Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Modern, scalable, production-ready stack
          </p>
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="mb-6 rounded-2xl border border-border bg-card-muted/40 p-5">
        <ArchitectureDiagram />
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border bg-card-muted/40 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-lg ${toneClass[f.tone]}`}
              >
                <f.icon className="h-4 w-4" />
              </span>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack Pills */}
      <div className="mt-6 border-t border-border pt-6">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Technologies used
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js 14',
            'TypeScript',
            'Supabase',
            'PostgreSQL',
            'Tailwind CSS',
            'Zod',
            'Recharts',
            'Vercel',
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-card-muted px-3 py-1 text-sm font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
