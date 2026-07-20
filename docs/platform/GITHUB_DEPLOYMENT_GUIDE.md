# GitHub Deployment Guide

EPIC 69 — End-to-end deployment flow for nexus-website on GitHub Pages.

## Architecture

```text
Developer push → GitHub Actions (deploy.yml)
  → npm ci → npm run build:pages → dist/
  → upload-pages-artifact → deploy-pages → GitHub Pages CDN
```

## Workflow

File: `.github/workflows/deploy.yml`

| Step | Action |
|------|--------|
| Trigger | Push to `main`, manual `workflow_dispatch` |
| Build | `npm run build:pages` with `GITHUB_REPOSITORY` |
| Artifact | `actions/upload-pages-artifact@v3` |
| Deploy | `actions/deploy-pages@v4` to `github-pages` environment |

## Environment resolution

`scripts/build-pages.mjs` sets:

- `VITE_BASE_PATH=/<repo>/`
- `VITE_SITE_URL=https://<owner>.github.io/<repo>`
- `GITHUB_PAGES=true`

## First-time deployment checklist

1. Push all website source to `NEXUSEOS/NEXUS-website` on `main`
2. Enable GitHub Pages (Source: GitHub Actions)
3. Add Actions secrets (`VITE_SUPABASE_*`)
4. Run **Deploy to GitHub Pages** workflow
5. Verify `https://nexuseos.github.io/NEXUS-website/`

## Mission Control

After cloud API is running with `GITHUB_TOKEN` and `GITHUB_REPOSITORY=NEXUSEOS/NEXUS-website`:

- `GET /v1/mission-control/github-deployment` — deployment status card
- `GET /v1/mission-control/github-connect-wizard` — Connect GitHub wizard
- `GET /v1/connections/github/managed-service` — connection orchestrator health

## Custom domain

1. Add CNAME in GitHub Pages settings
2. Set `WEBSITE_CNAME` in cloud environment
3. Update workflow to use `VITE_BASE_PATH=/` when deploying to domain root

## Rollback

Re-run a previous successful workflow from Actions, or revert the commit on `main` and push.
