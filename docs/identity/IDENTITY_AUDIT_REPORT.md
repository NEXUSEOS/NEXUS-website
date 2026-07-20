# NEXUS Identity & Authentication Audit Report

**EPIC 28 — Sprint 1**  
**Generated:** 2026-07-14T03:29:11.725Z  
**Status:** Audit complete — no hardcoded passwords; human users not seeded in repository

---

## 1. Authentication Architecture

Three coordinated layers:

1. **Supabase Auth** (nexus-website, @nexus/auth) — human identity, email/password, password reset, email verification. Profiles in `public.profiles` with `roles` FK.
2. **NEXUS Cloud** (@nexus-cloud/auth) — JWT verification (HS256), org membership RBAC via `organization_members`, API keys, SDK token issuance.
3. **Platform RBAC** (@nexus/config) — portal permissions, RoleGuard on website, Command Center CMS roles.

Role bridge: `mapOrgRoleToPlatformRole` maps org roles (owner/admin/developer/…) to platform roles for API authorization.

---

## 2. Identity Flow

```
User → Website /auth/login → Supabase session (JWT)
     → Website portals (RoleGuard checks profile role)
     → Cloud API (Bearer JWT + optional x-organization-id)
     → org_members lookup → platform role for requirePlatformAdmin / CMS
Studio Command Center → reads sb-*-auth-token from localStorage → Cloud /v1/command-center/*
CLI → nexus login <supabase-access-token> OR nexus auth token <api-key> → SDK JWT
```

---

## 3. RBAC Matrix

| Namespace | Roles | Used By |
|-----------|-------|---------|
| supabase | visitor, developer, sponsor, administrator, viewer, editor, moderator, super_administrator | Website profiles |
| organization | owner, admin, developer, viewer, editor, moderator | Cloud organization_members |
| platform | 17 catalog roles in identity_role_catalog | Documentation + future unified RBAC |

Portal access (from @nexus/config): Developer Portal — developer, administrator, super_administrator; Sponsor Portal — sponsor, administrator, super_administrator; Command Center — editor, moderator, administrator, super_administrator (+ cloud owner/admin via bridge).

---

## 4. Organizations

- **NEXUS Robotics** (`nexus-robotics`): MISSING (run migration 0017 or provision-identity.mjs)
- **Internal Engineering** (`internal-engineering`): MISSING (run migration 0017 or provision-identity.mjs)
- **Developer Sandbox** (`developer-sandbox`): MISSING (run migration 0017 or provision-identity.mjs)
- **Sponsor Sandbox** (`sponsor-sandbox`): MISSING (run migration 0017 or provision-identity.mjs)
- **Manufacturing** (`manufacturing`): MISSING (run migration 0017 or provision-identity.mjs)
- **Operations** (`operations`): MISSING (run migration 0017 or provision-identity.mjs)
- **Platform Administration** (`platform-administration`): MISSING (run migration 0017 or provision-identity.mjs)

---

## 5. Users

No real user accounts exist in repository seed data. All human users must be provisioned via `config/identity-manifest.json` + `scripts/provision-identity.mjs --provision-users`.

Cloud DB member records (UUID only): 0

---

## 6. Accounts Created (this audit)

- Migration `0017_identity_audit.sql`: default orgs, identity_role_catalog, identity_provisioning_log, feature flag `identityAuditComplete`
- Package `@nexus-cloud/identity` + API routes `/v1/identity/*`
- Provisioning script `scripts/provision-identity.mjs` (orgs always; users optional)
- Role bridge fix: `requirePlatformAdmin` accepts owner/admin org roles

---

## 7. Accounts Already Existing

- Supabase schema: roles, profiles, organizations (website project)
- Cloud schema: organizations, organization_members, api_keys, developer_accounts
- Auth surfaces: website login, portals, cloud API, SDK CLI

---

## 8. Accounts Still Missing

- All manifest user slots with `REPLACE_WITH_REAL_EMAIL` (see USER INVENTORY)
- Production service accounts (CI, telemetry exporters) — operator-defined
- OAuth social providers — not configured in app code

---

## 9–16. Configuration Summary

- **Supabase:** Email/password auth; extended roles migration `002_extended_roles.sql`
- **OAuth:** Not implemented in codebase (available via Supabase dashboard)
- **JWT claims:** sub, email, role (custom); SDK tokens add type=sdk, organizationId, scopes
- **MFA:** Supported by Supabase platform; not enforced in application code
- **Password policy:** Supabase defaults; reset via `/auth/forgot-password`
- **Password reset:** `resetPasswordForEmail` → `/auth/reset-password`
- **API keys:** Hashed with API_KEY_PEPPER; scopes on `api_keys` table

