import { MarketingNav } from '@/components/landing/marketing-nav'
import { Hero } from '@/components/landing/hero'
import { MetricStrip } from '@/components/landing/metric-strip'
import { ConnectorRow } from '@/components/landing/connector-row'
import { SourceSwitcher } from '@/components/landing/source-switcher'
import { AiInsightsSection } from '@/components/landing/ai-insights-section'
import { FeatureGrid } from '@/components/landing/feature-grid'
import { ComparisonBand } from '@/components/landing/comparison-band'
import { Testimonial } from '@/components/landing/testimonial'
import { Faq } from '@/components/landing/faq'
import { FinalCta } from '@/components/landing/final-cta'
import { MarketingFooter } from '@/components/landing/marketing-footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <MetricStrip />
        <ConnectorRow />
        <SourceSwitcher />
        <AiInsightsSection />
        <FeatureGrid />
        <ComparisonBand />
        <Testimonial />
        <Faq />
        <FinalCta />
      </main>
      <MarketingFooter />
    </div>
  )
}
