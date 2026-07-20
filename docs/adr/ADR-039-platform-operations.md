# ADR-039: Platform Operations

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — NEXUS Beta Platform

## Context

Operating the integrated NEXUS ecosystem requires clear ownership of feedback loops, incident data, and sponsor relationships during the beta period.

## Decision

Define **platform operations** responsibilities and data flows.

### Operational Surfaces

| Surface | Data store | Operator action |
|---------|-----------|-----------------|
| Feedback Center | `beta_feedback` | Triage, mark reviewed/resolved |
| Bug Reporting | `beta_bug_reports` | Assign severity, track lifecycle |
| Crash Analytics | `beta_crash_events` | Monitor fingerprints, correlate with releases |
| Sponsor Dashboard | `sponsor_records` | Activate tiers, manage benefits |
| Notifications | `platform_notifications` | Broadcast to orgs (from EPIC 8 integration) |

### Telemetry Boundaries

- **Portal events** (`@nexus/analytics` / Supabase): page visits, download clicks — user-level
- **Integration telemetry** (`platform_telemetry_events`): robot/runtime topics — org-level
- **Crash events** (`beta_crash_events`): grouped exceptions — product-level

Do not merge these stores; cross-reference by `organizationId` and release version when investigating incidents.

### Runbook (Alpha)

1. Run `npm run db:migrate` in nexus-cloud before beta deploy
2. Monitor `/v1/beta/crashes` for Studio regressions
3. Review `beta_applications` queue for access grants
4. Publish releases via `platform_updates` rows per ADR-038

## Consequences

- Operations team uses Cloud DB as source of truth for beta program health
- Website portals are read/write clients — no local durable beta state
- Future: admin UI in Cloud; alpha uses API + SQL
