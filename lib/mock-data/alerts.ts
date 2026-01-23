// Mock Data - Alerts
import type { Alert } from '@/types'

export const mockAlerts: Alert[] = [
    {
        id: 'alert-1',
        user_id: 'demo-user-1',
        metric_id: 'metric-revenue',
        name: 'Low Revenue Alert',
        condition: 'lt',
        threshold: 5000,
        is_active: true,
        notification_email: 'demo@example.com',
        created_at: '2024-01-12T10:00:00Z',
    },
    {
        id: 'alert-2',
        user_id: 'demo-user-1',
        metric_id: 'metric-users',
        name: 'High User Growth',
        condition: 'gt',
        threshold: 1400,
        is_active: true,
        notification_email: 'demo@example.com',
        created_at: '2024-01-12T10:00:00Z',
    },
    {
        id: 'alert-3',
        user_id: 'demo-user-1',
        metric_id: 'metric-conversion',
        name: 'Conversion Drop',
        condition: 'lt',
        threshold: 3.0,
        is_active: false,
        notification_email: 'demo@example.com',
        last_triggered: '2024-01-18T14:30:00Z',
        created_at: '2024-01-12T10:00:00Z',
    },
]
