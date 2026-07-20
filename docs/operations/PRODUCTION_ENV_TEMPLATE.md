# Production Environment Template

EPIC 62 — Required and optional production environment variables.

Run validation:

```bash
cd nexus-cloud
node scripts/validate-production-env.mjs --environment production
```

## Required (nexus-cloud host / GitHub Actions secrets)

| Variable | Category | Description |
|----------|----------|-------------|
| `NEXUS_CLOUD_URL` | cloud_api | Public API URL |
| `DATABASE_URL` | database | Postgres connection string |
| `SUPABASE_URL` | supabase | Supabase project URL |
| `SUPABASE_ANON_KEY` | supabase | Anon key (server-side where needed) |
| `SUPABASE_SERVICE_ROLE_KEY` | supabase | Service role (server only) |
| `WEBSITE_URL` | website | Production website URL for live probes |
| `STRIPE_SECRET_KEY` | billing | Stripe secret key |
| `GITHUB_TOKEN` | github | GitHub API token |
| `CLOUDFLARE_API_TOKEN` | cdn | Cloudflare API token |
| `OPENAI_API_KEY` | ai | OpenAI API key |

## Required (nexus-website GitHub Actions)

| Variable | Type | Description |
|----------|------|-------------|
| `VITE_SUPABASE_URL` | Secret | Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Secret | Supabase anon key |
| `VITE_NEXUS_CLOUD_URL` | Variable | Cloud API URL |

## Optional

| Variable | Category | Description |
|----------|----------|-------------|
| `VITE_BASE_PATH` | website | `/` or `/nexus-website/` |
| `VITE_SITE_URL` | website | Canonical site URL |
| `SENDGRID_API_KEY` | email | Email provider |
| `CONTAINER_REGISTRY` | cloud_api | Default `ghcr.io` |
| `GRAFANA_URL` | monitoring | Grafana instance |
| `GRAFANA_API_KEY` | monitoring | Grafana API key |

## Registry

Migration `0050_live_platform_activation.sql` seeds `environment_variable_registry` for production.
Sync runtime state via Environment Manager or `syncEnvironmentRegistry()`.
