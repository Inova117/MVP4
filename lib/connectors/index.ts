// Data Connectors Registry
// Factory pattern to create and manage data source connections

import type { DataConnector, ConnectorType, ConnectorConfig } from './types'
import { GoogleAnalyticsConnector } from './google-analytics'
import { MetaAdsConnector } from './meta-ads'

export * from './types'
export { GoogleAnalyticsConnector } from './google-analytics'
export { MetaAdsConnector } from './meta-ads'

/**
 * Factory function to create connector instances
 */
export function createConnector(
    type: ConnectorType,
    config: ConnectorConfig
): DataConnector {
    switch (type) {
        case 'google-analytics':
            return new GoogleAnalyticsConnector(config)

        case 'meta-ads':
            return new MetaAdsConnector(config)

        case 'google-ads':
            // TODO: Implement Google Ads connector
            throw new Error('Google Ads connector not yet implemented')

        case 'internal-db':
            // Use existing Суpabase client
            throw new Error('Internal DB uses Supabase client directly')

        case 'csv-upload':
            // TODO: Implement CSV upload handler
            throw new Error('CSV upload not yet implemented')

        case 'api-webhook':
            // TODO: Implement webhook receiver
            throw new Error('API webhook not yet implemented')

        default:
            throw new Error(`Unknown connector type: ${type}`)
    }
}

/**
 * Get list of available connectors
 */
export function getAvailableConnectors(): Array<{
    type: ConnectorType
    name: string
    description: string
    status: 'available' | 'coming-soon'
}> {
    return [
        {
            type: 'google-analytics',
            name: 'Google Analytics 4',
            description: 'Connect to GA4 properties for web analytics',
            status: 'available',
        },
        {
            type: 'meta-ads',
            name: 'Meta Business (FB/IG Ads)',
            description: 'Fetch ad performance from Facebook & Instagram',
            status: 'available',
        },
        {
            type: 'google-ads',
            name: 'Google Ads',
            description: 'Import campaign metrics from Google Ads',
            status: 'coming-soon',
        },
        {
            type: 'internal-db',
            name: 'Internal Database',
            description: 'Store and query custom metrics in Supabase',
            status: 'available',
        },
        {
            type: 'csv-upload',
            name: 'CSV Upload',
            description: 'Import data from CSV/Excel files',
            status: 'coming-soon',
        },
        {
            type: 'api-webhook',
            name: 'API Webhook',
            description: 'Receive real-time data via REST API',
            status: 'coming-soon',
        },
    ]
}
