# ADR-114: Platform Readiness Engine

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 29 — Connection Orchestrator

## Decision

The `readinessEngine` maps features to required services via `FEATURE_REQUIREMENTS`. Each feature evaluates to `ready`, `not_ready`, or `degraded` based on connection statuses from the orchestrator.

`buildPlatformSetupChecklist()` expands the global platform setup checklist with:

- Overall completion %
- Completed / missing / blocked / optional systems
- Estimated completion time
- Critical issues, warnings, recommendations

Integrates with launch readiness: operators should achieve 100% required-service completion before EPIC 27 validation sign-off.

API: `GET /v1/connections/readiness`, `GET /v1/connections/readiness/:featureId`, `GET /v1/connections/checklist`.

## Consequences

- Developer Portal, Command Center, Marketplace, and other features show explicit missing dependencies
- Command Center Connection Orchestrator panel surfaces checklist at top of dashboard

*Related: ADR-104, ADR-111, ADR-112*
