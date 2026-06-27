// Database Schema Component
'use client'

import { useState } from 'react'
import { DatabaseIcon, LockIcon } from 'lucide-react'
import { SchemaDiagram } from './diagrams'

export function DatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const tables = [
    {
      name: 'dashboards',
      description: 'User dashboard configurations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          pk: true,
          description: 'Unique identifier',
        },
        {
          name: 'user_id',
          type: 'uuid',
          fk: 'auth.users',
          description: 'Owner of dashboard',
        },
        { name: 'name', type: 'text', description: 'Dashboard name' },
        {
          name: 'description',
          type: 'text',
          description: 'Optional description',
        },
        { name: 'layout', type: 'jsonb', description: 'Widget positions' },
        {
          name: 'created_at',
          type: 'timestamptz',
          description: 'Creation timestamp',
        },
      ],
      rls: 'Users can only view/edit their own dashboards',
      count: '4 records (demo)',
    },
    {
      name: 'widgets',
      description: 'Dashboard widgets',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          pk: true,
          description: 'Unique identifier',
        },
        {
          name: 'dashboard_id',
          type: 'uuid',
          fk: 'dashboards',
          description: 'Parent dashboard',
        },
        {
          name: 'type',
          type: 'text',
          description: 'Widget type (kpi, line, bar, pie)',
        },
        { name: 'title', type: 'text', description: 'Widget title' },
        { name: 'config', type: 'jsonb', description: 'Widget configuration' },
        {
          name: 'created_at',
          type: 'timestamptz',
          description: 'Creation timestamp',
        },
      ],
      rls: 'Inherits dashboard permissions',
      count: '32 records (demo)',
    },
    {
      name: 'metrics',
      description: 'Time-series metric data',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          pk: true,
          description: 'Unique identifier',
        },
        { name: 'metric_name', type: 'text', description: 'Metric identifier' },
        { name: 'date', type: 'date', description: 'Metric date' },
        { name: 'value', type: 'numeric', description: 'Metric value' },
        {
          name: 'user_id',
          type: 'uuid',
          fk: 'auth.users',
          description: 'Data owner',
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          description: 'Creation timestamp',
        },
      ],
      rls: 'Users see only their own metrics',
      count: '1.2k+ records (demo)',
    },
    {
      name: 'alerts',
      description: 'Metric alert configurations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          pk: true,
          description: 'Unique identifier',
        },
        {
          name: 'user_id',
          type: 'uuid',
          fk: 'auth.users',
          description: 'Alert owner',
        },
        { name: 'name', type: 'text', description: 'Alert name' },
        { name: 'metric_name', type: 'text', description: 'Watched metric' },
        { name: 'condition', type: 'text', description: 'Trigger condition' },
        { name: 'threshold', type: 'numeric', description: 'Threshold value' },
        { name: 'is_active', type: 'boolean', description: 'Alert enabled' },
      ],
      rls: 'Users manage their own alerts',
      count: '3 records (demo)',
    },
  ]

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-success/10 text-success">
          <DatabaseIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Database Schema
          </h2>
          <p className="text-sm text-muted-foreground">
            PostgreSQL with Row Level Security
          </p>
        </div>
      </div>

      {/* Schema relationship diagram */}
      <div className="mb-6 rounded-2xl border border-border bg-card-muted/40 p-5">
        <SchemaDiagram />
      </div>

      {/* Tables Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tables.map((table) => (
          <button
            key={table.name}
            onClick={() =>
              setSelectedTable(selectedTable === table.name ? null : table.name)
            }
            className={`rounded-xl border-2 p-4 text-left transition ${
              selectedTable === table.name
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/40'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-mono font-semibold text-foreground">
                {table.name}
              </h3>
              <span className="text-xs text-muted-foreground">
                {table.count}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{table.description}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
              <LockIcon className="h-3.5 w-3.5" />
              <span>RLS Protected</span>
            </div>
          </button>
        ))}
      </div>

      {/* Table Details */}
      {selectedTable && (
        <div className="rounded-2xl border border-border bg-card-muted/40 p-5 animate-fade-in">
          {tables.map(
            (table) =>
              selectedTable === table.name && (
                <div key={table.name}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {table.name}
                    </h3>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      {table.rls}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          {['Column', 'Type', 'Constraints', 'Description'].map(
                            (h) => (
                              <th
                                key={h}
                                className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                              >
                                {h}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {table.columns.map((column) => (
                          <tr key={column.name}>
                            <td className="px-4 py-2 font-mono text-sm text-foreground">
                              {column.name}
                            </td>
                            <td className="px-4 py-2 text-sm text-muted-foreground">
                              {column.type}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {column.pk && (
                                <span className="mr-1 rounded bg-warning/10 px-2 py-1 text-xs font-semibold text-warning">
                                  PK
                                </span>
                              )}
                              {column.fk && (
                                <span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                                  FK → {column.fk}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-muted-foreground">
                              {column.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
        {[
          { v: '4', l: 'Tables' },
          { v: '100%', l: 'RLS Coverage' },
          { v: '1.2k+', l: 'Demo Records' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-2xl font-bold text-foreground">
              {s.v}
            </div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
