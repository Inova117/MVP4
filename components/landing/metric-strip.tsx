const metrics = [
  { value: '4 fuentes', label: 'GA4, Meta Ads, e-commerce y base de datos' },
  { value: '< 1 s', label: 'para cambiar de fuente y recargar el panel' },
  { value: '20+ widgets', label: 'KPIs, líneas, barras y donut, drag & drop' },
  { value: '100% en vivo', label: 'datos reales de demo, no capturas' },
]

export function MetricStrip() {
  return (
    <section className="border-y border-border/70 bg-card-muted/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.value} className="bg-background px-6 py-8 text-center">
            <div className="font-display text-2xl font-extrabold tabular-nums text-foreground sm:text-3xl">
              {m.value}
            </div>
            <div className="mx-auto mt-1.5 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
