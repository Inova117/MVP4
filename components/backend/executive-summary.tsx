// Executive Summary Component
'use client'

export function ExecutiveSummary() {
  return (
    <div className="surface overflow-hidden">
      <div className="bg-gradient-to-br from-primary to-accent p-8 text-white">
        <h2 className="font-display text-2xl font-bold mb-2">
          Executive Summary
        </h2>
        <p className="text-white/80">Project Status &amp; Key Deliverables</p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-success/5 rounded-xl border border-success/15">
            <div className="text-sm text-success font-medium mb-1">
              Project Status
            </div>
            <div className="text-2xl font-bold text-success">
              Production Ready
            </div>
            <div className="text-xs text-success mt-1">
              Ready for deployment
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/15">
            <div className="text-sm text-primary font-medium mb-1">
              Time to Market
            </div>
            <div className="text-2xl font-bold text-primary">2 Weeks</div>
            <div className="text-xs text-primary mt-1">vs 3-4 months avg</div>
          </div>

          <div className="p-4 bg-accent/5 rounded-xl border border-accent/15">
            <div className="text-sm text-accent font-medium mb-1">
              Scalability
            </div>
            <div className="text-2xl font-bold text-accent">Auto-Scaling</div>
            <div className="text-xs text-accent mt-1">
              Serverless architecture
            </div>
          </div>

          <div className="p-4 bg-warning/5 rounded-xl border border-warning/15">
            <div className="text-sm text-warning font-medium mb-1">
              Compliance
            </div>
            <div className="text-2xl font-bold text-warning">Standard</div>
            <div className="text-xs text-warning mt-1">
              GDPR &amp; SOC2 ready
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-primary uppercase tracking-wider bg-primary/5">
                  Our Solution
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Traditional Dev
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  No-Code Tools
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  name: 'Source Code Ownership',
                  us: '100% Owned',
                  trad: '100% Owned',
                  nc: '0% (Locked)',
                },
                {
                  name: 'Scalability',
                  us: 'Enterprise',
                  trad: 'Manual Scale',
                  nc: 'Limited',
                },
                {
                  name: 'Running Costs',
                  us: 'Low (Serverless)',
                  trad: 'High (Servers)',
                  nc: 'Medium/High',
                },
                {
                  name: 'Customization',
                  us: 'Unlimited',
                  trad: 'Unlimited',
                  nc: 'Restricted',
                },
                {
                  name: 'Delivery Time',
                  us: '2 Weeks',
                  trad: '3-6 Months',
                  nc: '1 Month',
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-card' : 'bg-card-muted'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-primary bg-primary/5">
                    {row.us}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-muted-foreground">
                    {row.trad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-muted-foreground">
                    {row.nc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
