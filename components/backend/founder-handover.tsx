// Founder Handover Component
'use client'

import { useState } from 'react'
import { ClipboardList, GitBranch, BarChart3, Check } from 'lucide-react'

export function FounderHandover() {
  const [activeTab, setActiveTab] = useState<
    'product' | 'technical' | 'roadmap'
  >('product')

  return (
    <div className="surface overflow-hidden">
      <div className="border-b border-border bg-card-muted px-8 py-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Project Documentation Package
        </h2>
        <div className="flex gap-2">
          {['product', 'technical', 'roadmap'].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as 'product' | 'technical' | 'roadmap')
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'product' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Product Strategy &amp; Scope
                </h3>
                <p className="text-sm text-muted-foreground">
                  Defined scope and deliverables for MVP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  Core Features (MoSCoW - Must Have)
                </h4>
                <ul className="space-y-3">
                  {[
                    'User Authentication & RBAC',
                    'Interactive Dashboard Grid',
                    'Widget Library (KPI, Charts)',
                    'Real-time Data Updates',
                    'PDF Export Functionality',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground bg-card-muted p-2 rounded-lg"
                    >
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  User Stories
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      role: 'Admin',
                      action: 'Create custom layouts',
                      benefit: 'match business KPIs',
                    },
                    {
                      role: 'Viewer',
                      action: 'Filter data by date',
                      benefit: 'analyze trends',
                    },
                    {
                      role: 'System',
                      action: 'Trigger alerts',
                      benefit: 'notify anomalies',
                    },
                  ].map((story, i) => (
                    <div
                      key={i}
                      className="text-sm p-3 bg-primary/5 rounded-lg border border-primary/15 text-foreground"
                    >
                      <span className="font-bold text-primary">
                        As a {story.role}
                      </span>
                      , I want to {story.action} so that I can {story.benefit}.
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Technical Specifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  Infrastructure, deployment, and security details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border border-border">
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Frontend
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• Tailwind CSS</li>
                  <li>• Recharts</li>
                  <li>• React Grid Layout</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-border">
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Backend/DB
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Supabase (PostgreSQL)</li>
                  <li>• Edge Functions</li>
                  <li>• Row Level Security</li>
                  <li>• Real-time Subscriptions</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-border">
                <h4 className="font-display font-semibold text-foreground mb-2">
                  DevOps
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Vercel Deployment</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Automated Testing</li>
                  <li>• Env Var Management</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-success border-b border-slate-700 pb-2">
                <Check className="w-4 h-4" />
                Deployment Checklist
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-white mb-1">1. Environment Setup</div>
                  <div className="pl-4 border-l-2 border-slate-700">
                    Configure .env.local
                    <br />
                    Set Supabase secrets
                  </div>
                </div>
                <div>
                  <div className="text-white mb-1">2. Build & Optimization</div>
                  <div className="pl-4 border-l-2 border-slate-700">
                    Run type check
                    <br />
                    Build production bundle
                  </div>
                </div>
                <div>
                  <div className="text-white mb-1">3. Database Migration</div>
                  <div className="pl-4 border-l-2 border-slate-700">
                    Apply schema changes
                    <br />
                    Verify RLS policies
                  </div>
                </div>
                <div>
                  <div className="text-white mb-1">4. Go Live</div>
                  <div className="pl-4 border-l-2 border-slate-700">
                    Deploy to Vercel
                    <br />
                    Domain verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-warning/10 text-warning">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Future Roadmap (Post-MVP)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recommended Next Steps
                </p>
              </div>
            </div>

            <div className="relative border-l-2 border-border ml-4 space-y-8">
              {[
                {
                  phase: 'Phase 1 (Current)',
                  title: 'MVP Launch',
                  date: 'Now',
                  desc: 'Core dashboard functionality, RLS security, Basic widgets',
                },
                {
                  phase: 'Phase 2',
                  title: 'Advanced Analytics',
                  date: '+1 Month',
                  desc: 'Predictive models, AI insights integration, Report scheduling',
                },
                {
                  phase: 'Phase 3',
                  title: 'Enterprise Features',
                  date: '+3 Months',
                  desc: 'SSO (SAML), Audit logs, Custom domain branding',
                },
              ].map((item, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-card border-4 border-primary"></div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                    {item.phase}
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground">
                    {item.title}
                  </h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    {item.date}
                  </div>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
