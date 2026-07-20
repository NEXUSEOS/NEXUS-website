# ADR-002: Role System

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 1

## Context

The NEXUS ecosystem serves multiple user types — visitors, developers, sponsors, and administrators — each requiring distinct access patterns across Website, Studio, Marketplace, and Cloud.

## Decision

Implement a **database-backed role system** with four fixed roles stored in the `roles` table.

### Roles

| Role | Identifier | Purpose |
|---|---|---|
| Visitor | `visitor` | Default role assigned on signup |
| Developer | `developer` | SDK, documentation, developer portal access |
| Sponsor | `sponsor` | Sponsor program features |
| Administrator | `administrator` | Platform administration |

### Assignment

- New users receive `visitor` role automatically via `handle_new_user()` trigger
- Role stored on `profiles.role_id` foreign key to `roles.id`
- Role elevation deferred to future admin tooling — no self-service role change

### Access Control

| Layer | Mechanism |
|---|---|
| Database | Row Level Security (RLS) on all tables |
| Application | Role exposed via `profile.role.name` in AuthProvider |
| Routes | Protected routes check authentication; role-based gates deferred |

### Schema

```sql
profiles.role_id → roles.id
roles.name CHECK (name IN ('visitor', 'developer', 'sponsor', 'administrator'))
```

## Consequences

**Positive:**
- Extensible role model for future platform apps
- Single source of truth in Supabase
- Default-safe assignment (visitor)

**Negative:**
- Role changes require backend/admin process (not yet built)
- Application-level role gates not yet enforced on all routes

## Future Extraction

Move to `@nexus/auth` + `@nexus/config`:
- Role enum constants
- Role-based route guards
- Admin role management API
