// Data Factory - Switches between Demo Mode and Production Mode
import type { DataClient } from '@/types'
import { mockDataClient } from './mock-data/client'

// Check if we're in demo mode (default: true)
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'

// Export the appropriate client based on mode
export function getDataClient(): DataClient {
    if (isDemoMode) {
        return mockDataClient
    }

    // In production mode, return Supabase client
    // TODO: Implement Supabase client when needed
    throw new Error('Production mode not yet implemented. Set NEXT_PUBLIC_DEMO_MODE=true')
}

// For convenience, export a default client
export const dataClient = getDataClient()
