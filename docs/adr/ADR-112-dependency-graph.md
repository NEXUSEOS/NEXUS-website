# ADR-112: Dependency Graph

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 29 — Connection Orchestrator

## Decision

The Connection Orchestrator `dependencyEngine` builds a directed graph from each service's `dependencies` and `dependentSystems` fields in the registry.

When a root service becomes unavailable (`offline`, `disconnected`, `authentication_failed`, `validation_failed`, `configuration_required`), `analyzeDependencyImpact()` returns all downstream dependents marked **blocked**.

Example chain documented in registry:

```
Supabase → Cloud API → Website / Studio / Developer Portal / Command Center
Supabase → Marketplace (via Cloud API + PostgreSQL + Object Storage)
```

API: `GET /v1/connections/dependencies`, `GET /v1/connections/dependencies/:serviceId/impact`.

## Consequences

- Impact analysis displayed in Command Center setup wizard view
- Feature readiness engine consumes the same graph via service status map

*Related: ADR-111, ADR-114*
