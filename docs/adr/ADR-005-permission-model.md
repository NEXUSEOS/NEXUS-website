# ADR-005: Permission Model

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 2

## Context

The NEXUS platform serves four role types with different access to portals, downloads, and features. Permissions must be enforceable at route, layout, and component levels.

## Decision

Implement a **permission-key model** mapped to roles in `config/permissions.ts`.

### Roles

| Role | Identifier |
|---|---|
| Visitor | `visitor` |
| Developer | `developer` |
| Sponsor | `sponsor` |
| Administrator | `administrator` |

### Permission Keys

Examples: `developer.portal.access`, `download.sdk`, `api.keys.view`, `roadmap.sponsor`

### Enforcement Layers

| Layer | Component | Purpose |
|---|---|---|
| Route | `ProtectedRoute` | Requires authentication |
| Portal | `RoleGuard` | Requires role membership |
| Feature | `PermissionGuard` | Requires specific permission |
| Hook | `usePermissions()` | Conditional UI rendering |

### Administrator Override

Administrators bypass all permission checks via `roleHasPermission()` returning `true` for any key.

## Consequences

**Positive:**
- Fine-grained access control without hardcoded role checks in components
- Config-extraction ready for `@nexus/config`
- Navigation adapts dynamically to user permissions

**Negative:**
- Role changes in database do not auto-refresh until profile reload
- Self-service role elevation not supported (by design)

## Future Extraction

Move to `@nexus/auth`:
- `Permission` constants
- `rolePermissions` map
- `usePermissions` hook
- `RoleGuard`, `PermissionGuard` components
