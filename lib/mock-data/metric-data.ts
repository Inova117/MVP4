// Mock Data - Metric Data (30 days of historical data for all metrics)
import type { MetricData } from '@/types'

// Generate 30 days of data for each metric with realistic trends
function generateMetricData(
    metricId: string,
    baseValue: number,
    variance: number,
    trend: 'up' | 'down' | 'flat' = 'flat'
): MetricData[] {
    const data: MetricData[] = []
    const now = new Date()

    for (let i = 29; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        date.setHours(12, 0, 0, 0)

        // Add trend
        let trendValue = 0
        if (trend === 'up') {
            trendValue = (29 - i) * (baseValue * 0.01) // 1% growth per day
        } else if (trend === 'down') {
            trendValue = -(29 - i) * (baseValue * 0.005) // 0.5% decline per day
        }

        // Add some realistic variation
        const randomVariation = (Math.random() - 0.5) * variance
        const value = baseValue + trendValue + randomVariation

        data.push({
            id: `data-${metricId}-${i}`,
            metric_id: metricId,
            value: Math.max(0, value),
            timestamp: date.toISOString(),
        })
    }

    return data
}

// === REVENUE & FINANCE ===
const revenueData = generateMetricData('metric-revenue', 6500, 1500, 'up') // $6,500/day growing
const profitData = generateMetricData('metric-profit', 2800, 600, 'up') // $2,800/day profit
const mrrData = generateMetricData('metric-mrr', 124500, 8000, 'up') // $124,500 MRR
const arrData = generateMetricData('metric-arr', 1494000, 50000, 'up') // $1.494M ARR
const grossMarginData = generateMetricData('metric-gross-margin', 65, 5, 'flat') // 65% margin

// === CUSTOMER METRICS ===
const usersData = generateMetricData('metric-users', 12458, 1200, 'up') // Active users growing
const customersData = generateMetricData('metric-customers', 3845, 350, 'up') // Total customers
const newCustomersData = generateMetricData('metric-new-customers', 45, 12, 'flat') // ~45 new/day
const churnRateData = generateMetricData('metric-churn-rate', 3.2, 0.8, 'down') // 3.2% churn
const retentionRateData = generateMetricData('metric-retention-rate', 92, 3, 'up') // 92% retention
const cacData = generateMetricData('metric-cac', 185, 25, 'down') // $185 CAC
const ltvData = generateMetricData('metric-ltv', 2450, 200, 'up') // $2,450 LTV
const npsData = generateMetricData('metric-nps', 58, 8, 'up') // NPS of 58

// === ECOMMERCE METRICS ===
const ordersData = generateMetricData('metric-orders', 287, 45, 'up') // 287 orders/day
const aovData = generateMetricData('metric-aov', 87.40, 12, 'up') // $87.40 AOV
const cartAbandonmentData = generateMetricData('metric-cart-abandonment', 68, 5, 'down') // 68% abandonment
const conversionData = generateMetricData('metric-conversion', 3.5, 0.8, 'up') // 3.5% conversion
const itemsSoldData = generateMetricData('metric-items-sold', 548, 85, 'up') // 548 items/day

// === WEBSITE & TRAFFIC METRICS ===
const sessionsData = generateMetricData('metric-sessions', 8945, 1200, 'up') // 8,945 sessions/day
const pageviewsData = generateMetricData('metric-pageviews', 24580, 3500, 'up') // 24,580 pageviews
const bounceRateData = generateMetricData('metric-bounce-rate', 52, 8, 'down') // 52% bounce rate
const avgSessionDurationData = generateMetricData('metric-avg-session-duration', 185, 30, 'up') // 185 seconds
const pagesPerSessionData = generateMetricData('metric-pages-per-session', 2.8, 0.4, 'up') // 2.8 pages
const uniqueVisitorsData = generateMetricData('metric-unique-visitors', 6240, 850, 'up') // 6,240 unique
const returningVisitorsData = generateMetricData('metric-returning-visitors', 2705, 420, 'up') // 2,705 returning

