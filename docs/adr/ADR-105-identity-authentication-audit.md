# ADR-105: Identity, Accounts & Authentication Audit

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 28 — Identity, Accounts & Authentication Audit

## Decision

Complete identity audit across the NEXUS ecosystem with:

- Migration `0017_identity_audit.sql` — seven default organizations, `identity_role_catalog`, `identity_provisioning_log`
- Package `@nexus-cloud/identity` — inventory and RBAC matrix services
- API routes `GET /v1/identity/{inventory,rbac,organizations,roles}` (platform admin)
- Role bridge — `mapOrgRoleToPlatformRole` and `requirePlatformAdmin` accept org `owner`/`admin`
- Provisioning — `scripts/provision-identity.mjs` + gitignored `config/identity-manifest.json`
- Supabase roles extension — `002_extended_roles.sql`
- Audit artifacts — `docs/identity/IDENTITY_AUDIT_REPORT.md`, `inventory.json`

No users or passwords are seeded in the repository. Operator-provided emails provision via Supabase Admin API; credentials written only to gitignored `data/identity/credentials.json`.

## Consequences

- Three role namespaces (Supabase profile, cloud org member, platform catalog) documented; unified enforcement via JWT + org lookup at API gateway.
- Human user inventory requires live Supabase project; cloud DB stores org membership UUIDs only.
- Production operators must supply manifest emails and run provisioning before first-login verification.

*Related: ADR-040, ADR-103, ADR-104*
