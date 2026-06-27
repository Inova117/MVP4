'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ActivityIcon, ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '#producto', label: 'Producto' },
  { href: '#conectores', label: 'Conectores' },
  { href: '#ia', label: 'IA' },
  { href: '/backend', label: 'Seguridad' },
  { href: '#faq', label: 'Preguntas' },
]

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
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
  )
}

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'glass border-b border-border/60'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle variant="bar" />
          <Link href="/dashboard" className="btn-ghost">
            Iniciar sesión
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Ver demo en vivo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="btn-ghost px-2 lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {open && (
        <div className="glass animate-slide-up border-t border-border/60 lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle variant="bar" />
            </div>
            <Link href="/dashboard" className="btn-primary mt-2 w-full">
              Ver demo en vivo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
