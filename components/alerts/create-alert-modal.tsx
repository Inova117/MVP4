'use client'

import { useState, useEffect } from 'react'
import { XIcon, BellIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { getDataClient } from '@/lib/supabase'
import type { Metric } from '@/types'

const alertSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  metric_id: z.string().min(1, 'Please select a metric'),
  condition: z.enum(['gt', 'lt', 'eq', 'pct_change']),
  threshold: z.number().min(0, 'Threshold must be a positive number'),
  notification_email: z.string().email('Invalid email address'),
})

type AlertFormData = z.infer<typeof alertSchema>

interface CreateAlertModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateAlertModal({
  onClose,
  onSuccess,
}: CreateAlertModalProps) {
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const dataClient = getDataClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlertFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      condition: 'lt',
      threshold: 0,
    },
  })

  useEffect(() => {
    async function loadMetrics() {
      const data = await dataClient.getMetrics()
      setMetrics(data)
    }
    loadMetrics()
  }, [dataClient])

  const onSubmit = async (data: AlertFormData) => {
    setLoading(true)
    try {
      await dataClient.createAlert({
        ...data,
        is_active: true,
        user_id: 'demo-user-1', // In real app, from auth context
      })
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Failed to create alert:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-slide-up">
        <div className="glass bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
            <div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Create Actionable Alert
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Get notified when metrics change
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Alert Name
              </label>
              <input
                {...register('name')}
                placeholder="e.g. Low Revenue Warning"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
              />
              {errors.name && (
                <p className="text-xs text-danger">{errors.name.message}</p>
              )}
            </div>

            {/* Metric */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Monitor Metric
              </label>
              <select
                {...register('metric_id')}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
              >
                <option value="">Select a metric...</option>
                {metrics.map((metric) => (
                  <option key={metric.id} value={metric.id}>
                    {metric.name}
                  </option>
                ))}
              </select>
              {errors.metric_id && (
                <p className="text-xs text-danger">
                  {errors.metric_id.message}
                </p>
              )}
            </div>

            {/* Condition & Threshold */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Condition
                </label>
                <select
                  {...register('condition')}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                >
                  <option value="gt">Greater than</option>
                  <option value="lt">Less than</option>
                  <option value="eq">Equal to</option>
                  <option value="pct_change">% Change</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Threshold
                </label>
                <input
                  type="number"
                  step="any"
                  {...register('threshold', { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                />
                {errors.threshold && (
                  <p className="text-xs text-danger">
                    {errors.threshold.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notification Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Notify Email
              </label>
              <input
                {...register('notification_email')}
                placeholder="alert@company.com"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
              />
              {errors.notification_email && (
                <p className="text-xs text-danger">
                  {errors.notification_email.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition font-medium text-sm"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm"
              >
                {loading ? (
                  <>
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <BellIcon className="w-4 h-4" />
                    Create Alert
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
