// Mock Data - Dashboards
// One dashboard per connected data source. Switching the active source in the
// UI swaps which dashboard (and therefore which real dataset) is shown.
import type { Dashboard } from '@/types'
import { sourceDashboards } from './source-config'

export const mockDashboards: Dashboard[] = [...sourceDashboards]