// === MARKETING & ADS METRICS ===
const impressionsData = generateMetricData('metric-impressions', 145000, 22000, 'up') // 145k impressions
const clicksData = generateMetricData('metric-clicks', 4850, 680, 'up') // 4,850 clicks
const ctrData = generateMetricData('metric-ctr', 3.35, 0.45, 'flat') // 3.35% CTR
const cpcData = generateMetricData('metric-cpc', 1.85, 0.25, 'up') // $1.85 CPC
const cpmData = generateMetricData('metric-cpm', 12.40, 2, 'up') // $12.40 CPM
const adSpendData = generateMetricData('metric-ad-spend', 8972, 1200, 'up') // $8,972/day
const roasData = generateMetricData('metric-roas', 4.8, 0.6, 'up') // 4.8x ROAS
const leadsData = generateMetricData('metric-leads', 234, 35, 'up') // 234 leads/day
const leadConversionData = generateMetricData('metric-lead-conversion', 18.5, 3.2, 'up') // 18.5% lead conversion

// === EMAIL & CONTENT METRICS ===
const emailOpensData = generateMetricData('metric-email-opens', 8540, 1200, 'up') // 8,540 opens
const emailOpenRateData = generateMetricData('metric-email-open-rate', 24.5, 3.5, 'up') // 24.5% open rate
const emailCtrData = generateMetricData('metric-email-ctr', 4.2, 0.8, 'up') // 4.2% email CTR
const subscribersData = generateMetricData('metric-subscribers', 42850, 450, 'up') // 42,850 subscribers
const unsubscribesData = generateMetricData('metric-unsubscribes', 28, 8, 'down') // 28 unsubscribes/day

// === SUPPORT & SERVICE METRICS ===
const ticketsData = generateMetricData('metric-tickets', 145, 25, 'down') // 145 tickets/day
const responseTimeData = generateMetricData('metric-response-time', 2.4, 0.6, 'down') // 2.4 hours
const resolutionTimeData = generateMetricData('metric-resolution-time', 18.5, 4, 'down') // 18.5 hours
const csatData = generateMetricData('metric-csat', 4.6, 0.3, 'up') // 4.6/5 CSAT

// Combine all metric data
export const mockMetricData: MetricData[] = [
    // Revenue & Finance
    ...revenueData,
    ...profitData,
    ...mrrData,
    ...arrData,
    ...grossMarginData,

    // Customer Metrics
    ...usersData,
    ...customersData,
    ...newCustomersData,
    ...churnRateData,
    ...retentionRateData,
    ...cacData,
    ...ltvData,
    ...npsData,

    // E-commerce Metrics
    ...ordersData,
    ...aovData,
    ...cartAbandonmentData,
    ...conversionData,
    ...itemsSoldData,

    // Website & Traffic
    ...sessionsData,
    ...pageviewsData,
    ...bounceRateData,
    ...avgSessionDurationData,
    ...pagesPerSessionData,
    ...uniqueVisitorsData,
    ...returningVisitorsData,

    // Marketing & Ads
    ...impressionsData,
    ...clicksData,
    ...ctrData,
    ...cpcData,
    ...cpmData,
    ...adSpendData,
    ...roasData,
    ...leadsData,
    ...leadConversionData,

    // Email & Content
    ...emailOpensData,
    ...emailOpenRateData,
    ...emailCtrData,
    ...subscribersData,
    ...unsubscribesData,

    // Support & Service
    ...ticketsData,
    ...responseTimeData,
    ...resolutionTimeData,
    ...csatData,
]

// Helper function to get data for a specific metric and date range
export function getMetricDataByRange(
    metricId: string,
    startDate: Date,
    endDate: Date
): MetricData[] {
    return mockMetricData.filter((data) => {
        if (data.metric_id !== metricId) return false
        const dataDate = new Date(data.timestamp)
        return dataDate >= startDate && dataDate <= endDate
    })
}
