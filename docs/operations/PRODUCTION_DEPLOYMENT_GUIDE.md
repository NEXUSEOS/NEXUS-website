# Production Deployment Guide

EPIC 62 — End-to-end production deployment for the NEXUS ecosystem.

## Architecture

```
GitHub Actions (nexus-cloud)     GitHub Actions (nexus-website)
        │                                  │
        ▼                                  ▼
  Docker → GHCR                    build:pages → GitHub Pages
        │                                  │
        ▼                                  ▼
  nexus-cloud API                  Static SPA (Liquid Glass)
        │                                  │
        └────────── Supabase ──────────────┘
                   (auth, DB, storage, realtime)
```

## Prerequisites

1. Supabase production project (see [SUPABASE_PRODUCTION_GUIDE.md](./SUPABASE_PRODUCTION_GUIDE.md))
2. Cloud API domain + SSL (see [CLOUD_DEPLOYMENT_GUIDE.md](./CLOUD_DEPLOYMENT_GUIDE.md))
3. GitHub repository secrets configured (see [PRODUCTION_ENV_TEMPLATE.md](./PRODUCTION_ENV_TEMPLATE.md))
4. Connection orchestrator credentials (see [CONNECTION_ORCHESTRATOR_GUIDE.md](./CONNECTION_ORCHESTRATOR_GUIDE.md))

## Deploy nexus-cloud

1. Push to `main` or tag `v*` — triggers `.github/workflows/deploy.yml`
2. Workflow builds Docker image → GHCR, runs migrations through `0050_live_platform_activation.sql`
3. Runs `provision-production.mjs` and `validate-production-env.mjs`
4. Apply Terraform plan when cloud credentials are configured

```bash
cd nexus-cloud
npm run db:migrate
node scripts/validate-production-env.mjs --environment production
node scripts/provision-production.mjs --environment production
```

## Deploy nexus-website

### GitHub Pages (default)

See [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md). Push to `main` triggers automated deploy.

### Production CDN (custom domain)

```bash
cd nexus-website
npm run build   # VITE_BASE_PATH=/, production env vars
# Upload dist/ to CDN (Cloudflare Pages, S3+CloudFront, etc.)
```

## Post-deploy activation

1. Open **Mission Control → Live Activation** in nexus-studio Command Center
2. Or call `POST /v1/live-activation/run`
3. Verify quality gate via `GET /v1/live-activation/dashboard`
4. Run launch validation: `POST /v1/launch/validation/live-platform-activation`

## Health checks

| Endpoint | Purpose |
|----------|---------|
| `GET /v1/health` | API liveness |
| `GET /v1/ready` | Readiness (DB + deps) |
| `GET /v1/live-activation/health-report` | Domain health report |
| `GET /v1/mission-control/live-activation` | Mission Control integration |

## Related guides

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) — Hub-and-spoke overview
- [PRODUCTION_RUNBOOK.md](./PRODUCTION_RUNBOOK.md) — Day-to-day ops
- [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md) — Disaster recovery
