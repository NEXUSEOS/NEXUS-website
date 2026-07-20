# ADR-087: RBAC Expansion for Command Center

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 19 — Platform Integration + Command Center Foundation

## Context

ADR-002 and ADR-005 defined organization roles for Cloud. Command Center introduces CMS editing, publishing, and platform administration that require finer-grained roles without replacing `@nexus/auth`.

## Decision

Expand `@nexus/config` role and permission model:

### Roles

| Role | Scope |
|------|-------|
| `super_administrator` | Full platform + Command Center |
| `administrator` | Organization admin + CMS publish |
| `developer` | Developer portal + API keys |
| `sponsor` | Sponsor portal content |
| `editor` | CMS create/edit (draft) |
| `moderator` | Community moderation |
| `viewer` | Read-only access |

Database enum `organization_member_role` adds `editor` and `moderator`.

### Permissions

| Permission | Roles |
|------------|-------|
| `COMMAND_CENTER_ACCESS` | super_administrator, administrator |
| `CMS_VIEW` | editor, administrator, super_administrator |
| `CMS_EDIT` | editor, administrator, super_administrator |
| `CMS_PUBLISH` | administrator, super_administrator |

Cloud middleware (`@nexus-cloud/auth/rbac.ts`):

- `requireCmsEditor()` — CMS management routes
- `requirePlatformAdmin()` — Command Center org/member routes

## Consequences

- JWT role claim must reflect organization membership role from Supabase
- Studio Command Center actions gated by live token role on Cloud API
- Existing roles (`owner`, `admin`, `member`) remain; new roles extend rather than replace

*Related: ADR-002, ADR-005, ADR-085*
