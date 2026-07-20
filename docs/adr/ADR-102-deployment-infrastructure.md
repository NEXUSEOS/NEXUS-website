# ADR-102: Deployment Infrastructure Completion

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 25 — Deployment Infrastructure

## Decision

Complete cloud deployment infrastructure with migration `0014_deployment_infrastructure`, package `@nexus-cloud/deployment`, operational scripts, Terraform foundation, and GitHub Actions for production CI/CD, preview deployments, and rollbacks.

### Delivered

| Capability | Implementation |
|------------|----------------|
| GitHub Actions | CI enhanced (Terraform validate, Docker smoke); new `deploy`, `preview`, `rollback` workflows; CI for platform, studio, website |
| Production CI/CD | GHCR image build/push + pre-deploy migrations |
| Preview Deployments | PR workflow builds tagged image + comments preview URL |
| Rollback Deployments | Manual workflow + `POST /deployment/rollback` API |
| Database Rollbacks | `scripts/rollback-db.mjs` + `POST /deployment/database/rollback` plan API |
| Backups | `scripts/backup-db.mjs` + snapshot registry in `deploy_db_snapshots` |
| Restore Testing | `scripts/restore-test.mjs` + `deploy_restore_tests` tracking |
| Disaster Recovery | `deploy_dr_plans` runbook + drill recording API |
| Infrastructure Documentation | `nexus-cloud/infra/README.md` |
| Terraform Foundation | `infra/terraform/` modules for Postgres + API service metadata |
| Environment Manager | `deploy_environments` + CRUD via Command Center |
| Production Readiness Checklist | `docs/PRODUCTION_READINESS.md` + automated checklist API |
| Security Checklist | `docs/SECURITY_CHECKLIST.md` + automated checklist API |

Production container hardened: non-root user, `.dockerignore`, `docker-compose.prod.yml`.

Website deploy workflow now sets `VITE_NEXUS_CLOUD_URL` per ADR-096.

## Consequences

NEXUS Cloud is production-ready with documented deploy, rollback, backup, and DR paths. Hub-and-spoke pipeline (ADR-036) stage 2 (Cloud API + migration) is fully automated.

*Related: ADR-036, ADR-096, ADR-101*