---

## 17. Service Account Inventory

| Service | Purpose | Authentication Method | Secrets Location | Status |
|---------|---------|----------------------|------------------|--------|
| Supabase Auth | Website / Studio human login | Email + password JWT (HS256) | VITE_SUPABASE_* (website), SUPABASE_JWT_SECRET (cloud) | REAL (platform) |
| NEXUS Cloud API | REST + WebSocket gateway | Bearer JWT, x-api-key, SDK token | .env / secret manager | REAL |
| NEXUS SDK CLI | Developer automation | Supabase access token or API key exchange | ~/.nexus/config.json | REAL |
| GitHub Actions (deploy) | CI/CD | Repository secrets | GitHub Secrets | PLACEHOLDER (configure per env) |
| nexus-os communication stub | ROS / fleet stub auth | Stub token (dev only) | In-memory stub | UNUSED (production) |
| Digital Twin / Manufacturing | Studio workspace | Org context + cloud token (optional) | localStorage nexus-organization-id | PARTIAL (no dedicated SA) |

---

## 18. CLI Authentication

`nexus login <access-token>` stores Supabase JWT in `~/.nexus/config.json`. `nexus auth token <api-key>` exchanges for 1h SDK JWT against Cloud API.

---

## 19. Studio Authentication

No native login UI. Command Center reads Supabase session from browser localStorage (same origin as website) or prompts operator to sign in via Cloud auth first.

---

## 20. Security Recommendations

1. Copy `identity-manifest.example.json` → `identity-manifest.json` with real operator emails only.
2. Run `provision-identity.mjs` after migration; store credentials in `data/identity/credentials.json` (gitignored).
3. Enable Supabase MFA for administrator roles in production.
4. Unify JWT `role` claim with profile `roles.name` via Supabase hook or app_metadata sync.
5. Rotate API_KEY_PEPPER and SUPABASE_SERVICE_ROLE_KEY on schedule.
6. Do not commit `.env`, manifest, or credentials.

---

## 21. Production Readiness

| Gate | Status |
|------|--------|
| No duplicate accounts in repo | ✓ |
| No hardcoded passwords | ✓ |
| Secrets in env / gitignore | ✓ |
| MFA supported (platform) | ✓ (not enforced) |
| RBAC catalog + bridge | ✓ |
| Default organizations defined | ✓ (migration + script) |
| JWT verification | ✓ |
| API key validation | ✓ |
| E2E auth verification | Requires live Supabase + DATABASE_URL |
| Complete inventory | ✓ (this report) |

---

## USER INVENTORY

| Name | Username | Email | Organization | Role | Status | Provisioned | Authentication Provider |
|------|----------|-------|--------------|------|--------|-------------|-------------------------|
| Platform Super Administrator | — | — (placeholder) | platform-administration | super_administrator | PLACEHOLDER | No | Supabase Auth |
| Platform Administrator | — | — (placeholder) | platform-administration | administrator | PLACEHOLDER | No | Supabase Auth |
| Engineering Lead | — | — (placeholder) | internal-engineering | engineering_lead | PLACEHOLDER | No | Supabase Auth |
| Sandbox Developer | — | — (placeholder) | developer-sandbox | developer | PLACEHOLDER | No | Supabase Auth |
| SDK Developer | — | — (placeholder) | developer-sandbox | sdk_developer | PLACEHOLDER | No | Supabase Auth |
| Marketplace Publisher | — | — (placeholder) | nexus-robotics | marketplace_publisher | PLACEHOLDER | No | Supabase Auth |
| Sponsor Representative | — | — (placeholder) | sponsor-sandbox | sponsor | PLACEHOLDER | No | Supabase Auth |
| Investor Viewer | — | — (placeholder) | sponsor-sandbox | investor | PLACEHOLDER | No | Supabase Auth |
| Content Moderator | — | — (placeholder) | operations | moderator | PLACEHOLDER | No | Supabase Auth |
| CMS Editor | — | — (placeholder) | operations | editor | PLACEHOLDER | No | Supabase Auth |
| Support Agent | — | — (placeholder) | operations | support | PLACEHOLDER | No | Supabase Auth |
| Manufacturing Operator | — | — (placeholder) | manufacturing | manufacturing | PLACEHOLDER | No | Supabase Auth |
| QA Engineer | — | — (placeholder) | internal-engineering | qa | PLACEHOLDER | No | Supabase Auth |
| Fleet Manager | — | — (placeholder) | operations | fleet_manager | PLACEHOLDER | No | Supabase Auth |
| Robot Operator | — | — (placeholder) | manufacturing | robot_operator | PLACEHOLDER | No | Supabase Auth |
| Demo User | — | — (placeholder) | developer-sandbox | demo_user | PLACEHOLDER | No | Supabase Auth |
| Read-only Viewer | — | — (placeholder) | nexus-robotics | viewer | PLACEHOLDER | No | Supabase Auth |

