# ADR-034: Platform Integration

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — Platform Integration

## Context

NEXUS spans nine logical surfaces (Website, Cloud, Studio, Marketplace, SDK, OS, AI, Design System, Platform Packages). Each repo shipped independently through EPIC 7. Production requires a single authenticated ecosystem with shared sync, telemetry, notifications, backups, and update delivery.

## Decision

Establish **`@nexus/integration`** in `nexus-platform` as the cross-repo contract and HTTP client, with **`@nexus-cloud/integration`** as the authoritative backend service.

### Ecosystem Registry

`ECOSYSTEM_REPOS` maps logical products to owning repositories and npm scopes. SDK and Design System are virtual entries (`nexus-website/src/sdk`, `@nexus/theme` + `@nexus/ui`) until dedicated repos exist.

### Integration Features

| Feature | Client | Backend | Consumers |
|---------|--------|---------|-----------|
| Unified Login | `@nexus/auth` + session mapping | `/v1/auth/session` | Website, Studio |
| Organization Switching | `switchOrganization()` | `/v1/organizations` | Studio, Website |
| Project Sync | `syncProject()` | `/v1/integration/sync/*` | Studio |
| Behavior Sync | `syncBehavior()` | `/v1/integration/sync/*` | Studio |
| Marketplace Install | `installMarketplacePackage()` | `/v1/integration/marketplace/install` | Studio, Website |
| SDK Downloads | `listSdkDownloads()` | `/v1/integration/sdk/downloads` | Website, Studio |
| Cloud Backups | `createBackup()` / `listBackups()` | `/v1/integration/backups` | Studio |
| Telemetry | `ingestTelemetry()` | `/v1/integration/telemetry` | OS, Studio, Website |
| Notifications | `listNotifications()` | `/v1/integration/notifications` | Studio, Website |
| Update Center | `listUpdates()` | `/v1/integration/updates` | Website, Studio, OS |

### Unified Login

No new identity provider. Website and Studio authenticate via `@nexus/auth` (Supabase). Cloud validates bearer tokens on integration routes. The integration client maps `/v1/auth/session` into `UnifiedSession`.

### Offline Mode

`createStubIntegrationClient()` provides in-memory sync and local notifications when cloud is unreachable (Studio alpha default without token).

## Consequences

- All ecosystem-facing HTTP contracts live in one platform package
- Cloud owns durable sync state; Studio/OS remain edge writers
- Robot runtime sync (`@nexus-os/sync`) stays separate from project/behavior sync
