# ADR-111: Global Administrator

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 30 — Unified Nexus Experience

## Decision

Nexus Global Administrator lives in Command Center (`GlobalAdministratorPanel`) as a single dashboard mapping every editable surface to its Command Center panel:

Website, Developer/Sponsor portals, Marketplace, Documentation, Studio, Cloud, Navigation, Theme, Connections, Organizations, Users, Feature Flags, Announcements.

Content editing uses existing CMS infrastructure:
- **Experience Hub** — navigation, footer, hero, announcements
- **Page Builder** — live inline editing with draft/preview/publish
- **Theme Manager** — visual branding without rebuilds
- **Connections Workspace** — all integrations

Single Supabase login; platform admin RBAC via `@nexus-cloud/auth`.

## Consequences

Administrators manage the full ecosystem from Studio Command Center without source code changes for content and configuration.

*Related: ADR-109, ADR-110, ADR-005*
