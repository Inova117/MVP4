// Mock Data: E-commerce Platform
// Simulates data from an online store (Shopify-like)

import { subDays } from 'date-fns'

export const ecommerceData = {
    source: 'E-commerce Platform',
    storeId: 'store_987654321',

    // Daily sales metrics
    dailyMetrics: Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i)
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Weekend sales boost
        const salesFactor = isWeekend ? 1.3 : 1.0
        const randomFactor = 0.85 + Math.random() * 0.3

        const orders = Math.floor((125 + Math.random() * 75) * salesFactor * randomFactor)
        const avgOrderValue = parseFloat((78 + Math.random() * 45).toFixed(2))
        const revenue = parseFloat((orders * avgOrderValue).toFixed(2))

        return {
            date: date.toISOString().split('T')[0],
            orders,
            revenue,
            avgOrderValue,
            totalItems: Math.floor(orders * (2.1 + Math.random() * 0.8)),
            cartAbandonment: parseFloat((0.65 + Math.random() * 0.15).toFixed(2)),
            returnsRate: parseFloat((0.03 + Math.random() * 0.02).toFixed(3)),
        }
    }),

    // Product categories
    productCategories: [
        {
            category: 'Electronics',
            revenue: 145678,
            orders: 1234,
            avgPrice: 118,
            percentage: 32,
        },
        {
            category: 'Clothing',
            revenue: 98765,
            orders: 2345,
            avgPrice: 42,
            percentage: 22,
        },
        {
            category: 'Home & Garden',
            revenue: 87654,
            orders: 1567,
            avgPrice: 56,
            percentage: 19,
        },
        {
            category: 'Sports & Outdoors',
            revenue: 67890,
            orders: 1123,
            avgPrice: 60,
            percentage: 15,
        },
        {
            category: 'Books & Media',
            revenue: 54321,
            orders: 2678,
            avgPrice: 20,
            percentage: 12,
        },
    ],

    // Top selling products
    topProducts: [
        {
            id: 'prod_001',
            name: 'Wireless Headphones Pro',
            sales: 456,
            revenue: 45600,
            rating: 4.7,
        },
        {
            id: 'prod_002',
            name: 'Smart Watch Series 5',
            sales: 389,
            revenue: 77800,
            rating: 4.5,
        },
        {
            id: 'prod_003',
            name: 'Running Shoes - Elite',
            sales: 367,
            revenue: 33030,
            rating: 4.8,
        },
    ],

    // Customer metrics
    customers: {
        new: 1234,
        returning: 3456,
        repeatPurchaseRate: 0.58,
        avgLifetimeValue: 487.50,
        topTierCustomers: 234, // >$1000 LTV
    },

    // Shipping & fulfillment
    fulfillment: {
        avgShippingTime: 2.8, // days
        deliverySuccess: 0.97,
        shippingCost: 8970,
        avgShippingPerOrder: 7.50,
    },

    // Payment methods
    paymentMethods: [
        { method: 'Credit Card', orders: 2345, percentage: 58 },
        { method: 'PayPal', orders: 1123, percentage: 28 },
        { method: 'Apple Pay', orders: 345, percentage: 9 },
        { method: 'Google Pay', orders: 201, percentage: 5 },
    ],
}
