# ADR-090: Scoped Feature Flags

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 — Full Platform Integration

## Context

EPIC 19 introduced global `feature_flags` in Cloud CMS. Website still used hardcoded booleans in `config/features.ts`. Enterprise deployment requires flags scoped by organization, role, user, environment, and release channel.

## Decision

Add **`feature_flag_rules`** table with scoped overrides:

| Scope | `scope_value` |
|-------|---------------|
| `global` | null |
| `organization` | org UUID |
| `role` | role name |
| `user` | user UUID |
| `environment` | `development` / `staging` / `production` |
| `release_channel` | `stable` / `beta` / `nightly` |

Resolution order: base flag → rules by descending priority → last matching rule wins.

Public API: `GET /v1/platform/feature-flags?organizationId=&role=&environment=&releaseChannel=`

Admin API: `POST /v1/platform/feature-flag-rules` (platform admin)

Website bootstrap calls `loadCloudFeatureFlags()` before render — zero hardcoded runtime flags.

## Consequences

- Command Center Feature Flags panel manages global toggles
- Scoped rules enable per-org beta programs and role-gated features
- Seed migration migrates legacy website flags to Cloud

*Related: ADR-088, ADR-089*
