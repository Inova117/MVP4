// Mock Data: Google Analytics 4
// Simulates data from Google Analytics including web traffic, user behavior, and conversions

import { subDays } from 'date-fns'

export const googleAnalyticsData = {
    source: 'Google Analytics 4',
    propertyId: 'properties/123456789',

    // Daily metrics for the last 30 days
    dailyMetrics: Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i)
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Simulate realistic patterns: less traffic on weekends
        const baseTraffic = isWeekend ? 0.6 : 1.0
        const randomFactor = 0.8 + Math.random() * 0.4

        return {
            date: date.toISOString().split('T')[0],
            activeUsers: Math.floor((1200 + Math.random() * 400) * baseTraffic * randomFactor),
            sessions: Math.floor((1500 + Math.random() * 500) * baseTraffic * randomFactor),
            pageViews: Math.floor((4500 + Math.random() * 1500) * baseTraffic * randomFactor),
            bounceRate: 0.35 + Math.random() * 0.15,
            avgSessionDuration: 180 + Math.random() * 120, // seconds
            conversions: Math.floor((45 + Math.random() * 25) * baseTraffic * randomFactor),
            conversionRate: 0.025 + Math.random() * 0.015,
        }
    }),

    // Traffic sources
    trafficSources: [
        { source: 'Organic Search', users: 12450, percentage: 42 },
        { source: 'Direct', users: 7820, percentage: 26 },
        { source: 'Social Media', users: 5340, percentage: 18 },
        { source: 'Referral', users: 3120, percentage: 11 },
        { source: 'Email', users: 890, percentage: 3 },
    ],

    // Top pages
    topPages: [
        { page: '/products/analytics', views: 15420, avgTime: 245 },
        { page: '/pricing', views: 12340, avgTime: 189 },
        { page: '/blog/data-visualization', views: 9870, avgTime: 312 },
        { page: '/features', views: 8560, avgTime: 156 },
        { page: '/contact', views: 6780, avgTime: 98 },
    ],

    // Demographics
    demographics: {
        countries: [
            { country: 'United States', users: 11234, percentage: 38 },
            { country: 'United Kingdom', users: 4567, percentage: 15 },
            { country: 'Canada', users: 3456, percentage: 12 },
            { country: 'Germany', users: 2890, percentage: 10 },
            { country: 'Australia', users: 2345, percentage: 8 },
            { country: 'Others', users: 5123, percentage: 17 },
        ],
        devices: [
            { device: 'Desktop', users: 16789, percentage: 57 },
            { device: 'Mobile', users: 10234, percentage: 35 },
            { device: 'Tablet', users: 2592, percentage: 8 },
        ],
    },
}
