// TypeScript types for the Analytics Dashboard

export interface Dashboard {
    id: string
    user_id: string
    name: string
    layout?: GridLayout[]
    is_default: boolean
    created_at: string
    updated_at: string
}

export interface Widget {
    id: string
    dashboard_id: string
    type: 'kpi' | 'line' | 'bar' | 'pie' | 'table'
    title: string
    metric_id: string
    config: WidgetConfig
    position_x: number
    position_y: number
    width: number
    height: number
    created_at: string
}

export interface WidgetConfig {
    color?: string
    prefix?: string
    suffix?: string
    showLegend?: boolean
    stacked?: boolean
}

export interface GridLayout {
    i: string
    x: number
    y: number
    w: number
    h: number
}

export interface Metric {
    id: string
    user_id: string
    name: string
    source: string
    aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max'
    created_at: string
}

export interface MetricData {
    id: string
    metric_id: string
    value: number
    timestamp: string
}

export interface Alert {
    id: string
    user_id: string
    metric_id: string
    name: string
    condition: 'gt' | 'lt' | 'eq' | 'pct_change'
    threshold: number
    is_active: boolean
    notification_email: string
    last_triggered?: string
    created_at: string
}

export interface User {
    id: string
    email: string
    full_name: string
    company_name?: string
    avatar_url?: string
}

// Data Client Interface (implemented by both mock and Supabase)
export interface DataClient {
    // Dashboards
    getDashboards(): Promise<Dashboard[]>
    getDashboard(id: string): Promise<Dashboard | null>
    createDashboard(data: Partial<Dashboard>): Promise<Dashboard>
    updateDashboard(id: string, data: Partial<Dashboard>): Promise<Dashboard>
    deleteDashboard(id: string): Promise<void>

    // Widgets
    getWidgets(dashboardId: string): Promise<Widget[]>
    createWidget(data: Partial<Widget>): Promise<Widget>
    updateWidget(id: string, data: Partial<Widget>): Promise<Widget>
    deleteWidget(id: string): Promise<void>

    // Metrics
    getMetrics(): Promise<Metric[]>
    getMetric(id: string): Promise<Metric | null>
    createMetric(data: Partial<Metric>): Promise<Metric>

    // Metric Data
    getMetricData(
        metricId: string,
        startDate: Date,
        endDate: Date
    ): Promise<MetricData[]>
    addMetricData(data: Partial<MetricData>): Promise<MetricData>

    // Alerts
    getAlerts(): Promise<Alert[]>
    createAlert(data: Partial<Alert>): Promise<Alert>
    updateAlert(id: string, data: Partial<Alert>): Promise<Alert>
    deleteAlert(id: string): Promise<void>

    // User
    getCurrentUser(): Promise<User | null>
}
