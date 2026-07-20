# ADR-035: Sync Architecture

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — Platform Integration

## Context

Studio projects and behavior graphs must persist locally for offline IDE use while replicating to Cloud for collaboration, backups, and marketplace validation.

## Decision

Use **versioned resource records** stored in `platform_sync_records` with optimistic concurrency.

### Resource Types

| Type | Source | Payload |
|------|--------|---------|
| `project` | nexus-studio | `StudioProject` JSON |
| `behavior` | nexus-studio | `BehaviorGraph` JSON |
| `workspace` | reserved | layout + settings bundle |
| `settings` | reserved | org-scoped preferences |

### Sync Flow

```
Studio (edge)                    Cloud (hub)
     |  pushSync(record)  ──────────────►  upsert by (org, type, externalId)
     |  pullSync(filter)  ◄──────────────  list matching records
     |  syncAll(orgId)    ◄──────────────►  push local queue + pull remote delta
```

### Conflict Policy (Alpha)

- **Last-write-wins** on matching `(organizationId, resourceType, externalId)` when incoming `version >= stored version`
- Rejected pushes return HTTP 409 with stored version (future: merge UI in Studio)
- Checksum field reserved for content-addressed deduplication

### Edge Triggers

- Studio `WorkspaceProvider` pushes projects when `syncEnabled` and organization is set
- `BehaviorGraphProvider` pushes graph on every local save
- nexus-os robot state sync remains on `@nexus-os/sync` MQTT/WebSocket channel

### Identity Scope

All sync records are scoped to `organizationId`. Organization switching updates the active org in client state and localStorage (`nexus-organization-id`).

## Consequences

- Cloud PostgreSQL is source of truth for shared project/behavior data
- Studio localStorage/Electron userData remains primary for latency
- Full CRDT/merge deferred to post-alpha
