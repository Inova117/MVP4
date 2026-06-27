'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import {
  LayoutDashboardIcon,
  BellIcon,
  PlugIcon,
  ShieldCheckIcon,
  ActivityIcon,
  MenuIcon,
  XIcon,
  SparklesIcon,
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

interface NavItem {
  href: string
  label: string
  icon: typeof LayoutDashboardIcon
  badge?: string
}

const primaryNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/dashboard/alerts', label: 'Alerts', icon: BellIcon },
]

const platformNav: NavItem[] = [
  { href: '/backend#connectors', label: 'Integrations', icon: PlugIcon },
  { href: '/backend', label: 'Backend & Security', icon: ShieldCheckIcon },
]

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem
  active: boolean
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-white/10 text-white'
          : 'text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground'
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary to-accent" />
      )}
      <Icon
        className={`h-[18px] w-[18px] transition-colors ${active ? 'text-primary-300' : ''}`}
      />
      {item.label}
      {item.badge && (
        <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary-200">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  const isActive = (href: string) => {
    const base = href.split('#')[0]
    if (base === '/dashboard') return pathname === '/dashboard'
    return pathname === base || pathname.startsWith(base + '/')
  }

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-3 px-5 py-5"
      >
        <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
          <ActivityIcon className="h-5 w-5 text-white" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-lg font-extrabold tracking-tight text-white">
            Nexus
          </span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-sidebar-muted">
            Analytics
          </span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-muted/70">
          Workspace
        </p>
        {primaryNav.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(item.href)}
            onClick={onNavigate}
          />
        ))}

        <p className="px-3 pb-1.5 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-muted/70">
          Platform
        </p>
        {platformNav.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(item.href)}
            onClick={onNavigate}
          />
        ))}
      </nav>

      {/* Upsell card */}
      <div className="mx-3 mb-3 rounded-2xl border border-sidebar-border bg-gradient-to-br from-primary/15 to-accent/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <SparklesIcon className="h-4 w-4 text-primary-300" />
          AI Insights
        </div>
        <p className="mt-1 text-xs leading-relaxed text-sidebar-muted">
          Let Claude surface trends, risks &amp; recommendations across your
          data.
        </p>
      </div>

      {/* Footer: theme + user */}
      <div className="space-y-3 border-t border-sidebar-border px-3 py-4">
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-xl px-2 py-1">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            DU
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold text-sidebar-foreground">
              Demo User
            </span>
            <span className="block truncate text-xs text-sidebar-muted">
              Analytics Demo Co.
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

interface AppShellProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  /** Optional element rendered on the left of the topbar, beside the title (e.g. data source). */
  lead?: ReactNode
  children: ReactNode
}

export function AppShell({
  title,
  subtitle,
  actions,
  lead,
  children,
}: AppShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen bg-sidebar text-sidebar-foreground shadow-sidebar lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground animate-slide-up">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-sidebar-muted hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>
            <SidebarContent
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-h-screen min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="btn-ghost -ml-1 px-2 lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {lead}
            {actions && (
              <div className="flex items-center gap-2.5">{actions}</div>
            )}
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
