// Demo Mode Banner Component
'use client'

import Link from 'next/link'
import { SparklesIcon, ArrowRightIcon } from 'lucide-react'

export function DemoBanner() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

  if (!isDemoMode) return null

  return (
    <div className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-primary to-accent">
            <SparklesIcon className="h-3 w-3 text-white" />
          </span>
          <span className="font-semibold">Live Demo</span>
          <span className="hidden text-sidebar-muted sm:inline">
            — powered by realistic mock data
          </span>
        </div>
        <Link
          href="/backend"
          className="group flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 font-semibold transition-colors hover:bg-white/15"
        >
          <span className="hidden sm:inline">See the architecture</span>
          <span className="sm:hidden">Backend</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
