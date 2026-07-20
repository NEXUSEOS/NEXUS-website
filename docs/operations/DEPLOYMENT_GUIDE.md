# NEXUS Deployment Guide

Production deployment for the NEXUS platform hub-and-spoke architecture.

## Architecture

```
                    ┌─────────────────┐
                    │   DNS + CDN     │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  nexus-website        nexus-cloud API      Supabase
  (static/Vite)        (Docker/Fastify)     (Auth/DB/Storage)
         │                   │
         └─────────┬─────────┘
                   ▼
            nexus-studio (Electron)
            nexus-sdk (CLI/packages)
```

## Prerequisites

- Node.js 22+
- Docker 24+
- PostgreSQL 16 (or Supabase managed Postgres)
- Supabase project (auth, storage, JWT secret)
- GitHub Actions secrets configured for CD

## Environment Variables

### nexus-cloud (API)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | yes | Postgres connection string |
| `SUPABASE_JWT_SECRET` | yes | JWT verification |
| `API_KEY_PEPPER` | yes | API key hashing |
| `NODE_ENV` | yes | `production` |
| `PORT` | no | Default `8787` |

### nexus-website

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_NEXUS_CLOUD_URL` | yes | Production API URL |
| `VITE_SUPABASE_URL` | yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | yes | Supabase anon key |

## Deployment Steps

### 1. Database

```bash
cd nexus-cloud
npm run db:migrate
node scripts/backup-db.mjs
```

### 2. Cloud API (Docker)

```bash
docker build -t nexus-cloud-api:latest .
docker compose -f docker-compose.prod.yml up -d
```

Verify:

```bash
curl https://api.example.com/v1/health
curl https://api.example.com/v1/ready
```

### 3. Website

```bash
cd nexus-website
VITE_NEXUS_CLOUD_URL=https://api.example.com npm run build
# Deploy dist/ to CDN or static host
```

### 4. GitHub Actions CD

The `deploy.yml` workflow in `nexus-cloud` runs on merge to `main`:

1. Build and test
2. Build Docker image
3. Push to registry
4. Deploy to target environment
5. Run migrations
6. Smoke test `/v1/health`

### 5. DNS & SSL

- Point `api.example.com` to API load balancer
- Point `www.example.com` to CDN origin
- Terminate TLS at CDN or load balancer (Let's Encrypt / managed certs)

### 6. Post-deploy validation

```bash
cd nexus-cloud
node scripts/validate-launch.mjs
node scripts/validate-production-env.mjs --environment production
```

Or from Command Center: **Mission Control → Live Activation → Run live activation**.

## Website: GitHub Pages (EPIC 62)

Push to `main` in `nexus-website` triggers `.github/workflows/deploy.yml` — builds with `build:pages` and deploys to GitHub Pages. See [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md).

## Preview Environments

PRs trigger `preview.yml` — ephemeral API + website preview URLs for QA.

## Rollback

Use `rollback.yml` or Command Center **Deployment Center** to revert to previous release. See [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md).

## Related Documents

- [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) — EPIC 62 end-to-end production deploy
- [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md)
- [SUPABASE_PRODUCTION_GUIDE.md](./SUPABASE_PRODUCTION_GUIDE.md)
- [CLOUD_DEPLOYMENT_GUIDE.md](./CLOUD_DEPLOYMENT_GUIDE.md)
- [CONNECTION_ORCHESTRATOR_GUIDE.md](./CONNECTION_ORCHESTRATOR_GUIDE.md)
- [PRODUCTION_ENV_TEMPLATE.md](./PRODUCTION_ENV_TEMPLATE.md)
- [PRODUCTION_RUNBOOK.md](./PRODUCTION_RUNBOOK.md)
- [OPERATIONS_GUIDE.md](./OPERATIONS_GUIDE.md)
- [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
