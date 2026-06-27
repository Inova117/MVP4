import {
  LayoutGridIcon,
  BellIcon,
  FileDownIcon,
  CalendarRangeIcon,
  MoonStarIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

interface Feature {
  icon: LucideIcon
  title: string
  body: string
  tone: 'primary' | 'accent' | 'info' | 'success' | 'warning'
}

const features: Feature[] = [
  {
    icon: LayoutGridIcon,
    tone: 'primary',
    title: 'Dashboards a tu medida',
    body: 'Arrastra, suelta y redimensiona widgets. Crea el panel exacto que tu negocio necesita.',
  },
  {
    icon: BellIcon,
    tone: 'accent',
    title: 'Alertas inteligentes',
    body: 'Recibe avisos cuando una métrica clave se dispara o cae fuera de rango.',
  },
  {
    icon: FileDownIcon,
    tone: 'info',
    title: 'Reportes en PDF',
    body: 'Exporta un informe limpio y listo para enviar a tu equipo o inversores en un clic.',
  },
  {
    icon: CalendarRangeIcon,
    tone: 'success',
    title: 'Cualquier rango de fechas',
    body: 'Compara hoy con ayer, este mes con el anterior, o el año completo.',
  },
  {
    icon: MoonStarIcon,
    tone: 'warning',
    title: 'Modo claro y oscuro',
    body: 'Una interfaz cuidada que se ve impecable a cualquier hora.',
  },
  {
    icon: SparklesIcon,
    tone: 'primary',
    title: 'IA integrada',
    body: 'Insights y health score automáticos en cada fuente, sin pedírselo a nadie.',
  },
]

const tone: Record<Feature['tone'], string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
}

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Producto"
        title="Todo lo que necesitas para decidir con datos"
        highlight="decidir"
        subtitle="Cada función es real y la puedes probar ahora mismo en la demo en vivo."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div
              key={f.title}
              className="surface group p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl transition-colors group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white ${tone[f.tone]}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
