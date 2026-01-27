// Data Source Registry and Selector
// Centralized access to all mock data sources

import { googleAnalyticsData } from './sources/google-analytics'
import { metaAdsData } from './sources/meta-ads'
import { internalSaasData } from './sources/internal-saas'
import { ecommerceData } from './sources/ecommerce'

export type DataSourceType =
  | 'google-analytics'
  | 'meta-ads'
  | 'internal-saas'
  | 'ecommerce'

export interface DataSource {
  id: DataSourceType
  name: string
  icon: string
  description: string
  category: 'marketing' | 'business' | 'ecommerce'
  status: 'active' | 'demo'
  data: unknown
}

export const dataSources: Record<DataSourceType, DataSource> = {
  'google-analytics': {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    icon: '📊',
    description: 'Web traffic, user behavior, and conversions',
    category: 'marketing',
    status: 'demo',
    data: googleAnalyticsData,
  },
  'meta-ads': {
    id: 'meta-ads',
    name: 'Meta Business (FB/IG Ads)',
    icon: '📱',
    description: 'Social media advertising performance',
    category: 'marketing',
    status: 'demo',
    data: metaAdsData,
  },
  'internal-saas': {
    id: 'internal-saas',
    name: 'Internal Database',
    icon: '💾',
    description: 'SaaS metrics, subscriptions, and engagement',
    category: 'business',
    status: 'active',
    data: internalSaasData,
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce Platform',
    icon: '🛒',
    description: 'Online store sales, products, and customers',
    category: 'ecommerce',
    status: 'demo',
    data: ecommerceData,
  },
}

/**
 * Get data from a specific source
 */
export function getDataSource(sourceId: DataSourceType) {
  return dataSources[sourceId]
}

/**
 * Get all available data sources
 */
export function getAllDataSources() {
  return Object.values(dataSources)
}

/**
 * Get active data source (from localStorage or default)
 */
export function getActiveDataSource(): DataSourceType {
  if (typeof window === 'undefined') return 'google-analytics'

  const stored = localStorage.getItem('activeDataSource')
  return (stored as DataSourceType) || 'google-analytics'
}

/**
 * Set active data source
 */
export function setActiveDataSource(sourceId: DataSourceType) {
  if (typeof window === 'undefined') return

  localStorage.setItem('activeDataSource', sourceId)
  // Trigger a custom event to notify components
  window.dispatchEvent(
    new CustomEvent('dataSourceChanged', { detail: sourceId })
  )
}
