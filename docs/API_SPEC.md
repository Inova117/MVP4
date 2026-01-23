# API Specification - MVP #4: Dashboard de Analytics / Business Intelligence

**Version**: 1.0  
**Base URL**: `https://your-app.vercel.app/api`

---

## Endpoints

### Dashboards

#### GET /api/dashboards
List user's dashboards.

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Sales Dashboard",
      "is_default": true,
      "widget_count": 6,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /api/dashboards
Create new dashboard.

**Request**:
```json
{
  "name": "Marketing Dashboard",
  "is_default": false
}
```

**Response 201**:
```json
{
  "data": {
    "id": "uuid",
    "name": "Marketing Dashboard",
    "layout": {},
    "widgets": []
  }
}
```

---

### Widgets

#### POST /api/widgets
Create widget.

**Request**:
```json
{
  "dashboard_id": "uuid",
  "type": "line",
  "title": "Revenue Over Time",
  "metric_id": "uuid",
  "config": {
    "color": "#3b82f6",
    "showLegend": true
  },
  "position_x": 0,
  "position_y": 0,
  "width": 8,
  "height": 4
}
```

**Validation**:
- type: kpi, line, bar, pie, table
- metric_id must exist
- position valid in 12-column grid

---

#### PATCH /api/widgets/[id]
Update widget (drag-and-drop, config).

**Request**:
```json
{
  "position_x": 4,
  "position_y": 0,
  "config": {
    "color": "#10b981"
  }
}
```

---

#### DELETE /api/widgets/[id]
Delete widget.

---

### Metrics

#### GET /api/metrics/[id]/data
Get metric data for chart rendering.

**Query Params**:
- `start_date`: YYYY-MM-DD
- `end_date`: YYYY-MM-DD  
- `granularity`: hour, day, week, month

**Response 200**:
```json
{
  "data": [
    {
      "timestamp": "2024-01-15T00:00:00Z",
      "value": 1250.50
    },
    {
      "timestamp": "2024-01-16T00:00:00Z",
      "value": 1380.25
    }
  ],
  "comparison": [
    {
      "timestamp": "2024-01-08T00:00:00Z",
      "value": 1100.00
    }
  ]
}
```

---

#### POST /api/metrics/[id]/data
Add data point (manual entry or API).

**Request**:
```json
{
  "value": 1250.50,
  "timestamp": "2024-01-15T10:00:00Z"
}
```

---

### Alerts

#### POST /api/alerts
Create alert rule.

**Request**:
```json
{
  "metric_id": "uuid",
  "name": "Low Revenue Alert",
  "condition": "lt",
  "threshold": 5000,
  "notification_email": "ceo@company.com"
}
```

**Conditions**:
- `gt`: Greater than
- `lt`: Less than
- `eq`: Equal to
- `pct_change`: Percent change (vs yesterday)

---

#### GET /api/alerts/check
Background job endpoint (cron).

**Logic**:
1. Fetch all active alerts
2. For each alert, get latest metric value
3. Evaluate condition
4. If triggered → send email + update `last_triggered`

---

### Export

#### POST /api/export/pdf
Generate PDF report.

**Request**:
```json
{
  "dashboard_id": "uuid",
  "widget_ids": ["uuid1", "uuid2"],
  "company_name": "Acme Inc",
  "logo_url": "https://...",
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

**Response 200**:
```json
{
  "pdf_url": "https://storage.../report-abc123.pdf",
  "expires_at": "2024-01-16T10:00:00Z"
}
```

**Implementation**:
- Use Puppeteer or jsPDF
- Render widgets server-side
- Upload to Supabase Storage
- Return signed URL (1 week expiry)

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Dashboard/Metric not found |
| 409 | Duplicate dashboard name |

---

**Last Updated**: 2026-01-13
