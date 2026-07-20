# ADR-093: Production Audit and Rate Limiting

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 Task 2 — Production Readiness

## Decision

Persist all administrative audit events to PostgreSQL `audit_logs` via `createPersistedAuditLogger()`. Apply `@fastify/rate-limit` globally (200 req/min) with health endpoint allowlist.

## Consequences

Command Center audit panel receives real data. API abuse mitigated at gateway layer.

*Related: ADR-087, ADR-085*
