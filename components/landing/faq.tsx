import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'No. Conectas tus fuentes y Nexus arma el dashboard. La IA te explica los números en español claro.',
  },
  {
    q: '¿Con qué se integra?',
    a: 'Google Analytics 4, Meta Ads (Facebook e Instagram), plataformas de e-commerce y tu propia base de datos. Más fuentes vía API.',
  },
  {
    q: '¿Qué tan seguros están mis datos?',
    a: (
      <>
        Datos cifrados en tránsito y en reposo (TLS 1.3 + AES-256), Row Level
        Security y validación con Zod. Revisa la arquitectura completa en{' '}
        <Link
          href="/backend"
          className="font-medium text-primary hover:underline"
        >
          Backend &amp; Seguridad
        </Link>
        .
      </>
    ),
  },
  {
    q: '¿La IA es realmente útil o es marketing?',
    a: 'Genera un health score /100, detecta riesgos y propone una acción concreta por cada fuente. Pruébalo en la demo en vivo, sin registro.',
  },
  {
    q: '¿Puedo compartir reportes con mi equipo o cliente?',
    a: 'Sí, exporta un PDF limpio con tu marca en un clic.',
  },
  {
    q: '¿Puedo verlo funcionando antes de hablar con ventas?',
    a: 'Sí. La demo es interactiva y sin registro: cambia de fuente, mueve widgets y abre el panel de IA.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />
      <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-foreground">
              {f.q}
              <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
