# Cloud Deployment Guide

EPIC 62 — nexus-cloud API production domain, DNS, SSL, and CDN.

## Components

| Component | Location | Notes |
|-----------|----------|-------|
| API container | `ghcr.io/<org>/nexus-cloud-api` | Built by `deploy.yml` |
| Terraform | `nexus-cloud/infra/terraform/` | DNS, CDN, secrets, monitoring modules |
| DNS/SSL | Cloudflare (via `CLOUDFLARE_API_TOKEN`) | Connection orchestrator live probes |
| CDN | Cloudflare or GitHub Pages | Website static assets |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXUS_CLOUD_URL` | Public API URL (e.g. `https://api.nexus.example.com`) |
| `CONTAINER_REGISTRY` | Default `ghcr.io` |
| `CLOUDFLARE_API_TOKEN` | DNS + SSL verification |
| `WEBSITE_URL` | Production website URL for live probes |

## Deploy pipeline

1. `nexus-cloud/.github/workflows/deploy.yml` — build, migrate, terraform plan, provision
2. `scripts/migrate-deploy.mjs` — pre-deploy migrations
3. `scripts/provision-production.mjs` — infrastructure validation
4. `scripts/validate-production-env.mjs` — env registry check

## Terraform

```bash
cd nexus-cloud/infra/terraform
terraform init
terraform plan -var="environment=production" -var="cloud_url=https://api.nexus.example.com"
```

Modules: `secrets`, `monitoring`, `dns`, `cdn`, `postgres`, `nexus-cloud-api`

## API routes (EPIC 62)

- `GET /v1/command-center/production/cloud-center`
- `GET /v1/command-center/production/infrastructure-center`
- `POST /v1/command-center/production/provision`
- `GET /v1/live-activation/dashboard`

## Monitoring

- Prometheus metrics: `@nexus-cloud/observability`
- Grafana: configure `GRAFANA_URL` + `GRAFANA_API_KEY`
- Mission Control aggregates alerts from production-operations

## Image optimization

Website: Vite manual chunks + `_headers` cache policy.
API: Docker multi-stage build in `nexus-cloud/Dockerfile`.
