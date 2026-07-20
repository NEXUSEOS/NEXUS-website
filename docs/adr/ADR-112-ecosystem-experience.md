# ADR-112: Ecosystem Experience

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 30 — Unified Nexus Experience

## Decision

Unify ecosystem experience through:

1. **`@nexus/navigation`** — UniversalNavigation, Breadcrumbs, ecosystem nav sections consumed by Website (NexusNavigation wrapper)
2. **Shared account system** — Supabase auth via `@nexus/auth` (no duplicate auth)
3. **Shared configuration** — Connection Orchestrator for all external connections
4. **Repository ownership enforced** — design-system (tokens), platform (UI/theme/navigation), cloud (orchestrator), studio (Command Center), website (integration only)

One product feel: same glass navigation, same tokens, same motion, same login across Website, Studio, portals, and Command Center.

## Consequences

- Website `Navigation` replaced with `NexusNavigation` wrapping `UniversalNavigation`
- Breadcrumbs exported from `@nexus/navigation`
- Remaining Studio domain connection services should delegate to orchestrator client (future migration)

*Related: ADR-109, ADR-110, ADR-111*
