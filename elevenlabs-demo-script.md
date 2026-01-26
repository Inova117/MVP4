# ElevenLabs Demo Script - Analytics Dashboard Backend

## Script Duration: ~90 seconds

---

## Narration Script

Hello! Let me walk you through the backend architecture of our Analytics Dashboard, a powerful Business Intelligence platform built for modern enterprises.

At the heart of our system is a **modular data connector architecture**. We've implemented a factory pattern that allows seamless integration with multiple data sources. Currently, we support Google Analytics 4 and Meta Business Ads, with Google Ads, CSV uploads, and API webhooks coming soon.

The connector system uses TypeScript interfaces to ensure type safety across all data operations. Each connector implements a standard interface with methods for authentication, data fetching, and metric transformation. This means adding new data sources is as simple as implementing the connector interface.

Our **AI-powered insights engine** is the real game-changer. It analyzes metrics from all connected sources, identifies trends, detects anomalies, and provides actionable recommendations. The analyzer uses a sophisticated scoring system to prioritize insights based on impact and confidence levels.

For data management, we've built a **flexible data client layer** that switches between demo mode and production mode. In demo mode, it serves realistic mock data for testing and demonstrations. In production, it connects to Supabase for real-time data storage and retrieval.

The backend also includes a **comprehensive alerting system** that monitors KPIs in real-time. When metrics cross predefined thresholds, the system automatically generates alerts and can trigger notifications through multiple channels.

Everything is built with Next.js 14, TypeScript, and follows enterprise-grade patterns including dependency injection, error handling, and comprehensive logging. The architecture is designed to scale from startups to enterprise deployments.

This is just the beginning. Our roadmap includes machine learning-powered forecasting, custom metric builders, and advanced data visualization APIs.

---

## Technical Highlights for Visual Overlay

- **Architecture**: Factory Pattern + Dependency Injection
- **Data Sources**: Google Analytics, Meta Ads, Supabase, CSV, Webhooks
- **AI Engine**: Trend Detection, Anomaly Detection, Recommendations
- **Tech Stack**: Next.js 14, TypeScript, Supabase, Recharts
- **Features**: Real-time KPIs, Custom Alerts, PDF Reports, Multi-user Auth

---

## Timing Breakdown

- **Introduction** (0:00-0:10): 10 seconds
- **Connector Architecture** (0:10-0:30): 20 seconds  
- **AI Insights Engine** (0:30-0:50): 20 seconds
- **Data Management Layer** (0:50-1:05): 15 seconds
- **Alerting System** (1:05-1:15): 10 seconds
- **Tech Stack & Scalability** (1:15-1:25): 10 seconds
- **Future Roadmap** (1:25-1:30): 5 seconds

**Total Duration**: ~90 seconds

---

## ElevenLabs Settings Recommendations

- **Voice**: Professional, clear, enthusiastic (e.g., "Adam" or "Antoni")
- **Stability**: 60-70% (natural variation)
- **Clarity**: 75-85% (clear articulation)
- **Style Exaggeration**: 20-30% (subtle emphasis)
- **Speaking Rate**: Normal to slightly fast (engaging pace)

---

## Notes for Video Production

1. Show code snippets from `lib/connectors/index.ts` during connector explanation
2. Display `lib/ai-insights/analyzer.ts` during AI engine section
3. Highlight `lib/supabase.ts` when discussing data management
4. Show dashboard UI screenshots during features overview
5. Display architecture diagram during tech stack section
