# ADR-008: Developer Platform Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

Sprint 3 Task 2 established the Developer Portal with six base sections (Dashboard, SDK Downloads, Documentation, API Keys, Projects, Announcements) via `@nexus/config` and ADR-004. Sprint 5 extends the portal into a full **Developer Platform** with eleven dashboard sections, eight additional portal routes, and analytics integration — while keeping the base portal contract stable in `nexus-platform`.

The extended platform features (applications, organizations, robot registry, behaviors, simulation, marketplace uploads, release history, developer analytics) are **website-owned incubation** until they stabilize for extraction.

## Decision

Extend the Developer Portal in `nexus-website` with a layered architecture: platform base routes from `@nexus/config`, website-extended routes from `websiteRoutes.ts`, merged navigation in `portals.ts`.

### Ownership Model

| Layer | Owner | Source |
|-------|-------|--------|
| Base portal routes (6 sections) | `@nexus/config` | `nexus-platform/packages/config` |
| Extended platform routes (8 sections) | `nexus-website` | `src/config/websiteRoutes.ts` |
| Dashboard section cards (11 total) | `nexus-website` | `src/config/developerPlatform.ts` |
| Portal page components | `nexus-website` | `src/pages/DeveloperPortal/` |
| Analytics service | `@nexus/analytics` | `nexus-platform/packages/analytics` |
| Feature flag | `nexus-website` | `developerPlatformExtended: true` |

### Route Hierarchy

```
ProtectedRoute
  └── RoleGuard (developer, administrator)
        └── DeveloperPortalLayout
              └── PortalLayout (sidebar + analytics)
                    └── Portal Page (Outlet)
```

**Base route:** `/developers/portal`

| Route | Component | Status |
|-------|-----------|--------|
| `/developers/portal` | `DeveloperDashboard` | beta |
| `/developers/portal/sdk` | `DeveloperSdk` | beta |
| `/developers/portal/docs` | `DeveloperDocs` | beta |
| `/developers/portal/api-keys` | `DeveloperApiKeys` | beta |
| `/developers/portal/projects` | `DeveloperProjects` | beta |
| `/developers/portal/announcements` | `DeveloperAnnouncements` | beta |
| `/developers/portal/applications` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/organizations` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/robot-registry` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/behaviors` | `BehaviorList` | beta |
| `/developers/portal/behaviors/new` | `BehaviorEditor` | beta |
| `/developers/portal/behaviors/:behaviorId` | `BehaviorDetail` | beta |
| `/developers/portal/simulation` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/marketplace-uploads` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/release-history` | `DeveloperPlatformFeature` | architecture |
| `/developers/portal/analytics` | `DeveloperPlatformFeature` | beta |

### Dashboard Sections

Eleven section cards rendered by `DeveloperDashboard` from `developerPlatformSections`:

| ID | Title | Status |
|----|-------|--------|
| `projects` | Projects | beta |
| `sdk-downloads` | SDK Downloads | beta |
| `applications` | Applications | architecture |
| `organizations` | Organizations | architecture |
| `robot-registry` | Robot Registry | architecture |
| `behaviors` | Behavior Library | beta |
| `simulation` | Simulation Jobs | architecture |
| `marketplace` | Marketplace Uploads | architecture |
| `releases` | Release History | architecture |
| `analytics` | Developer Analytics | beta |
| `api-keys` | API Keys | beta |

**Status tiers:**

- `beta` — Functional UI with real or placeholder data
- `architecture` — Capability preview via `PlatformFeaturePage` (planned features listed, no backend)
- `live` — Reserved for production-ready sections

### Navigation Merge Pattern

```typescript
export const developerPortalNav = [...platformDeveloperPortalNav, ...developerPlatformNav]
```

Platform nav (6 items) precedes website-extended nav (8 items). No duplicate paths.

### Analytics Integration

| Concern | Implementation |
|---------|----------------|
| Portal visit tracking | `PortalLayout` calls `trackPortalVisit(userId, portalId)` on mount |
| Download events | `DeveloperSdk` calls `trackPortalEvent(userId, 'developer', 'download', {...})` |
| Dashboard metrics | `DeveloperDashboard` calls `getDashboardMetrics(user.id)` |
| Persistence | Supabase `portal_events` table (`002_portal_analytics.sql`) |
| Service package | `@nexus/analytics` — `getDashboardMetrics`, `trackPortalVisit`, `trackPortalEvent`, `getPortalUsage` |

**Metrics displayed:** Total Downloads · Portal Visits · Last Download · Recent Events count.

### Configuration Files

| File | Purpose |
|------|---------|
| `src/config/developerPlatform.ts` | Extended nav + dashboard sections |
| `src/config/websiteRoutes.ts` | Website-owned route definitions |
| `src/config/portals.ts` | Merged portal nav + download catalog |
| `src/config/routes.ts` | Merges `@nexus/config` routes + `websiteRoutes` |
| `src/config/features.ts` | `developerPlatformExtended` feature flag |

## Consequences

### Positive

- Developer Platform grows without breaking the stable `@nexus/config` portal contract
- Clear ownership boundary: platform base vs website extension
- Analytics already integrated via extracted `@nexus/analytics` package
- Architecture-preview pages communicate roadmap without premature backend work
- Behavior Workspace integrated as a first-class portal section

### Negative

- Route merge adds complexity to `AppRouter` and config layering
- Architecture sections may appear functional before backends exist
- Extended sections remain in `nexus-website` until extraction criteria met (ADR-007)

## Quality Gate

- [x] Extended portal routes registered in `AppRouter`
- [x] Dashboard renders 11 section cards from config
- [x] `developerPortalNav` merges platform + website nav without duplicates
- [x] `PortalLayout` tracks visits via `@nexus/analytics`
- [x] `DeveloperDashboard` displays metrics from `getDashboardMetrics()`
- [x] Architecture sections use `PlatformFeaturePage` with capability lists
- [x] `npm run build` and `npm run lint` pass

---

*Related: ADR-004 (portal architecture), ADR-007 (shared packages), ADR-009 (behavior workspace)*
