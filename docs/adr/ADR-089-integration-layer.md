# ADR-089: NEXUS Integration Layer

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 — Full Platform Integration

## Context

EPIC 8 established `@nexus/integration` as the cross-repo HTTP client. EPIC 19 added CMS and Command Center. Consumer apps still used fragmented token paths, hardcoded feature flags, and no real-time event delivery.

## Decision

Create **`createNexusIntegrationLayer()`** in `@nexus/integration` as the unified facade:

| Capability | Method | Backend |
|------------|--------|---------|
| Session refresh + role sync | `refreshSession()`, `syncRole()` | `/v1/auth/refresh`, `/v1/platform/auth/sync-role` |
| Scoped feature flags | `resolveFeatureFlags()` | `/v1/platform/feature-flags` |
| Global search | `search()` | `/v1/platform/search` |
| System health | `getHealth()` | `/v1/platform/health` |
| User profile | `getProfile()`, `updateProfile()` | `/v1/platform/profile` |
| Real-time events | `subscribeToEvents()` | WebSocket `/v1/platform/events/ws` |
| Existing sync/telemetry | `getIntegrationClient()` | `/v1/integration/*` |

SDK mirror: `@nexus/sdk-platform` exposes `createPlatformClient()` with the same HTTP surface for Studio and Website.

Cloud auth middleware enriches JWT users with `organization_members.role` when `X-Organization-Id` header or token org is present.

## Consequences

- Single integration entry point for Website, Studio, SDK
- No duplicate platform clients in consumer repos
- Role synchronization closes ADR-087 gap at runtime

*Related: ADR-034, ADR-087, ADR-090*
