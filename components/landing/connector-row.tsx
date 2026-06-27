import {
  BarChart3Icon,
  MegaphoneIcon,
  ShoppingBagIcon,
  DatabaseIcon,
  TargetIcon,
  FileSpreadsheetIcon,
  WebhookIcon,
  type LucideIcon,
} from 'lucide-react'

interface Connector {
  name: string
  icon: LucideIcon
  color: string
  live?: boolean
  soon?: boolean
}

const connectors: Connector[] = [
  { name: 'Google Analytics 4', icon: BarChart3Icon, color: '#0ea5e9' },
  { name: 'Meta Ads · FB/IG', icon: MegaphoneIcon, color: '#8b5cf6' },
  { name: 'E-commerce', icon: ShoppingBagIcon, color: '#14b8a6' },
  { name: 'Base de datos', icon: DatabaseIcon, color: '#6366f1', live: true },
  { name: 'Google Ads', icon: TargetIcon, color: '#6366f1', soon: true },
  {
    name: 'CSV / Excel',
    icon: FileSpreadsheetIcon,
    color: '#14b8a6',
    soon: true,
  },
  {
    name: 'REST API / Webhooks',
    icon: WebhookIcon,
    color: '#f59e0b',
    soon: true,
  },
]

export function ConnectorRow() {
  return (
    <section id="conectores" className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Conecta tus fuentes en minutos — sin código
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {connectors.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.name}
              className={`inline-flex items-center gap-2.5 ${c.soon ? 'opacity-60' : ''}`}
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-lg"
                style={{ backgroundColor: `${c.color}1f`, color: c.color }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {c.name}
              </span>
              {c.live && (
                <span className="chip bg-success/10 text-success">Live</span>
              )}
              {c.soon && (
                <span className="chip bg-muted text-muted-foreground">
                  Próximamente
                </span>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Cambia de fuente y todo el panel se recalcula al instante.
      </p>
    </section>
  )
}
