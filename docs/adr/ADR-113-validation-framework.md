# ADR-113: Validation Framework

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 29 — Connection Orchestrator

## Decision

Every connector declares `validationMethods` in the registry. The `validationEngine` implements:

| Method | Behavior |
|--------|----------|
| credentials | Probe env vars; reject placeholders (`your-`, `change-me`) |
| permissions | JWT secret presence for auth services |
| network | HTTP reachability with timeout |
| database | PostgreSQL `SELECT 1` |
| api | Deferred to health engine for live services |
| storage | Storage driver configuration |
| buckets | Wizard-guided (Supabase admin) |
| oauth | Documented as Supabase dashboard config |
| webhooks | Secret key presence |
| dns / ssl | Production wizard deferred |

Validation produces `ValidationDiagnostic[]` with check, passed, message, severity. Results persist to `connection_validation_logs`.

API: `POST /v1/connections/:serviceId/validate`.

## Consequences

- No hardcoded credentials — validation reads process environment only
- Detailed diagnostics returned to Command Center Connect action

*Related: ADR-111*
