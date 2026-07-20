# Connection Orchestrator Guide

EPIC 62 — Production connection registry, health checks, and activation.

## Overview

The connection orchestrator (`@nexus-cloud/connection-orchestrator`) manages production service wiring. EPIC 62 extends it for live platform activation — no duplicate registry.

## Production connections

`PRODUCTION_CONNECTION_IDS` includes Supabase, Stripe, OpenAI, GitHub, Cloudflare, Grafana, SendGrid, and more.

## Key APIs

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/v1/connections/connection-center` | Dashboard |
| GET | `/v1/connections/health-matrix` | Health matrix |
| POST | `/v1/connections/validate-all` | Validate all production connections |
| GET | `/v1/connections/:serviceId/diagnostics` | Diagnostics |
| POST | `/v1/connections/:serviceId/repair` | One-click repair |
| PUT | `/v1/connections/:serviceId/credentials` | Save credentials |

## Live probes

`liveProbeEngine.ts` runs real HTTP/DB probes when credentials are configured:

- Stripe balance API
- OpenAI models list
- GitHub rate limit
- Cloudflare token verify
- Supabase storage + RLS
- Grafana health
- HTTPS endpoints (website, cloud API)

## Activation flow

1. `syncEnvironmentRegistry()` — sync env vars to `environment_variable_registry`
2. `validateAllProductionConnections()` — run live probes with retry
3. `runLivePlatformActivation()` — orchestrates provisioning, backup, restore, quality gate
4. Results stored in `production_activation_runs`

## Command Center panels

- **Connection Center** — `/v1/connections/connection-center`
- **Production Readiness Wizard** — `/v1/platform-ops/production-readiness`
- **Environment Manager** — `/v1/command-center/production/environment-manager`
- **Mission Control → Live Activation** — aggregated status

## Config import/export

Use Configuration Manager and Secrets Dashboard panels. Audit trail: `GET /v1/connections/audit-trail`.

## Secret rotation

1. Update credential via `PUT /v1/connections/:serviceId/credentials`
2. `POST /v1/connections/:serviceId/validate`
3. Re-run `POST /v1/live-activation/run`

## Validation

Launch validation category `live_platform_activation` verifies orchestrator wiring and live probes.
