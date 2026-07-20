# Live Deployment Checklist

EPIC 69 — Quality gate checklist before declaring nexus-website live on GitHub Pages.

## Pre-push (local)

- [x] `npm run build:pages` passes
- [x] TypeScript (`tsc -b`) passes
- [x] `dist/404.html` exists (SPA fallback)
- [x] `dist/.nojekyll` exists
- [x] Asset paths use `/NEXUS-website/` base prefix
- [x] `public/robots.txt`, `public/sitemap.xml` present
- [ ] Git commit and push to `NEXUSEOS/NEXUS-website` **(blocked — no commits yet; user approval required)**

## GitHub repository

- [ ] Repository has commits on `main` **(blocked — remote empty)**
- [ ] `.github/workflows/deploy.yml` on remote
- [ ] GitHub Pages enabled (Source: GitHub Actions) **(blocked)**
- [ ] Actions permissions: read/write + Pages deploy **(blocked — verify after push)**
- [ ] Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## GitHub Actions

- [ ] Deploy workflow run succeeds **(blocked — no runs)**
- [ ] Build artifact uploaded
- [ ] `deploy-pages` job completes
- [ ] `github-pages` environment shows deployment URL

## Live URL verification

- [ ] `curl -I https://nexuseos.github.io/NEXUS-website/` returns 200 **(currently 404)**
- [ ] HTML loads (not "Site not found")
- [ ] CSS/JS assets load (`/NEXUS-website/assets/*`)
- [ ] React Router navigation works (deep links via 404.html)
- [ ] `robots.txt`, `sitemap.xml` accessible
- [ ] Favicon loads

## Mission Control / Connection Orchestrator

- [x] Deployment Status Card API: `/v1/mission-control/github-deployment`
- [x] Connect GitHub wizard API: `/v1/mission-control/github-connect-wizard`
- [x] GitHub managed service: `/v1/connections/github/managed-service`
- [x] Studio panels: GitHub Deployment Status, Connect GitHub Wizard
- [ ] Cloud env: `GITHUB_TOKEN`, `GITHUB_REPOSITORY=NEXUSEOS/NEXUS-website`

## Sign-off

| Gate | Status |
|------|--------|
| Local build | PASS |
| Remote deploy | BLOCKED (empty repo) |
| Live site | BLOCKED (404) |
| Mission Control UI | PASS (code complete) |
