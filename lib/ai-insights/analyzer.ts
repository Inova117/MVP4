// AI Insights Analyzer
// Simulates Claude AI analyzing dashboard metrics and providing insights

import {
  getDataSource,
  type DataSourceType,
} from '@/lib/mock-data/data-source-registry'

export interface Insight {
  id: string
  type: 'success' | 'warning' | 'recommendation' | 'info'
  title: string
  description: string
  metric?: string
  value?: string
  change?: number
  action?: string
  priority: 'high' | 'medium' | 'low'
}

interface DailyMetric {
  date: string
  activeUsers: number
  conversionRate: number
  bounceRate: number
  churnRate?: number
  cartAbandonment?: number
}

interface Campaign {
  id: string
  name: string
  spend: number
  roas: number
}

interface AnalyticsData {
  dailyMetrics: DailyMetric[]
  campaigns?: Campaign[]
}

/**
 * Analyze data from a specific source and generate AI insights
 */
export function generateInsights(sourceId: DataSourceType): Insight[] {
  const source = getDataSource(sourceId)
  const data = source.data as AnalyticsData

  switch (sourceId) {
    case 'google-analytics':
      return analyzeGoogleAnalytics(data)
    case 'meta-ads':
      if (data.campaigns) {
        return analyzeMetaAds(data.campaigns)
      }
      return []
    case 'internal-saas':
      return analyzeInternalSaaS(data)
    case 'ecommerce':
      return analyzeEcommerce(data)
    default:
      return []
  }
}

function analyzeGoogleAnalytics(data: AnalyticsData): Insight[] {
  const insights: Insight[] = []

  // Calculate trends
  const recentMetrics = data.dailyMetrics.slice(-7)
  // Removed unused avgUsers
  const avgConversionRate =
    recentMetrics.reduce(
      (sum: number, d: DailyMetric) => sum + d.conversionRate,
      0
    ) / recentMetrics.length

  // Traffic Growth Analysis
  insights.push({
    id: 'ga-traffic-trend',
    type: 'success',
    title: 'Strong Organic Traffic Growth',
    description:
      'Your organic search traffic accounts for 42% of total visitors, which is above industry average (35%). This indicates strong SEO performance.',
    metric: 'Organic Traffic',
    value: '42%',
    change: 8.5,
    action: 'Continue investing in content marketing and SEO optimization',
    priority: 'high',
  })

  // Bounce Rate Warning
  if (recentMetrics[6].bounceRate > 0.45) {
    insights.push({
      id: 'ga-bounce-rate',
      type: 'warning',
      title: 'Elevated Bounce Rate Detected',
      description:
        'Bounce rate is higher than optimal (45%+). Users may not be finding what they expect on landing pages.',
      metric: 'Bounce Rate',
      value: `${(recentMetrics[6].bounceRate * 100).toFixed(1)}%`,
      action:
        'Review top landing pages and improve content relevance, page load speed, and call-to-actions',
      priority: 'high',
    })
  }

  // Mobile Traffic
  insights.push({
    id: 'ga-mobile-opportunity',
    type: 'recommendation',
    title: 'Mobile Optimization Opportunity',
    description:
      'Mobile traffic represents 35% of visitors but has 20% lower conversion rate than desktop. This gap suggests room for mobile UX improvements.',
    metric: 'Mobile Conversion Gap',
    value: '-20%',
    action:
      'Conduct mobile usability audit and optimize checkout flow for mobile devices',
    priority: 'medium',
  })

  // Conversion Rate Success
  if (avgConversionRate > 0.03) {
    insights.push({
      id: 'ga-conversion-success',
      type: 'success',
      title: 'Above-Average Conversion Rate',
      description: `Your conversion rate of ${(avgConversionRate * 100).toFixed(2)}% exceeds the industry benchmark of 2.5%. Your funnel optimization efforts are paying off.`,
      metric: 'Conversion Rate',
      value: `${(avgConversionRate * 100).toFixed(2)}%`,
      action:
        'Document and replicate successful patterns across other campaigns',
      priority: 'medium',
    })
  }

  return insights
}

