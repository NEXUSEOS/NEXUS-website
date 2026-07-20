# ADR-085: NEXUS Command Center

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 19 — Platform Integration + Command Center Foundation

## Context

NEXUS spans Website, Cloud, Studio, Developer Portal, Sponsor Portal, Marketplace, and Documentation surfaces. Each shipped with static or repo-local content. Production requires a single administration application for ecosystem operations without redeploying consumer apps when content or configuration changes.

## Decision

Establish **NEXUS Command Center** as the master administration layer:

| Layer | Owner | Responsibility |
|-------|-------|----------------|
| Backend services | `nexus-cloud` (`@nexus-cloud/command-center`, `@nexus-cloud/cms`) | Dashboard aggregation, CMS CRUD, publish workflow |
| HTTP API | `nexus-cloud/apps/api` | `/v1/command-center/*`, `/v1/cms/*` |
| Admin UI | `nexus-studio` (`src/command-center/`) | Dashboard, CMS, orgs, feature flags |
| Client SDK | `nexus-sdk` (`@nexus/sdk-cms`) | Typed HTTP client for Studio and Website |

Command Center does not duplicate auth or RBAC. It extends existing `@nexus/auth` sessions and `@nexus/config` permissions.

## Consequences

- Studio gains a **Command Center** sidebar module wired to live Cloud APIs
- Website and portals consume published CMS content via public endpoints
- Future modules (Release Manager, Beta Manager, Analytics) extend `@nexus-cloud/command-center` without new admin shells

*Related: ADR-004, ADR-005, ADR-034*
