// Mock Data: Internal SaaS Application
// Simulates data from your own application/database

import { subDays } from 'date-fns'

export const internalSaasData = {
    source: 'Internal Database (Supabase)',

    // Daily business metrics
    dailyMetrics: Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i)
        const baseRevenue = 15000
        const trend = i * 150 // Growing trend
        const randomFactor = 0.9 + Math.random() * 0.2

        const revenue = ((baseRevenue + trend) * randomFactor).toFixed(2)
        const signups = Math.floor(45 + Math.random() * 25)
        const activeUsers = Math.floor(1850 + i * 15 + Math.random() * 100)

        return {
            date: date.toISOString().split('T')[0],
            revenue: parseFloat(revenue),
            mrr: parseFloat((parseFloat(revenue) * 30).toFixed(2)), // Monthly Recurring Revenue
            signups,
            activeUsers,
            churnRate: parseFloat((0.02 + Math.random() * 0.01).toFixed(3)),
            avgRevenuePerUser: parseFloat((parseFloat(revenue) / activeUsers).toFixed(2)),
        }
    }),

    // Subscription tiers
    subscriptionTiers: [
        {
            tier: 'Free',
            users: 1234,
            mrr: 0,
            percentage: 42,
        },
        {
            tier: 'Starter',
            users: 876,
            mrr: 8760, // $10/user
            percentage: 30,
        },
        {
            tier: 'Professional',
            users: 543,
            mrr: 27150, // $50/user
            percentage: 18,
        },
        {
            tier: 'Enterprise',
            users: 289,
            mrr: 57800, // $200/user
            percentage: 10,
        },
    ],

    // Feature usage
    featureUsage: [
        { feature: 'Dashboard Views', usage: 45678, percentage: 100 },
        { feature: 'Report Generation', usage: 23456, percentage: 51 },
        { feature: 'Data Export', usage: 12345, percentage: 27 },
        { feature: 'API Calls', usage: 8901, percentage: 19 },
        { feature: 'Team Collaboration', usage: 6789, percentage: 15 },
    ],

    // Customer segments
    customerSegments: [
        { segment: 'SMB (< 50 employees)', count: 1456, revenue: 29120 },
        { segment: 'Mid-Market (50-500)', count: 789, revenue: 39450 },
        { segment: 'Enterprise (500+)', count: 287, revenue: 57400 },
    ],

    // Support metrics
    support: {
        ticketsResolved: 234,
        avgResponseTime: 2.5, // hours
        satisfaction: 4.6, // out of 5
        openTickets: 23,
    },

    // User engagement
    engagement: {
        dailyActive: 1234,
        weeklyActive: 2456,
        monthlyActive: 2942,
        dauMauRatio: 0.42, // Daily Active / Monthly Active
    },
}
