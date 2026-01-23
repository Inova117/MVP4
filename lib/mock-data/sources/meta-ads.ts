// Mock Data: Meta Business (Facebook & Instagram Ads)
// Simulates advertising campaign performance data

import { subDays } from 'date-fns'

export const metaAdsData = {
    source: 'Meta Business API',
    adAccountId: 'act_123456789',

    // Daily ad performance for the last 30 days
    dailyMetrics: Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i)
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Weekends often have better ad performance
        const performanceFactor = isWeekend ? 1.15 : 1.0
        const randomFactor = 0.85 + Math.random() * 0.3

        const impressions = Math.floor((25000 + Math.random() * 10000) * performanceFactor * randomFactor)
        const clicks = Math.floor(impressions * (0.015 + Math.random() * 0.01))
        const spend = parseFloat((450 + Math.random() * 200).toFixed(2))
        const conversions = Math.floor(clicks * (0.08 + Math.random() * 0.05))

        return {
            date: date.toISOString().split('T')[0],
            impressions,
            clicks,
            ctr: parseFloat((clicks / impressions * 100).toFixed(2)),
            spend,
            cpc: parseFloat((spend / clicks).toFixed(2)),
            conversions,
            conversionRate: parseFloat((conversions / clicks * 100).toFixed(2)),
            costPerConversion: parseFloat((spend / conversions).toFixed(2)),
            roas: parseFloat((conversions * 89 / spend).toFixed(2)), // Assuming $89 avg order value
        }
    }),

    // Campaign breakdown
    campaigns: [
        {
            id: 'camp_001',
            name: 'Summer Product Launch',
            status: 'active',
            budget: 500,
            spend: 3456.78,
            impressions: 234567,
            clicks: 4523,
            conversions: 342,
            roas: 4.2,
        },
        {
            id: 'camp_002',
            name: 'Brand Awareness Q1',
            status: 'active',
            budget: 300,
            spend: 2890.34,
            impressions: 189234,
            clicks: 2876,
            conversions: 198,
            roas: 3.1,
        },
        {
            id: 'camp_003',
            name: 'Retargeting - Abandoned Carts',
            status: 'active',
            budget: 200,
            spend: 1567.89,
            impressions: 98765,
            clicks: 2134,
            conversions: 267,
            roas: 6.8,
        },
    ],

    // Platform breakdown
    platforms: [
        { platform: 'Facebook', spend: 4567.89, impressions: 312456, conversions: 456 },
        { platform: 'Instagram', spend: 3347.12, impressions: 209110, conversions: 351 },
    ],

    // Audience insights
    audiences: {
        ageGroups: [
            { age: '18-24', impressions: 78456, conversions: 89, percentage: 15 },
            { age: '25-34', impressions: 198234, conversions: 312, percentage: 38 },
            { age: '35-44', impressions: 156789, conversions: 245, percentage: 30 },
            { age: '45-54', impressions: 67890, conversions: 98, percentage: 13 },
            { age: '55+', impressions: 20197, conversions: 63, percentage: 4 },
        ],
        gender: [
            { gender: 'Female', impressions: 312456, conversions: 478, percentage: 60 },
            { gender: 'Male', impressions: 209110, conversions: 329, percentage: 40 },
        ],
    },

    // Ad creative performance
    topCreatives: [
        {
            id: 'creative_001',
            name: 'Video - Product Demo',
            impressions: 89234,
            clicks: 1456,
            ctr: 1.63,
            conversions: 123,
        },
        {
            id: 'creative_002',
            name: 'Carousel - Feature Highlights',
            impressions: 67890,
            clicks: 1234,
            ctr: 1.82,
            conversions: 98,
        },
        {
            id: 'creative_003',
            name: 'Static - Limited Offer',
            impressions: 54321,
            clicks: 987,
            ctr: 1.82,
            conversions: 87,
        },
    ],
}
