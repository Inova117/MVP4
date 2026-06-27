// Security Features Component
'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

export function SecurityFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const features = [
    {
      id: 'rls',
      name: 'Row Level Security (RLS)',
      status: 'active',
      description: 'Users can only access their own data',
      details:
        'PostgreSQL RLS policies enforce data isolation at the database level. Each query automatically filters results based on the authenticated user.',
      example: `-- Users can only see their own dashboards
CREATE POLICY "Users see own dashboards"
ON dashboards FOR SELECT
USING (auth.uid() = user_id);`,
    },
    {
      id: 'validation',
      name: 'API Input Validation',
      status: 'active',
      description: 'All inputs validated with Zod schemas',
      details:
        'Server-side validation ensures malicious data never reaches the database. Type-safe schemas prevent injection attacks.',
      example: `// Dashboard creation schema
const schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  layout: z.array(z.object({
    i: z.string(),
    x: z.number(),
    y: z.number()
  }))
});`,
    },
    {
      id: 'middleware',
      name: 'Auth Middleware',
      status: 'active',
      description: 'Protected routes require authentication',
      details:
        'Next.js middleware checks authentication before rendering protected pages. Unauthorized users are redirected to login.',
      example: `// Protect dashboard routes
export function middleware(request) {
  const session = await getSession()
  if (!session) {
    return redirect('/login')
  }
  return next()
}`,
    },
    {
      id: 'encryption',
      name: 'Data Encryption',
      status: 'active',
      description: 'All data encrypted at rest and in transit',
      details:
        'Supabase provides AES-256 encryption at rest. All connections use TLS 1.3 for data in transit.',
      example: 'Automatic encryption handled by Supabase infrastructure',
    },
  ]

  return (
    <div className="surface p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-danger/10 text-danger">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Security &amp; Data Protection
          </h2>
          <p className="text-sm text-muted-foreground">
            Enterprise-grade security built-in
          </p>
        </div>
      </div>

      {/* Features Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-card-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Security Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {features.map((feature) => (
              <tr key={feature.id} className="hover:bg-card-muted transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-foreground">
                    {feature.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                    ✓ Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    {feature.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() =>
                      setSelectedFeature(
                        selectedFeature === feature.id ? null : feature.id
                      )
                    }
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {selectedFeature === feature.id ? 'Hide' : 'View'} Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature Details (Expandable) */}
      {selectedFeature && (
        <div className="mt-6 p-6 bg-card-muted rounded-xl border border-border">
          {features.map(
            (feature) =>
              selectedFeature === feature.id && (
                <div key={feature.id}>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.details}
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-success font-mono">
                      {feature.example}
                    </pre>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Compliance Badges */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3 font-medium">
          Compliance &amp; Standards:
        </p>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary">
            SOC 2 Type II Ready
          </div>
          <div className="px-4 py-2 bg-success/10 border border-success/20 rounded-lg text-sm font-medium text-success">
            GDPR Compliant
          </div>
          <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm font-medium text-accent">
            HIPAA Compatible
          </div>
        </div>
      </div>
    </div>
  )
}
