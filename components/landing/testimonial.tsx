import { QuoteIcon } from 'lucide-react'

export function Testimonial() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <QuoteIcon className="mx-auto h-10 w-10 text-primary/20" />
        <blockquote className="mt-6 font-display text-2xl font-semibold leading-relaxed text-foreground">
          “Pasamos de revisar cinco pestañas y dos hojas de cálculo a un solo
          panel que el equipo entiende en segundos. Las decisiones que tardaban
          una semana ahora se toman en la reunión.”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            OP
          </span>
          <span className="text-left text-sm text-muted-foreground">
            Dirección de Operaciones
            <span className="block text-xs">
              Retailer omnicanal · ejemplo ilustrativo
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
