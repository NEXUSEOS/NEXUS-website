# ADR-004: Portal Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 2

## Context

NEXUS requires authenticated portal experiences for developers and sponsors, separate from the public marketing site, while sharing design tokens and layout primitives.

## Decision

Implement **nested portal layouts** with dedicated route hierarchies:

```
/developers/portal/*  → Developer Portal (RoleGuard: developer, administrator)
/sponsors/portal/*    → Sponsor Portal (RoleGuard: sponsor, administrator)
/downloads            → Download Center (ProtectedRoute: authenticated)
```

### Portal Layout Pattern

```
PortalLayout
├── Sidebar navigation (from config/portalNavigation)
├── PageMeta (SEO)
├── Analytics tracking (portal visit)
└── Outlet (nested page content)
```

### Developer Portal Sections

Dashboard · SDK Downloads · Documentation · API Keys · Projects · Announcements

### Sponsor Portal Sections

Partnership Status · Application · Organization · Tiers · Roadmap Access

## Consequences

**Positive:**
- Clear separation of public site vs authenticated portals
- Reusable `PortalLayout` for future Studio/Cloud portals
- Config-driven navigation prepared for `@nexus/config`

**Negative:**
- Nested routing adds complexity to `AppRouter`
- Role elevation still requires admin backend (deferred)

## Future Extraction

Move to `@nexus/portals` in `nexus-platform`:
- `PortalLayout`, `PortalMetricCard`
- Portal navigation config
- Portal page templates
