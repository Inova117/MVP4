-- Analytics Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- 1. DASHBOARDS TABLE
-- ============================================
create table dashboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  is_default boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS Policies for dashboards
alter table dashboards enable row level security;

create policy "Users can view own dashboards"
  on dashboards for select
  using (auth.uid() = user_id);

create policy "Users can create own dashboards"
  on dashboards for insert
  with check (auth.uid() = user_id);

create policy "Users can update own dashboards"
  on dashboards for update
  using (auth.uid() = user_id);

create policy "Users can delete own dashboards"
  on dashboards for delete
  using (auth.uid() = user_id);

-- ============================================
-- 2. METRICS TABLE
-- ============================================
create table metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  unit text,
  created_at timestamptz default now()
);

-- RLS Policies for metrics
alter table metrics enable row level security;

create policy "Users can view own metrics"
  on metrics for select
  using (auth.uid() = user_id);

create policy "Users can create own metrics"
  on metrics for insert
  with check (auth.uid() = user_id);

create policy "Users can update own metrics"
  on metrics for update
  using (auth.uid() = user_id);

create policy "Users can delete own metrics"
  on metrics for delete
  using (auth.uid() = user_id);

-- ============================================
-- 3. METRIC_DATA TABLE
-- ============================================
create table metric_data (
  id uuid primary key default gen_random_uuid(),
  metric_id uuid references metrics on delete cascade not null,
  value numeric not null,
  timestamp timestamptz default now(),
  metadata jsonb default '{}'::jsonb
);

-- Index for fast queries
create index idx_metric_data_metric_timestamp 
  on metric_data(metric_id, timestamp desc);

-- RLS Policies for metric_data
alter table metric_data enable row level security;

create policy "Users can view data from own metrics"
  on metric_data for select
  using (
    exists (
      select 1 from metrics
      where metrics.id = metric_data.metric_id
      and metrics.user_id = auth.uid()
    )
  );

create policy "Users can insert data to own metrics"
  on metric_data for insert
  with check (
    exists (
      select 1 from metrics
      where metrics.id = metric_data.metric_id
      and metrics.user_id = auth.uid()
    )
  );

-- ============================================
-- 4. WIDGETS TABLE
-- ============================================
create table widgets (
  id uuid primary key default gen_random_uuid(),
  dashboard_id uuid references dashboards on delete cascade not null,
  type text not null check (type in ('kpi', 'line', 'bar', 'pie', 'table')),
  title text not null,
  metric_id uuid references metrics,
  config jsonb default '{}'::jsonb,
  position_x int default 0,
  position_y int default 0,
  width int default 4,
  height int default 4,
  created_at timestamptz default now()
);

-- RLS Policies for widgets
alter table widgets enable row level security;

create policy "Users can view widgets from own dashboards"
  on widgets for select
  using (
    exists (
      select 1 from dashboards
      where dashboards.id = widgets.dashboard_id
      and dashboards.user_id = auth.uid()
    )
  );

create policy "Users can create widgets in own dashboards"
  on widgets for insert
  with check (
    exists (
      select 1 from dashboards
      where dashboards.id = widgets.dashboard_id
      and dashboards.user_id = auth.uid()
    )
  );

create policy "Users can update widgets in own dashboards"
  on widgets for update
  using (
    exists (
      select 1 from dashboards
      where dashboards.id = widgets.dashboard_id
      and dashboards.user_id = auth.uid()
    )
  );

create policy "Users can delete widgets from own dashboards"
  on widgets for delete
  using (
    exists (
      select 1 from dashboards
      where dashboards.id = widgets.dashboard_id
      and dashboards.user_id = auth.uid()
    )
  );

-- ============================================
-- 5. ALERTS TABLE
-- ============================================
create table alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  metric_id uuid references metrics on delete cascade not null,
  name text not null,
  condition text not null check (condition in ('gt', 'lt', 'eq')),
  threshold numeric not null,
  notification_email text not null,
  is_active boolean default true,
  last_triggered timestamptz,
  created_at timestamptz default now()
);

-- RLS Policies for alerts
alter table alerts enable row level security;

create policy "Users can manage own alerts"
  on alerts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================
-- 6. SEED DATA (DEMO MODE)
-- ============================================

-- Function to create demo data for a user
create or replace function create_demo_data(target_user_id uuid)
returns void as $$
declare
  demo_dashboard_id uuid;
  revenue_metric_id uuid;
  users_metric_id uuid;
  conversion_metric_id uuid;
  i int;
begin
  -- Create default dashboard
  insert into dashboards (user_id, name, is_default)
  values (target_user_id, 'My Dashboard', true)
  returning id into demo_dashboard_id;

  -- Create metrics
  insert into metrics (user_id, name, description, unit)
  values 
    (target_user_id, 'Revenue', 'Daily revenue', '$'),
    (target_user_id, 'Active Users', 'Daily active users', 'users'),
    (target_user_id, 'Conversion Rate', 'Daily conversion rate', '%')
  returning id into revenue_metric_id;

  -- Get metric IDs
  select id into revenue_metric_id from metrics where user_id = target_user_id and name = 'Revenue';
  select id into users_metric_id from metrics where user_id = target_user_id and name = 'Active Users';
  select id into conversion_metric_id from metrics where user_id = target_user_id and name = 'Conversion Rate';

  -- Generate 30 days of data
  for i in 0..29 loop
    insert into metric_data (metric_id, value, timestamp)
    values 
      (revenue_metric_id, 5000 + random() * 3000, now() - (i || ' days')::interval),
      (users_metric_id, 1000 + random() * 500, now() - (i || ' days')::interval),
      (conversion_metric_id, 2 + random() * 3, now() - (i || ' days')::interval);
  end loop;

  -- Create sample widgets
  insert into widgets (dashboard_id, type, title, metric_id, config, position_x, position_y, width, height)
  values
    (demo_dashboard_id, 'kpi', 'Total Revenue', revenue_metric_id, '{"prefix": "$", "color": "#0ea5e9"}'::jsonb, 0, 0, 4, 2),
    (demo_dashboard_id, 'kpi', 'Active Users', users_metric_id, '{"color": "#d946ef"}'::jsonb, 4, 0, 4, 2),
    (demo_dashboard_id, 'line', 'Revenue Trend', revenue_metric_id, '{"color": "#0ea5e9"}'::jsonb, 0, 2, 8, 4),
    (demo_dashboard_id, 'bar', 'User Growth', users_metric_id, '{"color": "#d946ef"}'::jsonb, 8, 0, 4, 6);

  -- Create sample alert
  insert into alerts (user_id, metric_id, name, condition, threshold, notification_email)
  values (target_user_id, revenue_metric_id, 'Low Revenue Alert', 'lt', 4000, 'demo@example.com');
end;
$$ language plpgsql;

-- ============================================
-- USAGE INSTRUCTIONS
-- ============================================
-- After a user signs up, call:
-- select create_demo_data(auth.uid());
