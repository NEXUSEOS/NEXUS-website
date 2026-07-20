# ADR-094: NEXUS CLI Production Implementation

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 Task 2 — Production Readiness

## Decision

Implement `@nexus/sdk-cli` in nexus-sdk with binary `nexus`:

| Command | Action |
|---------|--------|
| `nexus init` | Scaffold behavior project |
| `nexus login` | Store Supabase token |
| `nexus auth token` | Exchange API key for SDK JWT |
| `nexus validate` | Run `@nexus/sdk-behavior` verification |
| `nexus package` | SHA-256 sign and export |
| `nexus organizations` | List Cloud orgs |

Website Developer Portal API Keys page wired to Cloud `/v1/organizations/:id/api-keys`.

## Consequences

Developers authenticate via CLI or portal, then publish through Cloud APIs.

*Related: ADR-016, ADR-010*
