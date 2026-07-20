# ADR-038: Release Management

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — NEXUS Beta Platform

## Context

Multiple products (Studio, SDK, OS, Website) ship on different cadences. ADR-036 introduced update manifests but used inconsistent channel names (`dev` vs `canary`).

## Decision

Standardize on four **release channels** across the ecosystem:

| Channel | Audience | Update frequency |
|---------|----------|------------------|
| `stable` | Production users | Milestone releases |
| `beta` | External beta developers | Bi-weekly |
| `alpha` | Early partners | Weekly |
| `nightly` | Internal / CI | Daily |

### Canonical Source

- Database: `platform_updates` (product, version, channel, release_notes, download_url)
- Shared enum: `@nexus/config` `RELEASE_CHANNELS` and `@nexus/integration` `ReleaseChannel`
- API: `GET /v1/beta/releases/channels` and `GET /v1/integration/updates`

### Client Behavior

- Website `/releases/channels` renders channel matrix from Cloud
- Download Center and Studio Update Center consume the same manifest API
- Clients default to `stable`; beta participants may opt into `beta` via settings

## Consequences

- `UpdateManifest.channel` type is `'stable' | 'beta' | 'alpha' | 'nightly'`
- Migration `0004_beta_platform.sql` seeds multi-channel Studio and SDK entries
- Deprecated `dev`/`canary` aliases removed from contracts
