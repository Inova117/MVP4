import Link from 'next/link'
import { ActivityIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Demo en vivo', href: '/dashboard' },
      { label: 'Conectores', href: '/#conectores' },
      { label: 'AI Insights', href: '/#ia' },
      { label: 'Alertas', href: '/dashboard/alerts' },
      { label: 'Seguridad', href: '/backend' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Backend & Seguridad', href: '/backend' },
      { label: 'Integraciones', href: '/backend#connectors' },
      { label: 'Estado del sistema', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Zerion Studio', href: '#' },
      { label: 'Contacto', href: 'mailto:117mgd@gmail.com' },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-card-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
              <ActivityIcon className="h-[18px] w-[18px] text-white" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-extrabold tracking-tight text-foreground">
                Nexus
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Analytics
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Analítica clara para negocios que crecen.
          </p>
          <div className="mt-4 max-w-[12rem]">
            <ThemeToggle variant="bar" />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/70">
              {col.title}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span>© 2026 Nexus Analytics · Zerion Studio</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground">
              Términos
            </Link>
            <span className="chip bg-success/10 text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Todos los sistemas operativos
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
