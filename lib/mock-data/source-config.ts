// Source-aware dashboards.
// Each data source (GA4, Meta Ads, E-commerce, Internal SaaS) gets a tailored
// dashboard whose KPIs/charts are derived from that source's REAL mock dataset.
// Switching the data source swaps the whole dashboard — no fake static numbers.

import type { Dashboard, Widget, MetricData, WidgetConfig } from '@/types'
import type { DataSourceType } from './data-source-registry'
import { googleAnalyticsData } from './sources/google-analytics'
import { metaAdsData } from './sources/meta-ads'
import { ecommerceData } from './sources/ecommerce'
import { internalSaasData } from './sources/internal-saas'

type Agg = 'sum' | 'avg' | 'last'

interface KpiDef {
  field: string
  title: string
  agg: Agg
  color: string
  icon: string
  prefix?: string
  suffix?: string
  compact?: boolean
  scale?: number
  unit?: string
}
interface SeriesDef {
  field: string
  title: string
  type: 'line' | 'bar'
  color: string
  scale?: number
  prefix?: string
  suffix?: string
}
interface BreakdownDef {
  key: string // property path on the source dataset
  nameKey: string
  valueKey: string
  title: string
  type: 'pie' | 'bar'
}
interface SourceDef {
  name: string
  subtitle: string
  kpis: KpiDef[]
  primary: SeriesDef
  donut: BreakdownDef
  secondary: SeriesDef
  extra: BreakdownDef
}

const C = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  sky: '#0ea5e9',
  teal: '#14b8a6',
}

const SOURCE_DEFS: Record<
  DataSourceType,
  { data: Record<string, unknown>; def: SourceDef }
