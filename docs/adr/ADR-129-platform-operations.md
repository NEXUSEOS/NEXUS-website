# ADR-129: Platform Operations

## Status
Accepted — PROGRAM ALPHA Phase 1

## Context
NEXUS requires a unified Platform Operations layer that registers every ecosystem module, runs startup validation, and exposes live infrastructure status to Command Center without duplicate orchestration systems.

## Decision
Introduce `@nexus-cloud/platform-operations` with:

- **Module registry** (`ECOSYSTEM_MODULES`) — 17 modules with env vars, dependencies, capabilities, recovery steps
- **Database tables** (migration 0022): `platform_config`, `platform_module_registrations`, `platform_startup_reports`, `platform_setup_runs`
- **Startup validation** — unified report covering infrastructure, connections, identity, marketplace, CMS, analytics, audit, Studio, SDK
- **API**: `/v1/platform-ops/*` (status, modules, startup-validation, admin dashboard)
- **Boot hook** — API runs validation on startup and persists report

Command Center: Platform Operations panel with live module table and validation trigger.

## Consequences
- Connection Orchestrator remains the health engine; platform-operations syncs module rows from orchestrator dashboard
- No duplicate auth or mock dashboards — all counts from PostgreSQL
