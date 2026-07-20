# ADR-095: Marketplace Production Pipeline

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 Task 2 — Production Readiness

## Decision

- Public marketplace loads from `GET /v1/marketplace/listings` with package metadata joins
- Publish requires `pending_review` or `draft` status (gate before public)
- Package signing uses SHA-256 content hash via Node `crypto`
- Marketplace installs persisted in `marketplace_installs`

## Consequences

No static featured packages on website. Publish workflow enforces review gate.

*Related: ADR-015, ADR-014*
