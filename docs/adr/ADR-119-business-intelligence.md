# ADR-119: Business Intelligence

## Status
Accepted — EPIC 31

## Context
NEXUS requires executive dashboards, org analytics, marketplace/developer/sponsor metrics, KPI snapshots, alerts, scheduled reports, and CSV export across the platform.

## Decision
Implement BI in `@nexus-cloud/intelligence` via `createBusinessIntelligenceService`:

- **Executive dashboard**: org count, members, developers, AI inferences, telemetry, marketplace downloads, AI cost
- **Scoped analytics**: developer events, fleet topics, manufacturing topics, marketplace revenue estimates
- **Persistence**: `bi_kpi_snapshots`, `bi_reports`, `bi_alerts`
- **Export**: CSV via `/reports/:id/export.csv`
- **Forecasting**: trend-based metric projection helper

Command Center **Executive Dashboard** and **Analytics Workspace** panels consume `/v1/intelligence/executive-dashboard` and org-scoped analytics routes.

## Consequences
- BI shares the intelligence API namespace — no separate analytics microservice
- Platform admins access global dashboards; org members access scoped metrics
- PDF/Excel export deferred to future work (JSON/CSV operational)
