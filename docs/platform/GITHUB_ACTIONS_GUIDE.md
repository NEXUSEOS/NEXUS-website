# GitHub Actions Guide

EPIC 69 — CI/CD workflows for nexus-website.

## Workflows

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | Lint, build, Lighthouse, Playwright E2E on PR/push |
| `.github/workflows/deploy.yml` | Production GitHub Pages deployment |

## Deploy workflow permissions

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Repository settings must allow GitHub Actions to deploy to Pages.

## CI workflow

Runs on every push/PR to `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. `npm run lighthouse`
5. Playwright E2E (`E2E_SKIP_CLOUD=1`)

## Deploy workflow

Runs on push to `main` and manual dispatch:

1. `npm ci`
2. `npm run build:pages` (TypeScript + Vite with Pages base path)
3. Upload `dist/` artifact
4. Deploy via `actions/deploy-pages@v4`

## Node version

Both workflows use Node **22** with npm cache.

## Secrets and variables

Configure under **Settings → Secrets and variables → Actions**:

| Name | Type |
|------|------|
| `VITE_SUPABASE_URL` | Secret |
| `VITE_SUPABASE_ANON_KEY` | Secret |
| `VITE_NEXUS_CLOUD_URL` | Variable (optional) |

## Monitoring

- Actions tab: `https://github.com/NEXUSEOS/NEXUS-website/actions`
- Mission Control deployment card (when cloud connected)
- Connection Orchestrator `github-actions` service validation

## Current state (verified 2026-07-20)

Remote repository is **empty** — no workflows have run on GitHub yet. Workflows exist locally and will activate after the first push.
