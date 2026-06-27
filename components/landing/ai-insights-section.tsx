'use client'

import { useEffect, useState } from 'react'
import { SparklesIcon, CheckCircleIcon } from 'lucide-react'
import { InsightCard } from './insight-card'

const capabilities = [
  'Health Score 0–100 por fuente, con resumen en lenguaje natural',
  'Insights clasificados: Éxito · Riesgo · Recomendación · Info',
  'Cada insight trae métrica, variación y acción sugerida',
  'Prioridad Alta/Media/Baja para atacar primero lo importante',
]

function HealthRing({ score = 82 }: { score?: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  const dash = (score / 100) * c
  return (
    <div className="surface flex items-center gap-4 p-5">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx={60}
            cy={60}
            r={r}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={10}
          />
          <circle
            cx={60}
            cy={60}
            r={r}
            fill="none"
            stroke="hsl(var(--success))"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold tabular-nums text-foreground">
            {score}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            / 100
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">
          Overall Health · Saludable
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tus métricas rinden bien, con oportunidades puntuales de optimización.
        </p>
      </div>
    </div>
  )
}

export function AiInsightsSection() {
  const [analyzing, setAnalyzing] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="ia"
      className="bg-gradient-to-b from-card-muted/40 to-transparent"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy + ring (sticky) */}
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <SparklesIcon className="h-4 w-4" /> Powered by Claude
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            No solo ves los números.{' '}
            <span className="text-gradient-brand">Entiendes</span> qué hacer con
            ellos.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            El panel de AI Insights analiza tus fuentes y entrega un health
            score y recomendaciones accionables, en lenguaje claro. Cada vez que
            cambias de fuente o de rango, Claude vuelve a analizar y reescribe
            sus conclusiones.
          </p>

          <ul className="mt-6 space-y-2.5">
            {capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-sm text-foreground"
              >
                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <HealthRing score={82} />
          </div>
        </div>

        {/* Insight stack */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="chip bg-primary/10 text-primary">
              <SparklesIcon className="h-3.5 w-3.5" /> AI Insights
            </span>
            {analyzing && (
              <span className="animate-fade-in rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-medium text-primary">
                Analizando…
              </span>
            )}
          </div>

          {!analyzing && (
            <div className="space-y-3">
              <div className="animate-slide-up">
                <InsightCard
                  type="success"
                  title="Crecimiento orgánico fuerte"
                  description="El tráfico orgánico es el 42% del total, por encima del promedio del sector (35%). Buen SEO."
                  metric="Organic Traffic"
                  value="42%"
                  delta="8.5%"
                  priority="Alta"
                  action="Mantén la inversión en contenido y SEO."
                />
              </div>
              <div className="animate-slide-up [animation-delay:80ms]">
                <InsightCard
                  type="warning"
                  title="Bounce rate elevado"
                  description="Está en 41.2%, por encima del óptimo. Los usuarios no encuentran lo que esperan en las landing pages."
                  metric="Bounce Rate"
                  value="41.2%"
                  priority="Alta"
                  action="Revisa velocidad de carga y CTAs de las landing de campaña."
                />
              </div>
              <div className="animate-slide-up [animation-delay:160ms]">
                <InsightCard
                  type="recommendation"
                  title="Oportunidad en móvil"
                  description="El móvil es el 35% del tráfico pero convierte 20% menos que desktop."
                  metric="Mobile Conversion Gap"
                  value="-20%"
                  priority="Media"
                  action="Audita el checkout móvil y optimiza el flujo."
                />
              </div>
            </div>
          )}

          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <SparklesIcon className="h-4 w-4 text-primary" />
            Se actualiza al cambiar de fuente o de rango de fechas.
          </p>
        </div>
      </div>
    </section>
  )
}
