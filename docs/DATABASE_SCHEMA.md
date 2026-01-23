# Database Schema - MVP #4: Dashboard de Analytics / Business Intelligence

**Database**: PostgreSQL (Supabase)  
**Version**: 1.0

---

## 📊 Entity Relationship Diagram

```mermaid
erDiagram
    auth_users ||--|| profiles : "extends"
    profiles ||--o{ dashboards : "owns"
    profiles ||--o{ alerts : "creates"
    dashboards ||--|{ widgets : "contains"
    widgets }o--|| metrics : "displays"
    alerts }o--|| metrics : "monitors"
    
    auth_users {
        uuid id PK
        text email
    }
    
    profiles {
        uuid id PK FK
        text email
        text full_name
        text company_name
        text avatar_url
        timestamp created_at
    }
    
    dashboards {
        uuid id PK
        uuid user_id FK
        text name
        jsonb layout
        boolean is_default
        timestamp created_at
        timestamp updated_at
    }
    
    widgets {
        uuid id PK
        uuid dashboard_id FK
        text type "kpi|line|bar|pie|table"
        text title
        uuid metric_id FK
        jsonb config
        integer position_x
        integer position_y
        integer width
        integer height
        timestamp created_at
    }
    
    metrics {
        uuid id PK
        uuid user_id FK
        text name
        text source "manual|api|csv"
        text aggregation "sum|avg|count|min|max"
        timestamp created_at
    }
    
    metric_data {
        uuid id PK
        uuid metric_id FK
        decimal value
        timestamp timestamp
    }
    
    alerts {
        uuid id PK
        uuid user_id FK
        uuid metric_id FK
        text name
        text condition "gt|lt|eq|pct_change"
        decimal threshold
        boolean is_active
        text notification_email
        timestamp last_triggered
        timestamp created_at
    }
```

---

## Tables

### 1. `profiles`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PK, REFERENCES auth.users |
| `email` | TEXT | NOT NULL |
| `full_name` | TEXT | NOT NULL |
| `company_name` | TEXT | |
| `avatar_url` | TEXT | |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

### 2. `dashboards`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `user_id` | UUID | REFERENCES profiles(id) |
| `name` | TEXT | NOT NULL |
| `layout` | JSONB | Grid layout config |
| `is_default` | BOOLEAN | DEFAULT false |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes**:
- `idx_dashboards_user` on `user_id`

---

### 3. `widgets`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `dashboard_id` | UUID | REFERENCES dashboards(id) ON DELETE CASCADE |
| `type` | TEXT | CHECK (IN 'kpi', 'line', 'bar', 'pie', 'table') |
| `title` | TEXT | NOT NULL |
| `metric_id` | UUID | REFERENCES metrics(id) |
| `config` | JSONB | Chart config (colors, etc) |
| `position_x` | INTEGER | NOT NULL |
| `position_y` | INTEGER | NOT NULL |
| `width` | INTEGER | DEFAULT 4 |
| `height` | INTEGER | DEFAULT 3 |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes**:
- `idx_widgets_dashboard` on `dashboard_id`

---

### 4. `metrics`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `user_id` | UUID | REFERENCES profiles(id) |
| `name` | TEXT | NOT NULL |
| `source` | TEXT | CHECK (IN 'manual', 'api', 'csv') |
| `aggregation` | TEXT | CHECK (IN 'sum', 'avg', 'count', 'min', 'max') |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

### 5. `metric_data`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `metric_id` | UUID | REFERENCES metrics(id) ON DELETE CASCADE |
| `value` | DECIMAL(20,4) | NOT NULL |
| `timestamp` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Indexes**:
- `idx_metric_data_metric_time` on `metric_id, timestamp DESC`
- `idx_metric_data_timestamp` on `timestamp`

---

### 6. `alerts`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `user_id` | UUID | REFERENCES profiles(id) |
| `metric_id` | UUID | REFERENCES metrics(id) |
| `name` | TEXT | NOT NULL |
| `condition` | TEXT | CHECK (IN 'gt', 'lt', 'eq', 'pct_change') |
| `threshold` | DECIMAL(20,4) | NOT NULL |
| `is_active` | BOOLEAN | DEFAULT true |
| `notification_email` | TEXT | NOT NULL |
| `last_triggered` | TIMESTAMPTZ | |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

## RLS Policies

```sql
-- Dashboards: User-scoped
CREATE POLICY "Users can view own dashboards"
  ON dashboards FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own dashboards"
  ON dashboards FOR ALL
  USING (user_id = auth.uid());

-- Widgets: Inherited from dashboard
CREATE POLICY "Users can view widgets from own dashboards"
  ON widgets FOR SELECT
  USING (
    dashboard_id IN (SELECT id FROM dashboards WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage widgets from own dashboards"
  ON widgets FOR ALL
  USING (
    dashboard_id IN (SELECT id FROM dashboards WHERE user_id = auth.uid())
  );

-- Metrics: User-scoped
CREATE POLICY "Users can manage own metrics"
  ON metrics FOR ALL
  USING (user_id = auth.uid());

-- Metric data: Inherited from metric
CREATE POLICY "Users can view own metric data"
  ON metric_data FOR SELECT
  USING (
    metric_id IN (SELECT id FROM metrics WHERE user_id = auth.uid())
  );

-- Alerts: User-scoped
CREATE POLICY "Users can manage own alerts"
  ON alerts FOR ALL
  USING (user_id = auth.uid());
```

---

**References**:
- Implementation: `START_HERE/ENGINEERING.md` § 4-6
- API: `docs/API_SPEC.md`
