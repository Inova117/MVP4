# Demo Mode - MVP #4: Analytics Dashboard

## 🎭 Quick Start (Zero Configuration)

```bash
cd mvp-04-analytics-dashboard
npm install
npm run dev
```

Open http://localhost:3000 - **That's it!** No Supabase setup required.

---

## ✨ What You Get in Demo Mode

### Fully Functional App
- ✅ Complete dashboard UI with drag-and-drop widgets
- ✅ Interactive charts (Recharts)
- ✅ Date filters with period comparison
- ✅ PDF export functionality
- ✅ Alert configuration
- ✅ Realistic mock data (30 days of metrics)

### Backend Code Showcase
- ✅ API routes visible in `/app/api`
- ✅ RLS logic documented in code
- ✅ Middleware for auth
- ✅ Zod validation schemas
- ✅ Database schema in `/docs`

---

## 📊 Mock Data Included

### Dashboards
- 2 pre-configured dashboards
- "Sales Overview" with 3 widgets
- "Marketing Performance" with 3 widgets

### Metrics (30 days)
- Revenue: $15K avg (trending up)
- Active Users: 1.2K avg
- Sessions: 5K avg
- Conversion Rate: 3.5% avg

### Widgets
- 6 widgets (KPI cards, line charts, bar charts, pie charts)
- Fully customizable via drag-and-drop

### Alerts
- 3 configured alerts
- Email notification settings
- Trigger history

---

## 🔍 Backend Code Tour

### 1. RLS Policies (Simulated)

**File**: `lib/supabase-mock.ts` (lines 50-70)

```typescript
function applyRLS(table: string, data: any[]): any[] {
  if (!currentMockUser) return data
  
  const userId = currentMockUser.id
  
  // Users can only see their own dashboards
  if (table === 'dashboards') {
    return data.filter(item => item.user_id === userId)
  }
  
  // Similar for widgets, metrics, alerts
  return data.filter(item => item.user_id === userId)
}
```

**What this shows**: Multi-tenancy security pattern where each user only sees their own data.

---

### 2. API Routes with Validation

**File**: `app/api/dashboards/route.ts`

```typescript
import { getSupabaseClient } from '@/lib/supabase-factory'
import { createDashboardSchema } from '@/lib/validations'

export async function POST(request: Request) {
  const supabase = getSupabaseClient() // Works in both modes!
  
  // Server-side validation
  const body = await request.json()
  const validated = createDashboardSchema.parse(body)
  
  // RLS enforced automatically
  const { data, error } = await supabase
    .from('dashboards')
    .insert(validated)
    .select()
    .single()
  
  return NextResponse.json({ data })
}
```

**What this shows**: 
- Factory pattern for mode switching
- Zod validation
- Type-safe API routes

---

### 3. Middleware (Auth Protection)

**File**: `middleware.ts`

```typescript
export async function middleware(request: NextRequest) {
  const supabase = getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

**What this shows**: Route protection pattern.

---

### 4. Database Schema

**File**: `docs/DATABASE_SCHEMA.md`

See full ERD with:
- Tables: dashboards, widgets, metrics, alerts
- Relationships
- RLS policies
- Indexes

---

## 🔄 Switch to Production Mode

When ready to deploy with real Supabase:

### Step 1: Create Supabase Project
```bash
# Go to https://supabase.com
# Create new project
# Copy URL and ANON_KEY
```

### Step 2: Update Environment
```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Run Migrations
```bash
# Copy SQL from docs/DATABASE_SCHEMA.md
# Or use Supabase CLI:
npx supabase db push
```

### Step 4: Deploy
```bash
vercel --prod
```

---

## 🎯 Use Cases

### For Portfolio
- Show to potential clients
- Demonstrate full-stack skills
- Showcase security patterns
- No setup friction

### For Development
- Test UI without backend
- Develop offline
- Fast iteration
- Consistent data for testing

### For Demos
- Sales presentations
- Client walkthroughs
- Training sessions
- Documentation screenshots

---

## 📁 File Structure

```
mvp-04-analytics-dashboard/
├── lib/
│   ├── supabase-factory.ts    # Mode switcher
│   ├── mock-data/              # Demo data
│   │   ├── dashboards.ts
│   │   ├── widgets.ts
│   │   ├── metrics.ts
│   │   └── alerts.ts
│   └── validations.ts          # Zod schemas
│
├── app/
│   ├── api/                    # Backend routes
│   │   ├── dashboards/
│   │   ├── widgets/
│   │   └── metrics/
│   └── dashboard/              # Frontend pages
│
└── docs/
    ├── DATABASE_SCHEMA.md      # Full schema
    └── DEMO_MODE.md            # This file
```

---

## ❓ FAQ

**Q: Does demo mode have limitations?**  
A: No! All features work. The only difference is data is in-memory vs database.

**Q: Can I modify the mock data?**  
A: Yes! Edit files in `lib/mock-data/`. Data regenerates on restart.

**Q: Will my changes persist?**  
A: In demo mode, no. Switch to production mode for persistence.

**Q: Can I deploy demo mode to Vercel?**  
A: Yes! Just deploy with `NEXT_PUBLIC_DEMO_MODE=true`. No other env vars needed.

**Q: How do I see the backend code?**  
A: Check `/app/api` folder and `lib/supabase-mock.ts` for RLS logic.

---

## 🚀 Next Steps

1. **Explore the app**: Play with widgets, charts, filters
2. **Read the code**: Check `/app/api` and `/lib`
3. **Customize**: Modify mock data to match your use case
4. **Deploy**: Push to Vercel for live demo
5. **Go production**: Follow switch guide above

---

**Demo Mode**: ✅ Active  
**Last Updated**: 2026-01-14  
**Questions?**: Check `START_HERE/README.md`
