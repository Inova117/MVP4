// Mock Data - Dashboards
import type { Dashboard } from '@/types'

export const mockDashboards: Dashboard[] = [
    {
        id: 'dashboard-1',
        user_id: 'demo-user-1',
        name: 'Sales Overview',
        is_default: true,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-20T14:30:00Z',
    },
    {
        id: 'dashboard-2',
        user_id: 'demo-user-1',
        name: 'Marketing Performance',
        is_default: false,
        created_at: '2024-01-18T09:00:00Z',
        updated_at: '2024-01-22T11:15:00Z',
    },
]
