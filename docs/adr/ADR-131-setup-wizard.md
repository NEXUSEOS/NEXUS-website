# ADR-131: Setup Wizard

## Status
Accepted — PROGRAM ALPHA Phase 1

## Context
Fresh NEXUS installs require a guided first-run experience before administrators can use Command Center, Developer Portal, Sponsor Portal, or Marketplace.

## Decision
Implement a 10-step Setup Wizard:

1. Platform Information
2. Administrator
3. Supabase
4. PostgreSQL
5. Storage
6. GitHub
7. AI Providers
8. Email
9. Marketplace Billing
10. Review & Complete

- **Persistence**: `platform_setup_runs` + `platform_config`
- **Validation**: connection orchestrator `validateService()` per integration step
- **Completion**: creates default orgs, enables feature flags, runs unified startup validation, sets `platform_initialized`
- **Surfaces**: Studio `SetupWizardPanel`, Website `/admin/setup`, public setup API when uninitialized

Login redirect: Website sends users to `/admin/setup` when `platform_initialized` is false.

## Consequences
- Setup routes allow unauthenticated access only until platform is initialized
- Administrator provisioning uses existing Supabase auth + org membership (no duplicate identity system)
