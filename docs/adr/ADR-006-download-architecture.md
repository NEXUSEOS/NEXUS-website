# ADR-006: Download Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 2

## Context

NEXUS products (Studio, SDK, documentation, firmware) require authenticated, role-gated downloads with tracking for analytics and compliance.

## Decision

Implement a **centralized download catalog** in `config/portals.ts` with permission-gated delivery via `DownloadCenter`.

### Download Catalog

| Product | Permission | Status |
|---|---|---|
| NEXUS Studio | `download.studio` | Placeholder |
| NEXUS SDK | `download.sdk` | Placeholder |
| Documentation PDF | `download.docs` | Placeholder |
| Release Notes | `download.release-notes` | Placeholder |
| Robot Firmware | `download.firmware` | Future |

### Download Flow

```
User → DownloadCenter → PermissionGuard → initiateDownload()
  → recordDownload() in Supabase downloads table
  → trackPortalEvent() in portal_events table
  → Placeholder response (binary delivery deferred)
```

### Tracking

- **downloads table** — product, version, timestamp per user
- **portal_events table** — visit and download events with metadata

## Consequences

**Positive:**
- Single catalog source of truth for all NEXUS downloads
- Permission enforcement before download initiation
- Analytics integration for dashboard metrics

**Negative:**
- Binary file delivery not yet implemented (placeholder only)
- Firmware downloads reserved for future release

## Future Extraction

Move to `@nexus/downloads` in `nexus-platform`:
- `downloadCatalog` config
- `downloadService` with Supabase Storage integration
- `DownloadCard`, `DownloadCenter` components