> = {
  'google-analytics': {
    data: googleAnalyticsData as unknown as Record<string, unknown>,
    def: {
      name: 'Web Analytics',
      subtitle: 'Traffic, engagement & conversions from Google Analytics 4',
      kpis: [
        {
          field: 'activeUsers',
          title: 'Active Users',
          agg: 'avg',
          color: C.indigo,
          icon: 'Users',
          compact: true,
        },
        {
          field: 'sessions',
          title: 'Sessions',
          agg: 'sum',
          color: C.violet,
          icon: 'MousePointerClick',
          compact: true,
        },
        {
          field: 'conversionRate',
          title: 'Conversion Rate',
          agg: 'avg',
          color: C.sky,
          icon: 'Target',
          suffix: '%',
          scale: 100,
        },
        {
          field: 'bounceRate',
          title: 'Bounce Rate',
          agg: 'avg',
          color: C.teal,
          icon: 'LogOut',
          suffix: '%',
          scale: 100,
        },
      ],
      primary: {
        field: 'sessions',
        title: 'Sessions Trend',
        type: 'line',
        color: C.indigo,
      },
      donut: {
        key: 'trafficSources',
        nameKey: 'source',
        valueKey: 'users',
        title: 'Traffic Sources',
        type: 'pie',
      },
      secondary: {
        field: 'pageViews',
        title: 'Page Views',
        type: 'bar',
        color: C.violet,
      },
      extra: {
        key: 'demographics.devices',
        nameKey: 'device',
        valueKey: 'users',
        title: 'Users by Device',
        type: 'bar',
      },
    },
  },
  'meta-ads': {
    data: metaAdsData as unknown as Record<string, unknown>,
    def: {
      name: 'Paid Social',
      subtitle: 'Campaign performance across Facebook & Instagram Ads',
      kpis: [
        {
          field: 'spend',
          title: 'Ad Spend',
          agg: 'sum',
          color: C.indigo,
          icon: 'DollarSign',
          prefix: '$',
          compact: true,
        },
        {
          field: 'impressions',
          title: 'Impressions',
          agg: 'sum',
          color: C.violet,
          icon: 'Eye',
          compact: true,
        },
        {
          field: 'ctr',
          title: 'Avg CTR',
          agg: 'avg',
          color: C.sky,
          icon: 'MousePointerClick',
          suffix: '%',
        },
        {
          field: 'roas',
          title: 'ROAS',
          agg: 'avg',
          color: C.teal,
          icon: 'TrendingUp',
          suffix: '×',
        },
      ],
      primary: {
        field: 'spend',
        title: 'Daily Ad Spend',
        type: 'line',
        color: C.indigo,
        prefix: '$',
      },
      donut: {
        key: 'platforms',
        nameKey: 'platform',
        valueKey: 'spend',
        title: 'Spend by Platform',
        type: 'pie',
      },
      secondary: {
        field: 'conversions',
        title: 'Daily Conversions',
        type: 'bar',
        color: C.violet,
      },
      extra: {
        key: 'audiences.ageGroups',
        nameKey: 'age',
        valueKey: 'conversions',
        title: 'Conversions by Age',
        type: 'bar',
      },
    },
  },
  ecommerce: {
    data: ecommerceData as unknown as Record<string, unknown>,
    def: {
      name: 'Online Store',
      subtitle: 'Sales, orders & customer behavior from your storefront',
      kpis: [
        {
          field: 'revenue',
          title: 'Revenue',
          agg: 'sum',
          color: C.indigo,
          icon: 'DollarSign',
          prefix: '$',
          compact: true,
        },
        {
          field: 'orders',
          title: 'Orders',
          agg: 'sum',
          color: C.violet,
          icon: 'ShoppingCart',
          compact: true,
        },
        {
          field: 'avgOrderValue',
          title: 'Avg Order Value',
          agg: 'avg',
          color: C.sky,
          icon: 'Tag',
          prefix: '$',
        },
        {
          field: 'cartAbandonment',
          title: 'Cart Abandonment',
          agg: 'avg',
          color: C.teal,
          icon: 'ShoppingBag',
          suffix: '%',
          scale: 100,
        },
      ],
      primary: {
        field: 'revenue',
        title: 'Revenue Trend',
        type: 'line',
        color: C.indigo,
        prefix: '$',
      },
      donut: {
        key: 'productCategories',
        nameKey: 'category',
        valueKey: 'revenue',
        title: 'Revenue by Category',
        type: 'pie',
      },
      secondary: {
        field: 'orders',
        title: 'Daily Orders',
        type: 'bar',
        color: C.violet,
      },
      extra: {
        key: 'paymentMethods',
        nameKey: 'method',
        valueKey: 'orders',
        title: 'Payment Methods',
        type: 'bar',
      },
    },
  },
  'internal-saas': {
    data: internalSaasData as unknown as Record<string, unknown>,
    def: {
      name: 'SaaS Metrics',
      subtitle: 'Revenue, growth & retention from your application database',
      kpis: [
        {
          field: 'mrr',
          title: 'MRR',
          agg: 'last',
          color: C.indigo,
          icon: 'DollarSign',
          prefix: '$',
          compact: true,
        },
        {
          field: 'revenue',
          title: 'Daily Revenue',
          agg: 'sum',
          color: C.violet,
          icon: 'TrendingUp',
          prefix: '$',
          compact: true,
        },
        {
          field: 'signups',
          title: 'New Signups',
          agg: 'sum',
          color: C.sky,
          icon: 'UserPlus',
          compact: true,
        },
        {
          field: 'churnRate',
          title: 'Churn Rate',
          agg: 'avg',
          color: C.teal,
          icon: 'Activity',
          suffix: '%',
          scale: 100,
        },
      ],
      primary: {
        field: 'revenue',
        title: 'Revenue Trend',
        type: 'line',
        color: C.indigo,
        prefix: '$',
      },
      donut: {
        key: 'subscriptionTiers',
        nameKey: 'tier',
        valueKey: 'mrr',
        title: 'MRR by Tier',
        type: 'pie',
      },
      secondary: {
        field: 'signups',
        title: 'Daily Signups',
        type: 'bar',
        color: C.violet,
      },
      extra: {
        key: 'featureUsage',
        nameKey: 'feature',
        valueKey: 'usage',
        title: 'Feature Usage',
        type: 'bar',
      },
    },
  },
}

// ---- runtime registries ----
export const SOURCE_SERIES: Record<string, MetricData[]> = {}
export const SOURCE_BREAKDOWNS: Record<
  string,
  Array<{ name: string; value: number }>
> = {}

function seriesId(source: string, field: string) {
  return `src:${source}:${field}`
}
function breakdownId(source: string, key: string) {
  return `brk:${source}:${key}`
}

