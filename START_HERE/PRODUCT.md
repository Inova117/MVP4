# 📋 PRODUCT SPECIFICATION - MVP #4: Dashboard de Analytics / Business Intelligence

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 🎯 Business Context

### Objetivo del MVP
Crear un **dashboard de analytics/BI** que permita a empresas visualizar KPIs en tiempo real, crear reportes personalizados, y recibir alertas cuando métricas cruzan umbrales críticos.

### Problema de Negocio
- **70% de empresas** usan Excel para reportes (manual, propenso a errores)
- **Tools empresariales** (Tableau, Power BI) cuestan $70-500/usuario/mes
- **Falta de tiempo real**: Reportes se actualizan manualmente cada semana
- **No alertas proactivas**: Descubren problemas tarde

### Oportunidad
- Mercado BI: $27B globally (2024)
- TAM LATAM: ~500K empresas (50-500 empleados)
- Competencia: cara o muy compleja
- Nuestro edge: Simple + Real-time + Precio accesible ($49-99/mes)

### Success Goal
- **50 empresas** usando activamente en 30 días
- **Promedio 20 dashboards** creados por empresa
- **>80% NPS** (producto must-have para reporting)

**Referencia Técnica**: Ver `ENGINEERING.md` para arquitectura

---

## 👥 Target Users

### Persona 1: Andrea Ruiz (CEO/Founder)
- **Rol**: CEO de empresa SaaS (20 empleados)
- **Edad**: 35-45
- **Tech savviness**: Media-Alta
- **Pain principal**: No tiene visibilidad de KPIs en un solo lugar
- **Current alternatives**: Excel + Google Analytics + Stripe Dashboard
- **Willingness to pay**: $99/mes

### Persona 2: Marco Silva (Data Analyst)
- **Rol**: Analista de datos
- **Edad**: 25-35
- **Tech savviness**: Alta
- **Uso**: Crea reportes semanales para management
- **Pain principal**: Proceso manual toma 4-5 horas/semana
- **Expectativa**: Reportes automáticos, exportables

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE** (Sprint 1-2)

#### Feature #1: Dashboard Personalizable
**Value**: Core feature, visualización flexible  
**Effort**: 4 días  
**Implementation**: Ver `ENGINEERING.md` → § 6.2

**User Story**:
Como CEO, quiero:
- Ver mis KPIs principales en un dashboard
- Drag-and-drop widgets para personalizar layout
- Agregar/remover widgets según necesidad

**Widgets disponibles**:
- KPI card (número + tendencia)
- Line chart (tiempo)
- Bar chart (categorías)
- Pie chart (proporciones)
- Table (datos tabulares)

---

#### Feature #2: Gráficos Interactivos
**Value**: Visualización de datos avanzada  
**Effort**: 3 días

**User Story**:
Como analista, quiero:
- Gráficos responsive e interactivos
- Tooltip al hover
- Zoom/pan en charts de tiempo
- Color coding configurable

**Chart types**:
- Line, Area, Bar, Pie, Donut
- Multi-series support
- Biblioteca: Recharts

---

#### Feature #3: Filtros de Fecha
**Value**: Análisis temporal  
**Effort**: 2 días

**User Story**:
Como usuario, quiero:
- Filtrar por: Hoy, Ayer, Últimos 7 días, Últimos 30 días, Mes actual, Custom range
- Ver comparativa vs período anterior (ej: semana actual vs semana pasada)
- Date picker para rangos custom

---

#### Feature #4: Exportación PDF
**Value**: Compartir reportes  
**Effort**: 2 días

**User Story**:
Como CEO, quiero:
- Exportar dashboard a PDF
- Incluir logo de empresa
- Seleccionar qué widgets incluir
- Programar envíos automáticos (post-MVP)

---

#### Feature #5: Alertas
**Value**: Notificaciones proactivas  
**Effort**: 3 días

**User Story**:
Como CEO, quiero:
- Crear alerta cuando: Revenue < $5,000/día
- Recibir email cuando se dispara
- Ver historial de alertas

**Condiciones**:
- Greater than (>)
- Less than (<)
- Equal to (=)
- Percent change (ej: -10%)

---

### 🟡 **SHOULD-HAVE** (Post-MVP)

- Multi-dashboard support
- Scheduled reports (email diario/semanal)
- Team collaboration (comments)
- API integration (Stripe, Google Analytics, custom)

### 🔴 **WON'T-HAVE** (V1)

- AI-powered insights
- Predictive analytics
- Real-time streaming (usar polling cada 30s)
- Mobile app nativa

---

## ✅ Acceptance Criteria

