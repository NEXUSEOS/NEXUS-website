# ADR-096: Cloud Production Deployment

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 Task 2 — Production Readiness

## Decision

- **Dockerfile** for nexus-cloud API (Node 22 Alpine + tsx)
- **docker-compose.yml** runs Postgres + API with health dependencies
- **GitHub Actions** CI: lint, typecheck, migrate, integration tests
- Website deploy workflow includes `VITE_NEXUS_CLOUD_URL` for production API binding

## Consequences

Cloud API deployable as container. CI validates migrations before release.

*Related: ADR-036, ADR-089*
