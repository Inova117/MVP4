import { XCircleIcon, CheckCircleIcon, XIcon, CheckIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'

const without = [
  '5 pestañas abiertas: GA, Meta, la tienda, Excel, el CRM…',
  'Cifras que no cuadran entre plataformas',
  'Reportes manuales que tardan medio día',
  'Te enteras de los problemas cuando ya pasaron',
  'Necesitas un analista para entender los números',
]

const withNexus = [
  'Un solo panel con todas tus fuentes',
  'Una sola fuente de verdad, siempre al día',
  'Reporte PDF con tu marca en 1 clic',
  'Alertas automáticas antes de que escale',
  'La IA te explica el porqué y el qué hacer',
]

export function ComparisonBand() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="El cambio"
        title="Deja de adivinar. Empieza a decidir."
        highlight="decidir"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Without */}
        <div className="rounded-2xl border border-border bg-card-muted/60 p-7">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-danger/10 text-danger">
              <XCircleIcon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-bold text-foreground">
              Sin Nexus
            </h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {without.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 text-muted-foreground"
              >
                <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* With */}
        <div className="surface relative overflow-hidden p-7 shadow-glow ring-1 ring-primary/30">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-success/10 text-success">
                  <CheckCircleIcon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Con Nexus
                </h3>
              </div>
              <span className="chip bg-primary/10 text-primary">
                Recomendado
              </span>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {withNexus.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2.5 text-foreground"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
              4 fuentes en 1 panel · AI Insights /100 · Export PDF en 1 clic
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
