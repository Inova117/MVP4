'use client'

import { useState, useEffect, useCallback } from 'react'
import { PlusIcon } from 'lucide-react'
import { AlertList } from '@/components/alerts/alert-list'
import { CreateAlertModal } from '@/components/alerts/create-alert-modal'
import { getDataClient } from '@/lib/supabase'
import { AppShell } from '@/components/app-shell'
import type { Alert } from '@/types'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const dataClient = getDataClient()

  const loadAlerts = useCallback(async () => {
    try {
      setAlerts(await dataClient.getAlerts())
    } catch (error) {
      console.error('Failed to load alerts:', error)
    } finally {
      setLoading(false)
    }
  }, [dataClient])

  useEffect(() => {
    loadAlerts()
  }, [loadAlerts])

  const activeCount = alerts.filter((a) => a.is_active).length

  return (
    <AppShell
      title="Alerts"
      subtitle="Get notified the moment a metric crosses a threshold"
      actions={
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="hidden sm:inline">New Alert</span>
        </button>
      }
    >
      {!loading && alerts.length > 0 && (
        <div className="mb-5 grid grid-cols-3 gap-4">
          <StatCard label="Total Alerts" value={alerts.length} />
          <StatCard label="Active" value={activeCount} accent="text-success" />
          <StatCard
            label="Paused"
            value={alerts.length - activeCount}
            accent="text-muted-foreground"
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
        </div>
      ) : (
        <AlertList alerts={alerts} onUpdate={loadAlerts} />
      )}

      {showCreateModal && (
        <CreateAlertModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={loadAlerts}
        />
      )}
    </AppShell>
  )
}

function StatCard({
  label,
  value,
  accent = 'text-foreground',
}: {
  label: string
  value: number
  accent?: string
}) {
  return (
    <div className="surface p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={`mt-1 font-display text-2xl font-bold tabular-nums ${accent}`}
      >
        {value}
      </p>
    </div>
  )
}
