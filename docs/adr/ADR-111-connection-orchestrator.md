# ADR-111: Connection Orchestrator

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 29 — Connection Orchestrator

## Decision

Introduce `@nexus-cloud/connection-orchestrator` as the single intelligence layer for all external and internal connections across NEXUS. Every integration registers in `CONNECTION_REGISTRY`; runtime state persists in `connection_instances` and `connection_validation_logs` (migration `0018`).

API surface: `/v1/connections/*` (registry, dashboard, dependencies, secrets vault, readiness, checklist, wizards, validate/reconnect/disconnect).

Command Center: `ConnectionOrchestratorPanel` in nexus-studio.

No service may implement independent credential discovery or setup flows — delegate to the orchestrator.

## Consequences

- 21 services registered at launch (Supabase through Sentry)
- Studio `platformConnectionService` delegates cloud health to orchestrator dashboard
- Secrets stored only as env var key references; values never persisted in DB

*Related: ADR-112, ADR-113, ADR-114, ADR-105*
