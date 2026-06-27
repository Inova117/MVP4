import Link from 'next/link'
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
} from 'lucide-react'
import { HeroDashboardMock } from './hero-dashboard-mock'

const trust = ['Sin tarjeta', 'Datos de demo en vivo', '4 fuentes conectadas']

export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pt-14 pb-24">
      {/* Background grid + brand glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:px-8">
        <div className="animate-slide-up">
          <span className="chip bg-primary/10 text-primary">
            <SparklesIcon className="h-3.5 w-3.5" />
            Plataforma de analítica · Powered by Claude
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Toda tu operación en un panel que{' '}
            <span className="text-gradient-brand">entiende</span> tus números.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Nexus conecta Google Analytics 4, Meta Ads, tu e-commerce y tu base
            de datos en un dashboard claro y en tiempo real — con insights
            escritos por IA que te dicen qué crece, qué se cae y qué hacer. Sin
            hojas de cálculo, sin esperar al equipo técnico.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-primary px-5 py-3 text-base">
              Ver demo en vivo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/backend"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              Backend &amp; Seguridad
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircleIcon className="h-4 w-4 text-success" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-slide-up [animation-delay:120ms]">
          <HeroDashboardMock />
        </div>
      </div>
    </section>
  )
}
