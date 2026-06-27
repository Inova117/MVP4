// API Documentation Component
'use client'

import { useState } from 'react'
import { Code2 } from 'lucide-react'

export function ApiDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)

  const endpoints = [
    {
      method: 'GET',
      path: '/api/dashboards',
      description: 'List all user dashboards',
      auth: true,
      request: null,
      response: {
        data: [
          {
            id: 'dashboard-1',
            user_id: 'user-123',
            name: 'Sales Overview',
            layout: [{ i: 'widget-1', x: 0, y: 0 }],
            created_at: '2024-01-15T10:00:00Z',
          },
        ],
      },
    },
    {
      method: 'POST',
      path: '/api/dashboards',
      description: 'Create a new dashboard',
      auth: true,
      request: {
        name: 'Marketing Dashboard',
        description: 'Track campaign performance',
        layout: [],
      },
      response: {
        data: {
          id: 'dashboard-2',
          name: 'Marketing Dashboard',
          created_at: '2024-01-20T14:30:00Z',
        },
      },
    },
    {
      method: 'GET',
      path: '/api/widgets',
      description: 'List widgets for a dashboard',
      auth: true,
      request: null,
      response: {
        data: [
          {
            id: 'widget-1',
            dashboard_id: 'dashboard-1',
            type: 'kpi',
            title: 'Total Revenue',
            config: { metric: 'revenue', format: 'currency' },
          },
        ],
      },
    },
    {
      method: 'POST',
      path: '/api/widgets',
      description: 'Add widget to dashboard',
      auth: true,
      request: {
        dashboard_id: 'dashboard-1',
        type: 'line',
        title: 'Revenue Trend',
        config: { metric: 'revenue', period: 'daily' },
      },
      response: {
        data: {
          id: 'widget-2',
          type: 'line',
          created_at: '2024-01-20T15:00:00Z',
        },
      },
    },
    {
      method: 'GET',
      path: '/api/metrics',
      description: 'Fetch metric data for charts',
      auth: true,
      request: null,
      response: {
        data: [
          { date: '2024-01-01', value: 15420 },
          { date: '2024-01-02', value: 16230 },
          { date: '2024-01-03', value: 14890 },
        ],
      },
    },
    {
      method: 'POST',
      path: '/api/alerts',
      description: 'Create metric alert',
      auth: true,
      request: {
        name: 'Low Revenue Alert',
        metric_name: 'revenue',
        condition: 'less_than',
        threshold: 10000,
        email_enabled: true,
      },
      response: {
        data: {
          id: 'alert-1',
          is_active: true,
          created_at: '2024-01-20T16:00:00Z',
        },
      },
    },
  ]

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-info/10 text-info'
      case 'POST':
        return 'bg-success/10 text-success'
      case 'PUT':
        return 'bg-warning/10 text-warning'
      case 'DELETE':
        return 'bg-danger/10 text-danger'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="surface p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
          <Code2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            API Documentation
          </h2>
          <p className="text-sm text-muted-foreground">
            RESTful API with automatic validation
          </p>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-3">
        {endpoints.map((endpoint, idx) => (
          <div
            key={idx}
            className="border border-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setSelectedEndpoint(
                  selectedEndpoint === endpoint.path ? null : endpoint.path
                )
              }
              className="w-full p-4 hover:bg-card-muted transition flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-lg font-mono text-sm font-semibold ${getMethodColor(endpoint.method)}`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono text-foreground">
                  {endpoint.path}
                </span>
                {endpoint.auth && (
                  <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-lg font-medium">
                    🔐 Auth Required
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {endpoint.description}
                </span>
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform ${selectedEndpoint === endpoint.path ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Endpoint Details */}
            {selectedEndpoint === endpoint.path && (
              <div className="p-6 bg-card-muted border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Request */}
                  {endpoint.request && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Request Body
                      </h4>
                      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-success font-mono">
                          {JSON.stringify(endpoint.request, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Response (200 OK)
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-info font-mono">
                        {JSON.stringify(endpoint.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Validation Info */}
                <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-warning mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-warning">
                      <strong>Validation:</strong> All inputs validated
                      server-side with Zod schemas. Malformed requests return
                      400 with detailed error messages.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* API Stats */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">6</div>
          <div className="text-sm text-muted-foreground">Endpoints</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">100%</div>
          <div className="text-sm text-muted-foreground">Validated</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">&lt;100ms</div>
          <div className="text-sm text-muted-foreground">Avg Response</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">REST</div>
          <div className="text-sm text-muted-foreground">Standard</div>
        </div>
      </div>
    </div>
  )
}
