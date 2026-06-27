import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

export function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-10 text-center text-white sm:p-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Explora Nexus con datos reales, ahora mismo.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">
            Entra a la demo en vivo y cambia entre fuentes, lee los AI Insights
            y exporta un reporte. Sin registro, sin fricción.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
            >
              Ver demo en vivo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/backend"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Backend &amp; Seguridad
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Hecho por Zerion Studio — uno de 6 MVPs listos para producción.
          </p>
        </div>
      </div>
    </section>
  )
}
