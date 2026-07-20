# Master Deployment Guide

Aggregated deployment procedures from nexus-cloud CI/CD, nexus-website GitHub Pages, and EPIC 62/65 production activation audits.

## Architecture

```
                    ┌─────────────────┐
                    │   DNS + CDN     │
                    │  (Cloudflare)   │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  nexus-website        nexus-cloud API      Supabase
  (GitHub Pages)       (Docker/Fastify)     (Auth/DB/Storage)
         │                   │
         └─────────┬─────────┘
                   ▼
            nexus-studio (Electron)
            nexus-sdk (CLI/packages)
            nexus-os (robot runtime)
```

## Repository Deployment Matrix

| Repository | Deploy Target | Workflow | Verify |
|------------|---------------|----------|--------|
| nexus-cloud | Docker container / cloud host | `.github/workflows/deploy.yml` | `/v1/health`, `/v1/ready` |
| nexus-website | GitHub Pages | `.github/workflows/deploy.yml` | HTTP 200 on `/`, sitemap |
| nexus-studio | Electron release (manual/CI) | Local build | Command Center connect |
| nexus-sdk | npm publish | CI | `nexus connect validate` |
| nexus-platform | npm packages | CI | consumed by cloud/website/studio |
| nexus-os | device/edge deploy | manual | cloud sync probe |

## Pre-Deploy Checklist

1. Run production certification: `POST /v1/launch/validation/certification/production/run`
2. Validate environment: `node scripts/validate-production-env.mjs --audit`
3. Run database migrations: `npm run db:migrate`
4. Backup database: `node scripts/backup-db.mjs`
5. Confirm CI green on all ecosystem repos

## Cloud API Deployment

```bash
cd nexus-cloud
docker build -t nexus-cloud-api:latest .
docker compose -f docker-compose.prod.yml up -d
curl https://api.example.com/v1/health
curl https://api.example.com/v1/ready
```

Rollback: `gh workflow run rollback.yml -f release=<previous-version>`

## Website (GitHub Pages)

```bash
cd nexus-website
# GitHub Actions secrets: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_NEXUS_CLOUD_URL
npm run build:pages
# Deploy via .github/workflows/deploy.yml
```

See [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md) for base path configuration.

## Database

```bash
cd nexus-cloud
npm run db:migrate
node scripts/backup-db.mjs
```

Latest migration: `0056_production_certification.sql`

## Terraform Foundation

Location: `nexus-cloud/infra/terraform/`

Modules: secrets, monitoring, DNS (EPIC 56 live infrastructure)

```bash
cd nexus-cloud/infra/terraform
terraform validate
terraform plan
```

## Production Activation Audits

EPIC 65 provides three audit layers:

| Audit | Method | API |
|-------|--------|-----|
| Deployment | Artifact + HTTP probes | GET `/v1/production-activation/deployment-audit` |
| Connection | validate-all + env registry | GET `/v1/production-activation/connection-audit` |
| Infrastructure | Health probes + env vars | GET `/v1/production-activation/infrastructure-audit` |

Full activation: `POST /v1/production-activation/run-activation`

## Load Testing

```bash
cd nexus-cloud
node scripts/load-test.mjs
```

Target: p95 < 500ms at expected peak RPS.

## Related Documents

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)
- [CLOUD_DEPLOYMENT_GUIDE.md](./CLOUD_DEPLOYMENT_GUIDE.md)
- [SUPABASE_PRODUCTION_GUIDE.md](./SUPABASE_PRODUCTION_GUIDE.md)
- [MASTER_RECOVERY_GUIDE.md](./MASTER_RECOVERY_GUIDE.md)