---

## SERVICE ACCOUNT INVENTORY

| Service | Purpose | Authentication Method | Secrets Location | Status |
|---------|---------|----------------------|------------------|--------|
| Supabase Auth | Website / Studio human login | Email + password JWT (HS256) | VITE_SUPABASE_* (website), SUPABASE_JWT_SECRET (cloud) | REAL (platform) |
| NEXUS Cloud API | REST + WebSocket gateway | Bearer JWT, x-api-key, SDK token | .env / secret manager | REAL |
| NEXUS SDK CLI | Developer automation | Supabase access token or API key exchange | ~/.nexus/config.json | REAL |
| GitHub Actions (deploy) | CI/CD | Repository secrets | GitHub Secrets | PLACEHOLDER (configure per env) |
| nexus-os communication stub | ROS / fleet stub auth | Stub token (dev only) | In-memory stub | UNUSED (production) |
| Digital Twin / Manufacturing | Studio workspace | Org context + cloud token (optional) | localStorage nexus-organization-id | PARTIAL (no dedicated SA) |

---

## API KEY INVENTORY

| System | Owner | Permissions | Rotation Policy | Status |
|--------|-------|-------------|-----------------|--------|
| NEXUS Cloud | Organization developer accounts | Scoped via api_keys.scopes | Manual revoke + rotate via Developer Portal | REAL (schema); count in DB: 0 |
| Supabase anon key | Website client | Public RLS-bound | Rotate in Supabase dashboard | REAL (env var) |
| Supabase service role | Provisioning script only | Admin user create | Never expose to client; rotate on compromise | REAL (env var, not in repo) |
| SDK issued token | Per API key exchange | organizationId + scopes, 1h TTL | Issued on demand | REAL |

---

## LOGIN URL INVENTORY

| Surface | URL / Entry | Auth | Status |
|---------|-------------|------|--------|
| Website | `/auth/login` | Supabase | REAL |
| Website sign-up | `/auth/sign-up` | Supabase | REAL |
| Developer Portal | `/developers/portal` (requires login) | Supabase + RoleGuard | REAL |
| Sponsor Portal | `/sponsors/portal` | Supabase + RoleGuard | REAL |
| Marketplace | `/marketplace` | Public browse; publish via Developer Portal | REAL |
| CMS | Command Center (Studio) | JWT + requireCmsEditor | REAL |
| Cloud API | `http://localhost:8787/v1/*` | Bearer / x-api-key | REAL |
| Command Center | nexus-studio Command Center panel | Supabase token from localStorage | REAL |
| Studio | Desktop app (no dedicated login page) | Website login → token in browser storage | PARTIAL |
| CLI | `nexus login <token>` | Supabase or API key | REAL |
| Manufacturing | Studio manufacturing module | Org id localStorage | PARTIAL (no login page) |
| Fleet | Studio fleet module | Org id localStorage | PARTIAL (no login page) |

---

## ENVIRONMENT VARIABLES

| Component | Variable | Required | Status |
|-----------|----------|----------|--------|
| Cloud | DATABASE_URL | Yes | REQUIRED |
| Cloud | SUPABASE_URL | Yes | REQUIRED |
| Cloud | SUPABASE_JWT_SECRET | Yes | REQUIRED |
| Cloud | SUPABASE_ANON_KEY | Optional | RECOMMENDED |
| Cloud | API_KEY_PEPPER | Yes (prod) | REQUIRED |
| Cloud | SUPABASE_SERVICE_ROLE_KEY | Provisioning only | REQUIRED for user provision |
| Website | VITE_SUPABASE_URL | Yes | REQUIRED |
| Website | VITE_SUPABASE_ANON_KEY | Yes | REQUIRED |
| Website | VITE_NEXUS_CLOUD_URL | Yes | REQUIRED |
| Studio | VITE_NEXUS_CLOUD_URL | Yes | RECOMMENDED |
| SDK | NEXUS_CLOUD_URL | CLI | OPTIONAL |
| Storage | STORAGE_DRIVER, STORAGE_LOCAL_PATH | Dev | OPTIONAL |

---

*Generated by `nexus-cloud/scripts/audit-identity.mjs`. Re-run after provisioning to refresh DB counts.*
