'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle({
  variant = 'sidebar',
}: {
  variant?: 'sidebar' | 'bar'
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = theme === 'dark'

  if (variant === 'bar') {
    return (
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title="Toggle theme"
        aria-label="Toggle theme"
      >
        {mounted && isDark ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex w-full items-center gap-2 rounded-xl bg-sidebar-elevated p-1 text-xs font-semibold text-sidebar-muted"
      aria-label="Toggle theme"
    >
      <span
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 transition-colors ${
          mounted && !isDark ? 'bg-white/10 text-sidebar-foreground' : ''
        }`}
      >
        <SunIcon className="w-3.5 h-3.5" /> Light
      </span>
      <span
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 transition-colors ${
          mounted && isDark ? 'bg-white/10 text-sidebar-foreground' : ''
        }`}
      >
        <MoonIcon className="w-3.5 h-3.5" /> Dark
      </span>
    </button>
  )
}