function analyzeMetaAds(campaigns: Campaign[]): Insight[] {
  const insights: Insight[] = []

  const bestCampaign = campaigns.reduce(
    (best: Campaign, camp: Campaign) => (camp.roas > best.roas ? camp : best),
    campaigns[0]
  )

  // ROAS Analysis
  insights.push({
    id: 'meta-roas-winner',
    type: 'success',
    title: 'Exceptional ROAS on Retargeting',
    description: `Your "${bestCampaign.name}" campaign is delivering ${bestCampaign.roas}x ROAS, significantly above the 4x target. Retargeting abandoned carts is your most efficient channel.`,
    metric: 'Campaign ROAS',
    value: `${bestCampaign.roas}x`,
    change: 45,
    action: 'Increase budget allocation to this campaign by 30-40%',
    priority: 'high',
  })

  // Creative Performance
  insights.push({
    id: 'meta-creative-insight',
    type: 'info',
    title: 'Video Outperforms Static Ads',
    description:
      'Video creatives have 23% higher CTR than static images. The product demo video is your top performer.',
    metric: 'Video vs Static CTR',
    value: '+23%',
    action: 'Produce more short-form product demo videos (15-30 seconds)',
    priority: 'medium',
  })

  // Audience Insights
  insights.push({
    id: 'meta-audience-opportunity',
    type: 'recommendation',
    title: 'Expand to 25-34 Age Group',
    description:
      'The 25-34 age demographic shows highest conversion rate (38% of conversions) but only receives 30% of ad spend. Rebalance budget allocation.',
    metric: 'Age Group Performance',
    value: '25-34 years',
    action: 'Shift 15% of budget from 45-54 to 25-34 age group',
    priority: 'high',
  })

  // Budget Warning
  const totalSpend = campaigns.reduce(
    (sum: number, c: Campaign) => sum + c.spend,
    0
  )
  insights.push({
    id: 'meta-budget-alert',
    type: 'warning',
    title: 'Budget Pacing Ahead of Schedule',
    description: `You've spent $${totalSpend.toFixed(2)} (73% of monthly budget) with 9 days remaining. Current pace suggests overspend.`,
    metric: 'Budget Usage',
    value: '73%',
    action: 'Reduce daily budgets by 20% or pause underperforming campaigns',
    priority: 'high',
  })

  return insights
}

function analyzeInternalSaaS(data: AnalyticsData): Insight[] {
  const insights: Insight[] = []

  const recentMetrics = data.dailyMetrics.slice(-7)
  const avgChurn =
    recentMetrics.reduce(
      (sum: number, d: DailyMetric) => sum + (d.churnRate || 0),
      0
    ) / recentMetrics.length

  // MRR Growth
  insights.push({
    id: 'saas-mrr-growth',
    type: 'success',
    title: 'Healthy MRR Growth Trajectory',
    description:
      'Monthly Recurring Revenue grew 12% this month, driven by new Enterprise customers and Professional tier upgrades.',
    metric: 'MRR Growth',
    value: '+12%',
    change: 12,
    action:
      'Focus sales efforts on mid-market companies (50-500 employees) showing highest conversion',
    priority: 'high',
  })

  // Churn Risk
  if (avgChurn > 0.025) {
    insights.push({
      id: 'saas-churn-warning',
      type: 'warning',
      title: 'Churn Rate Above Target',
      description: `Churn rate of ${(avgChurn * 100).toFixed(1)}% exceeds the healthy threshold of 2%. Exit surveys indicate "lack of feature usage" as primary reason.`,
      metric: 'Monthly Churn',
      value: `${(avgChurn * 100).toFixed(1)}%`,
      action:
        'Implement onboarding email sequence and in-app feature tours for new users',
      priority: 'high',
    })
  }

  // Feature Adoption
  insights.push({
    id: 'saas-feature-adoption',
    type: 'recommendation',
    title: 'Low Adoption of API Features',
    description:
      'Only 19% of Professional/Enterprise users utilize API access, despite this being a key differentiator. Many may not know it exists.',
    metric: 'API Adoption',
    value: '19%',
    action:
      'Create API quick-start guides and showcase integration examples in dashboard',
    priority: 'medium',
  })

  // Upgrade Opportunity
  insights.push({
    id: 'saas-upgrade-opportunity',
    type: 'info',
    title: 'Starter Plan Users Ready to Upgrade',
    description:
      "234 Starter plan users have exceeded their monthly limits 3+ times. They're likely ready for Professional tier.",
    metric: 'Upgrade Candidates',
    value: '234 users',
    action:
      'Send targeted upgrade campaign with 20% discount for annual commitment',
    priority: 'high',
  })

  return insights
}

