interface SectionHeadingProps {
  eyebrow?: string
  title: string
  /** A single word inside `title` to highlight with the brand gradient. */
  highlight?: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass =
    align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'

  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title
    const [before, after] = title.split(highlight)
    return (
      <>
        {before}
        <span className="text-gradient-brand">{highlight}</span>
        {after}
      </>
    )
  }

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
