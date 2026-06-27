// Backend & Security showcase
'use client'

import { ArchitectureOverview } from '@/components/backend/architecture-overview'
import { SecurityFeatures } from '@/components/backend/security-features'
import { DatabaseSchema } from '@/components/backend/database-schema'
import { ApiDocumentation } from '@/components/backend/api-documentation'
import { ExecutiveSummary } from '@/components/backend/executive-summary'
import { FounderHandover } from '@/components/backend/founder-handover'
import { DataConnectors } from '@/components/backend/data-connectors'
import { AppShell } from '@/components/app-shell'
import { ArrowRightIcon } from 'lucide-react'

export default function BackendPage() {
  return (
    <AppShell
      title="Backend & Security"
      subtitle="Enterprise-grade infrastructure powering the analytics platform"
      actions={
        <span className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 px-3.5 py-2 text-sm font-semibold text-success">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          Production Ready
        </span>
      }
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <ExecutiveSummary />
        <FounderHandover />
        <ArchitectureOverview />
        <DataConnectors />
        <SecurityFeatures />
        <DatabaseSchema />
        <ApiDocumentation />

        {/* Footer CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-10 text-center text-white sm:p-14">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to build your custom solution?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">
              This is one of 6 production-ready MVPs we&apos;ve built — each
              showcasing enterprise-grade architecture and best practices.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]">
                Schedule a Demo
                <ArrowRightIcon className="h-4 w-4" />
              </button>
              <button className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                View Other MVPs
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