function analyzeEcommerce(data: AnalyticsData): Insight[] {
  const insights: Insight[] = []

  // Revenue Analysis
  insights.push({
    id: 'ecom-revenue-success',
    type: 'success',
    title: 'Weekend Sales Surge',
    description:
      'Weekend sales are 30% higher than weekdays, suggesting strong B2C leisure shopping patterns. Saturday is your highest-performing day.',
    metric: 'Weekend Revenue',
    value: '+30%',
    change: 30,
    action: 'Schedule flash sales and new product launches for Friday-Saturday',
    priority: 'medium',
  })

  // Cart Abandonment
  const avgAbandonment =
    data.dailyMetrics
      .slice(-7)
      .reduce(
        (sum: number, d: DailyMetric) => sum + (d.cartAbandonment || 0),
        0
      ) / 7

  insights.push({
    id: 'ecom-cart-abandonment',
    type: 'warning',
    title: 'High Cart Abandonment Rate',
    description: `${(avgAbandonment * 100).toFixed(0)}% of carts are abandoned. Common exit points: shipping cost reveal and account creation requirement.`,
    metric: 'Cart Abandonment',
    value: `${(avgAbandonment * 100).toFixed(0)}%`,
    action:
      'Implement guest checkout and show shipping costs earlier in funnel',
    priority: 'high',
  })

  // Product Performance
  insights.push({
    id: 'ecom-top-category',
    type: 'success',
    title: 'Electronics Category Dominating',
    description:
      'Electronics generates 32% of revenue with highest average order value ($118). "Wireless Headphones Pro" alone drives 10% of total sales.',
    metric: 'Electronics Revenue',
    value: '32%',
    action:
      'Expand electronics catalog and create bundle deals with top products',
    priority: 'high',
  })

  // Customer Retention
  insights.push({
    id: 'ecom-repeat-customers',
    type: 'info',
    title: 'Strong Customer Retention',
    description:
      '58% repeat purchase rate is excellent (industry avg: 30%). Your loyalty program and email marketing are working well.',
    metric: 'Repeat Purchase Rate',
    value: '58%',
    action: 'Create VIP tier for customers with $1000+ lifetime value',
    priority: 'low',
  })

  // Shipping Costs
  insights.push({
    id: 'ecom-shipping-opportunity',
    type: 'recommendation',
    title: 'Free Shipping Threshold Opportunity',
    description:
      'Average order value is $92, but free shipping starts at $100. Consider lowering threshold to $85 to boost conversions.',
    metric: 'AOV vs Free Shipping',
    value: '$92 vs $100',
    action: 'A/B test free shipping at $85 threshold for 2 weeks',
    priority: 'medium',
  })

  return insights
}

/**
 * Get a quick summary of overall health
 */
export function getHealthScore(sourceId: DataSourceType): {
  score: number
  status: 'excellent' | 'good' | 'needs-attention' | 'critical'
  summary: string
} {
  const insights = generateInsights(sourceId)

  const successCount = insights.filter((i) => i.type === 'success').length
  const warningCount = insights.filter((i) => i.type === 'warning').length
  const highPriorityCount = insights.filter((i) => i.priority === 'high').length

  const score = Math.max(
    0,
    Math.min(
      100,
      70 + successCount * 10 - warningCount * 15 - highPriorityCount * 5
    )
  )

  let status: 'excellent' | 'good' | 'needs-attention' | 'critical'
  let summary: string

  if (score >= 85) {
    status = 'excellent'
    summary =
      'Your metrics are performing exceptionally well. Keep up the momentum!'
  } else if (score >= 70) {
    status = 'good'
    summary =
      'Overall healthy performance with some opportunities for optimization.'
  } else if (score >= 50) {
    status = 'needs-attention'
    summary = 'Several areas need attention to improve performance.'
  } else {
    status = 'critical'
    summary = 'Critical issues detected. Immediate action recommended.'
  }

  return { score, status, summary }
}
