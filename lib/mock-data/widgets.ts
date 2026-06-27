// Mock Data - Widgets
// Widgets are generated per data source from that source's real dataset.
import type { Widget } from '@/types'
import { sourceWidgets } from './source-config'

export const mockWidgets: Widget[] = [...sourceWidgets]
