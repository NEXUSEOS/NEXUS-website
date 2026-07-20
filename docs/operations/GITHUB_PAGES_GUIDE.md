# GitHub Pages Deployment Guide

EPIC 62 — Deploy nexus-website to GitHub Pages with production wiring.

## Workflow

File: `nexus-website/.github/workflows/deploy.yml`

- **Trigger:** push to `main`, manual `workflow_dispatch`
- **Build:** `npm run build:pages`
- **Deploy:** `actions/deploy-pages@v4` to `github-pages` environment

## Environment variables

Configure in GitHub repository **Settings → Secrets and variables → Actions**:

| Name | Type | Required | Example |
|------|------|----------|---------|
| `VITE_SUPABASE_URL` | Secret | Yes | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Secret | Yes | Supabase anon key |
| `VITE_NEXUS_CLOUD_URL` | Variable | Yes | `https://api.nexus.example.com` |

Build-time overrides (hardcoded in workflow):

- `VITE_BASE_PATH=/NEXUS-website/` (resolved from `GITHUB_REPOSITORY` in CI)
- `VITE_SITE_URL=https://nexuseos.github.io/NEXUS-website`

## SPA routing

`build:pages` copies `dist/index.html` → `dist/404.html` so client-side routes work on GitHub Pages.

## Caching

Static asset cache headers are defined in `public/_headers` (copied to `dist/` on build).

## Local preview

```bash
npm run build:pages
npm run preview:pages
```

Open the preview URL with base path `/NEXUS-website/`.

## Custom domain

1. Add CNAME in repository GitHub Pages settings
2. Update `VITE_SITE_URL` and `VITE_BASE_PATH=/` in workflow for root deployment
3. Configure Cloudflare DNS (see [CLOUD_DEPLOYMENT_GUIDE.md](./CLOUD_DEPLOYMENT_GUIDE.md))

## Verification

```bash
curl -I https://nexuseos.github.io/nexus-website/
```

Launch validation checks `deploy_pages_workflow` and live probe `live_github_pages`.
