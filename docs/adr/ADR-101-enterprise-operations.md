# ADR-101: Enterprise Operations Completion

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 24 — Enterprise Infrastructure

## Decision

Complete enterprise operations with migration `0013_enterprise_operations`, package `@nexus-cloud/enterprise-ops`, distributed tracing helpers in `@nexus-cloud/observability`, and Command Center API routes under `/v1/command-center/enterprise/*`.

Capabilities delivered:

- **Monitoring** — 24h trace/log counts, open alerts/incidents, Prometheus metric snapshot
- **Distributed Tracing** — per-request span persistence via API `onResponse` hook; trace lookup by ID
- **Centralized Logs** — structured log entries with level, request/trace correlation
- **Dashboards** — performance (p95 latency), cloud health, storage, database table counts, API status/method breakdown, fleet/robot status, cost estimates, health, compliance
- **Alert Manager** — create, list, acknowledge alerts
- **Incident Manager** — create, list, resolve incidents linked to alerts
- **Secret Management & Key Rotation** — register secrets with rotation policy; manual rotate
- **Session Monitoring** — session event audit trail
- **Compliance Dashboard** — SOC2-style checks with generated reports

Studio Command Center exposes all dashboards in `EnterpriseOpsPanel` with tabbed navigation.

## Consequences

Platform admins have unified enterprise observability and operations tooling. Every API request (except health/metrics) emits trace spans and log entries for centralized analysis.

*Related: ADR-098, ADR-099, ADR-100*
