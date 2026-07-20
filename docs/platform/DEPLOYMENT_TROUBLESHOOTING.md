# Deployment Troubleshooting

EPIC 69 — Common GitHub Pages deployment failures and fixes.

## "Site not found" (HTTP 404)

GitHub returns a generic HTML page with title **Site not found**.

| Cause | Fix |
|-------|-----|
| Repository empty | Push code to `main` |
| Pages not enabled | Settings → Pages → Source: GitHub Actions |
| Wrong URL case | Use `https://nexuseos.github.io/NEXUS-website/` (not `nexus-website`) |
| Deploy never ran | Push to `main` or trigger `workflow_dispatch` |
| Build failed | Check Actions logs |

## Wrong base path / broken assets

Symptoms: HTML loads but CSS/JS 404, blank page.

| Cause | Fix |
|-------|-----|
| Base path mismatch | Repo is `NEXUS-website` → base must be `/NEXUS-website/` |
| Old hardcoded `/nexus-website/` | Use `npm run build:pages` (uses `scripts/build-pages.mjs`) |
| Missing `.nojekyll` | Ensure `public/.nojekyll` exists |

## React Router deep links 404

| Cause | Fix |
|-------|-----|
| Missing SPA fallback | `build:pages` copies `index.html` → `404.html` |

## Workflow permission errors

| Error | Fix |
|-------|-----|
| `Resource not accessible by integration` | Settings → Actions → Read and write |
| Pages deploy denied | Enable Pages + `pages: write` in workflow |
| Environment `github-pages` missing | First successful Pages deploy creates it |

## Empty repository (current state)

Verified via GitHub API (2026-07-20):

- `NEXUSEOS/NEXUS-website` — size 0, no branches
- Pages API returns 404 (not enabled)
- No workflow runs

**Fix:** Initial commit + push, enable Pages, add secrets, run deploy workflow.

## Remote URL mismatch

Local remote was `nexus-website` (lowercase); actual repo is `NEXUS-website`.

```bash
git remote set-url origin https://github.com/NEXUSEOS/NEXUS-website.git
```

## gh CLI unavailable

`gh` is not installed in the local environment. Use:

- `curl https://api.github.com/repos/NEXUSEOS/NEXUS-website`
- GitHub web UI for Actions and Pages settings
- Mission Control deployment APIs when cloud is running

## Mission Control shows "GitHub Not Connected"

1. Set `GITHUB_TOKEN` in cloud environment (repo + workflow scopes)
2. Set `GITHUB_REPOSITORY=NEXUSEOS/NEXUS-website`
3. Run Connect GitHub wizard in Studio
4. Revalidate from Deployment Status Card

## Supabase build failures in CI

Add repository secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Without these, build may succeed locally with defaults but fail or produce degraded portal features in CI.