function buildSeries(
  source: string,
  field: string,
  scale: number
): MetricData[] {
  const id = seriesId(source, field)
  if (SOURCE_SERIES[id]) return SOURCE_SERIES[id]
  const daily =
    (SOURCE_DEFS[source as DataSourceType].data.dailyMetrics as Array<
      Record<string, number | string>
    >) || []
  const out: MetricData[] = daily.map((d, i) => ({
    id: `${id}-${i}`,
    metric_id: id,
    value: Number(d[field] ?? 0) * scale,
    timestamp: new Date(`${d.date}T12:00:00`).toISOString(),
  }))
  SOURCE_SERIES[id] = out
  return out
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, k) => {
    if (acc && typeof acc === 'object')
      return (acc as Record<string, unknown>)[k]
    return undefined
  }, obj)
}

function buildBreakdown(source: string, b: BreakdownDef) {
  const id = breakdownId(source, b.key)
  if (SOURCE_BREAKDOWNS[id]) return id
  const raw = resolvePath(
    SOURCE_DEFS[source as DataSourceType].data,
    b.key
  ) as Array<Record<string, unknown>>
  SOURCE_BREAKDOWNS[id] = (raw || []).map((row) => ({
    name: String(row[b.nameKey]),
    value: Number(row[b.valueKey] ?? 0),
  }))
  return id
}

// ---- build dashboards + widgets ----
export const sourceDashboards: Dashboard[] = []
export const sourceWidgets: Widget[] = []

const now = '2024-01-15T10:00:00Z'

;(Object.keys(SOURCE_DEFS) as DataSourceType[]).forEach((source) => {
  const { def } = SOURCE_DEFS[source]
  const dashId = `dash-${source}`
  sourceDashboards.push({
    id: dashId,
    user_id: 'demo-user-1',
    name: def.name,
    is_default: source === 'google-analytics',
    created_at: now,
    updated_at: now,
  })

  let order = 0
  const push = (
    type: Widget['type'],
    title: string,
    metricId: string,
    config: WidgetConfig,
    width: number,
    height: number
  ) => {
    sourceWidgets.push({
      id: `w-${source}-${order}`,
      dashboard_id: dashId,
      type,
      title,
      metric_id: metricId,
      config,
      position_x: 0,
      position_y: order,
      width,
      height,
      created_at: now,
    })
    order++
  }

  // KPIs
  def.kpis.forEach((k) => {
    buildSeries(source, k.field, k.scale ?? 1)
    push(
      'kpi',
      k.title,
      seriesId(source, k.field),
      {
        color: k.color,
        icon: k.icon,
        aggregation: k.agg,
        compact: k.compact,
        prefix: k.prefix,
        suffix: k.suffix,
      },
      3,
      2
    )
  })

  // Primary line
  buildSeries(source, def.primary.field, def.primary.scale ?? 1)
  push(
    'line',
    def.primary.title,
    seriesId(source, def.primary.field),
    {
      color: def.primary.color,
      prefix: def.primary.prefix,
      suffix: def.primary.suffix,
    },
    8,
    3
  )

  // Donut breakdown
  const donutId = buildBreakdown(source, def.donut)
  push(
    'pie',
    def.donut.title,
    donutId,
    { breakdown: donutId, showLegend: true },
    4,
    3
  )

  // Secondary bar
  buildSeries(source, def.secondary.field, def.secondary.scale ?? 1)
  push(
    'bar',
    def.secondary.title,
    seriesId(source, def.secondary.field),
    {
      color: def.secondary.color,
    },
    6,
    3
  )

  // Extra breakdown
  const extraId = buildBreakdown(source, def.extra)
  push(
    def.extra.type,
    def.extra.title,
    extraId,
    { breakdown: extraId, color: C.violet },
    6,
    3
  )
})

// ---- resolvers used by the data client & widgets ----
export function getSourceSeries(
  metricId: string,
  startDate: Date,
  endDate: Date
): MetricData[] | null {
  const series = SOURCE_SERIES[metricId]
  if (!series) return null
  return series.filter((d) => {
    const t = new Date(d.timestamp)
    return t >= startDate && t <= endDate
  })
}

export function getBreakdownData(
  breakdownId: string
): Array<{ name: string; value: number }> {
  return SOURCE_BREAKDOWNS[breakdownId] || []
}

export function dashboardIdForSource(source: DataSourceType): string {
  return `dash-${source}`
}

export function getSourceMeta(source: DataSourceType): {
  name: string
  subtitle: string
} {
  const { def } = SOURCE_DEFS[source]
  return { name: def.name, subtitle: def.subtitle }
}
