# GitHub Pages Setup

EPIC 69 — Configure GitHub Pages for `NEXUSEOS/NEXUS-website`.

## Repository

| Field | Value |
|-------|-------|
| Owner | `NEXUSEOS` |
| Repository | `NEXUS-website` |
| Default branch | `main` |
| Visibility | Public |
| Remote URL | `https://github.com/NEXUSEOS/NEXUS-website.git` |

## Base path

GitHub Pages serves project sites at:

```text
https://<owner>.github.io/<repo-name>/
```

For this repository:

```text
https://nexuseos.github.io/NEXUS-website/
```

Vite `base` must be `/NEXUS-website/` (case-sensitive, matches repo name).

The build script `scripts/build-pages.mjs` resolves base path from `GITHUB_REPOSITORY` automatically in CI.

## Enable GitHub Pages

1. Open [Pages settings](https://github.com/NEXUSEOS/NEXUS-website/settings/pages)
2. **Build and deployment → Source:** GitHub Actions
3. **Actions permissions:** Read and write (Settings → Actions → General)
4. **Workflow permissions:** Read and write contents, Pages write, `id-token` write (configured in `deploy.yml`)

## Required secrets (Actions)

| Secret | Required |
|--------|----------|
| `VITE_SUPABASE_URL` | Yes |
| `VITE_SUPABASE_ANON_KEY` | Yes |

## Optional variables

| Variable | Example |
|----------|---------|
| `VITE_NEXUS_CLOUD_URL` | Production cloud API URL |

## SPA fallback

`npm run build:pages` copies `dist/index.html` → `dist/404.html` for React Router client-side routes.

## Jekyll bypass

`public/.nojekyll` is copied to `dist/.nojekyll` so GitHub Pages serves Vite assets correctly.

## Local preview

```bash
npm run build:pages
npm run preview:pages
```

## Verification (verified 2026-07-20)

```bash
curl -I https://nexuseos.github.io/NEXUS-website/
```

**Current status:** HTTP 404 — repository is empty and Pages is not enabled. Push code and enable Pages before expecting a live site.