### Feature #1: Dashboard Personalizable

**AC-1.1**: Widget Management
- [ ] Button "Add Widget" abre modal
- [ ] Modal muestra: KPI Card, Line Chart, Bar Chart, Pie Chart, Table
- [ ] Select widget → configure (title, data source, metric)
- [ ] Widget aparece en dashboard

**AC-1.2**: Drag and Drop
- [ ] Cada widget tiene drag handle
- [ ] Puede arrastrar widget a nueva posición
- [ ] Grid auto-ajusta al soltar
- [ ] Layout se guarda en DB (persistente)

**AC-1.3**: Widget Settings
- [ ] Click settings icon → modal
- [ ] Puede cambiar: title, metric, colors
- [ ] Puede eliminar widget (confirmation)

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #2: Gráficos Interactivos

**AC-2.1**: Chart Rendering
- [ ] Line chart muestra datos correctos
- [ ] Bar chart con múltiples series (stacked o grouped)
- [ ] Pie chart con legend
- [ ] Charts responsive (ajustan a tamaño container)

**AC-2.2**: Interactividad
- [ ] Tooltip al hover muestra valor exacto
- [ ] Click legend item toggle series visibility
- [ ] Zoom en charts de tiempo (wheel)

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #3: Filtros de Fecha

**AC-3.1**: Date Range Selector
- [ ] Dropdown con opciones: Today, Last 7 days, Last 30 days, This month, Custom
- [ ] Custom abre date range picker
- [ ] Al cambiar fecha, todos los widgets re-fetch data

**AC-3.2**: Comparativa
- [ ] Toggle "Compare to previous period"
- [ ] Charts muestran 2 series: current vs previous
- [ ] KPI cards muestran: valor actual + % change vs anterior

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #4: Exportación PDF

**AC-4.1**: Export Options
- [ ] Button "Export PDF" en dashboard
- [ ] Modal: select widgets, add logo, company name
- [ ] Button "Generate PDF"

**AC-4.2**: PDF Output
- [ ] PDF incluye: company name, date range, selected widgets
- [ ] Charts rendered as images
- [ ] Tables formatted
- [ ] Download automático

**Implementation**: `ENGINEERING.md` → § 6.5

---

### Feature #5: Alertas

**AC-5.1**: Create Alert
- [ ] Page /alerts con lista de alertas activas
- [ ] Button "Create Alert" → modal
- [ ] Form: Metric (dropdown), Condition (>, <, =), Value (input), Email notification (checkbox)
- [ ] Save → alerta creada

**AC-5.2**: Alert Triggering
- [ ] Background job (cada 5 min) evalúa alertas
- [ ] Si condición se cumple → send email
- [ ] Email incluye: metric name, current value, threshold, link to dashboard

**AC-5.3**: Alert History
- [ ] Lista muestra: fecha, metric, triggered value, status (sent/pending)

**Implementation**: `ENGINEERING.md` → § 6.6

---

## 📊 Success Metrics & KPIs

### North Star Metric
**Dashboards activos por día**  
Target: 1,000+ dashboards viewed/día (20 dashboards x 50 empresas)

### Primary Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Signup Conversion** | >25% | Visits → Signups |
| **Time to First Dashboard** | <15 min | Signup → Dashboard creado |
| **DAU/MAU** | >60% | Users activos diarios vs mensuales |
| **Widgets per Dashboard** | >6 | Promedio widgets por dashboard |
| **Export Rate** | >40% | Users que exportan reportes |

---

## 📅 Timeline

### Sprint 1 (Semana 1)
- Día 1-2: Setup + Authentication
- Día 3-5: Dashboard grid + Widget CRUD
- Día 6-7: Gráficos básicos (Line, Bar)

### Sprint 2 (Semana 2)
- Día 8-9: Date filters + Pie charts
- Día 10-11: Exportación PDF
- Día 12-13: Alertas
- Día 14: QA + Deploy

---

## 👥 User Testing Plan

### Phase 1: Alpha (3 días)
- 5 testers internos
- Crear 2 dashboards c/u
- Setup 1 alerta
- Export 1 PDF

### Phase 2: Beta (7 días)
- 10 empresas reales
- Min 5 dashboards por empresa
- Feedback: Time savings, missing features

---

## ⚠️ Risks

| Risk | Mitigation |
|------|------------|
| **Performance con muchos widgets** | Lazy load widgets, virtualization |
| **Chart rendering lento** | Memoization, canvas rendering |
| **PDF generation timeout** | Async generation, queue system |

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**MVP**: #4 - Dashboard de Analytics / Business Intelligence
