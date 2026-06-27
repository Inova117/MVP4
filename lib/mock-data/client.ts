// Mock Data Client - In-memory implementation of DataClient interface
import type {
  DataClient,
  Dashboard,
  Widget,
  Metric,
  MetricData,
  Alert,
  User,
} from '@/types'
import { mockDashboards } from './dashboards'
import { mockWidgets } from './widgets'
import { mockMetrics } from './metrics'
import { mockMetricData, getMetricDataByRange } from './metric-data'
import { mockAlerts } from './alerts'
import { getSourceSeries } from './source-config'

// In-memory storage
let dashboards = [...mockDashboards]
let widgets = [...mockWidgets]
const metrics = [...mockMetrics]
const metricData = [...mockMetricData]
let alerts = [...mockAlerts]

// Mock current user
const mockUser: User = {
  id: 'demo-user-1',
  email: 'demo@analytics.com',
  full_name: 'Demo User',
  company_name: 'Analytics Demo Co.',
}

// Helper to generate IDs
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Mock Data Client Implementation
export const mockDataClient: DataClient = {
  // Dashboards
  async getDashboards(): Promise<Dashboard[]> {
    // Simulate RLS: filter by current user
    return dashboards.filter((d) => d.user_id === mockUser.id)
  },

  async getDashboard(id: string): Promise<Dashboard | null> {
    const dashboard = dashboards.find(
      (d) => d.id === id && d.user_id === mockUser.id
    )
    return dashboard || null
  },

  async createDashboard(data: Partial<Dashboard>): Promise<Dashboard> {
    const newDashboard: Dashboard = {
      id: generateId('dashboard'),
      user_id: mockUser.id,
      name: data.name || 'New Dashboard',
      is_default: data.is_default || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    dashboards.push(newDashboard)
    return newDashboard
  },

  async updateDashboard(
    id: string,
    data: Partial<Dashboard>
  ): Promise<Dashboard> {
    const index = dashboards.findIndex(
      (d) => d.id === id && d.user_id === mockUser.id
    )
    if (index === -1) {
      throw new Error('Dashboard not found')
    }
    dashboards[index] = {
      ...dashboards[index],
      ...data,
      updated_at: new Date().toISOString(),
    }
    return dashboards[index]
  },

  async deleteDashboard(id: string): Promise<void> {
    dashboards = dashboards.filter(
      (d) => !(d.id === id && d.user_id === mockUser.id)
    )
    // Also delete associated widgets
    widgets = widgets.filter((w) => w.dashboard_id !== id)
  },

  // Widgets
  async getWidgets(dashboardId: string): Promise<Widget[]> {
    // Verify user owns the dashboard
    const dashboard = await mockDataClient.getDashboard(dashboardId)
    if (!dashboard) return []

    return widgets.filter((w) => w.dashboard_id === dashboardId)
  },

  async createWidget(data: Partial<Widget>): Promise<Widget> {
    const newWidget: Widget = {
      id: generateId('widget'),
      dashboard_id: data.dashboard_id!,
      type: data.type || 'kpi',
      title: data.title || 'New Widget',
      metric_id: data.metric_id!,
      config: data.config || {},
      position_x: data.position_x || 0,
      position_y: data.position_y || 0,
      width: data.width || 4,
      height: data.height || 3,
      created_at: new Date().toISOString(),
    }
    widgets.push(newWidget)
    return newWidget
  },

  async updateWidget(id: string, data: Partial<Widget>): Promise<Widget> {
    const index = widgets.findIndex((w) => w.id === id)
    if (index === -1) {
      throw new Error('Widget not found')
    }
    widgets[index] = {
      ...widgets[index],
      ...data,
    }
    return widgets[index]
  },

  async deleteWidget(id: string): Promise<void> {
    widgets = widgets.filter((w) => w.id !== id)
  },

  // Metrics
  async getMetrics(): Promise<Metric[]> {
    return metrics.filter((m) => m.user_id === mockUser.id)
  },

  async getMetric(id: string): Promise<Metric | null> {
    const metric = metrics.find((m) => m.id === id && m.user_id === mockUser.id)
    return metric || null
  },

  async createMetric(data: Partial<Metric>): Promise<Metric> {
    const newMetric: Metric = {
      id: generateId('metric'),
      user_id: mockUser.id,
      name: data.name || 'New Metric',
      source: data.source || 'manual',
      aggregation: data.aggregation || 'sum',
      created_at: new Date().toISOString(),
    }
    metrics.push(newMetric)
    return newMetric
  },

  // Metric Data
  async getMetricData(
    metricId: string,
    startDate: Date,
    endDate: Date
  ): Promise<MetricData[]> {
    // Source-derived series (per data source) resolve directly.
    const sourceSeries = getSourceSeries(metricId, startDate, endDate)
    if (sourceSeries) return sourceSeries

    // Otherwise verify user owns the metric (custom business metrics).
    const metric = await mockDataClient.getMetric(metricId)
    if (!metric) return []

    return getMetricDataByRange(metricId, startDate, endDate)
  },

  async addMetricData(data: Partial<MetricData>): Promise<MetricData> {
    const newData: MetricData = {
      id: generateId('data'),
      metric_id: data.metric_id!,
      value: data.value || 0,
      timestamp: data.timestamp || new Date().toISOString(),
    }
    metricData.push(newData)
    return newData
  },

  // Alerts
  async getAlerts(): Promise<Alert[]> {
    return alerts.filter((a) => a.user_id === mockUser.id)
  },

  async createAlert(data: Partial<Alert>): Promise<Alert> {
    const newAlert: Alert = {
      id: generateId('alert'),
      user_id: mockUser.id,
      metric_id: data.metric_id!,
      name: data.name || 'New Alert',
      condition: data.condition || 'gt',
      threshold: data.threshold || 0,
      is_active: data.is_active !== undefined ? data.is_active : true,
      notification_email: data.notification_email || mockUser.email,
      created_at: new Date().toISOString(),
    }
    alerts.push(newAlert)
    return newAlert
  },

  async updateAlert(id: string, data: Partial<Alert>): Promise<Alert> {
    const index = alerts.findIndex(
      (a) => a.id === id && a.user_id === mockUser.id
    )
    if (index === -1) {
      throw new Error('Alert not found')
    }
    alerts[index] = {
      ...alerts[index],
      ...data,
    }
    return alerts[index]
  },

  async deleteAlert(id: string): Promise<void> {
    alerts = alerts.filter((a) => !(a.id === id && a.user_id === mockUser.id))
  },

  // User
  async getCurrentUser(): Promise<User | null> {
    return mockUser
  },
}
