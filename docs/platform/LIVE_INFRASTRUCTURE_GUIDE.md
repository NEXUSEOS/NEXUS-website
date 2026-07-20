# Live Infrastructure Guide — EPIC 70

**Protocol:** Nexus Engineering Protocol v6.0 Phase 12  
**Status:** Infrastructure **NOT OPERATIONAL** — blocked on git push and GitHub configuration

---

## Current Deployment State

| Component | Status | Verified |
|-----------|--------|----------|
| GitHub Pages (website) | **NOT LIVE** | `curl` → HTTP 404 at https://nexuseos.github.io/NEXUS-website/ |
| GitHub Actions (website remote) | **NOT OPERATIONAL** | 0 workflows on remote (empty repo) |
| GitHub Actions (website local) | Ready | `deploy.yml`, `ci.yml` present locally |
| GitHub Actions (cloud local) | Ready | `deploy.yml`, `preview.yml`, `rollback.yml`, `ci.yml` |
| Cloud API deployment | **NOT VERIFIED** | No GitHub repo for nexus-cloud |
| Preview deployments | Local workflow only | `preview.yml` in nexus-cloud |
| Rollback workflow | Local workflow only | `rollback.yml` in nexus-cloud |
| Artifact storage | **NOT OPERATIONAL** | No workflow runs on GitHub |
| Deployment environments | Partial | `github-pages` env exists on NEXUS-website (empty repo) |

---

## Architecture

```text
┌──────────────────┐     push main      ┌─────────────────────┐
│  nexus-website   │ ──── BLOCKED ───► │  GitHub Actions     │
│  (local, no push)│                    │  (remote: none)     │
└──────────────────┘                    └──────────┬──────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────────┐
                                        │  GitHub Pages       │
                                        │  404 NOT LIVE       │
                                        └─────────────────────┘

┌──────────────────┐
│  nexus-cloud     │  No GitHub remote — deploy.yml local only
│  (182 uncommitted)│
└──────────────────┘
```

---

## GitHub Pages (Website)

| Setting | Value |
|---------|-------|
| Expected URL | https://nexuseos.github.io/NEXUS-website/ |
| Repository | `NEXUSEOS/NEXUS-website` |
| Base path | `/NEXUS-website/` (case-sensitive) |
| Pages API | `/repos/NEXUSEOS/NEXUS-website/pages` → **404** |
| Live probe | **404** — Site not found |

### Blockers

1. Repository empty — no commits pushed
2. Pages not enabled (requires first push + Actions source)
3. Actions secrets missing on remote: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
4. Valid `GITHUB_TOKEN` with repo/workflow scopes recommended for Mission Control probes

---

## GitHub Actions Workflows

### nexus-website (local, not on remote)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy.yml` | push main, workflow_dispatch | Build + deploy to GitHub Pages |
| `ci.yml` | push, PR | Lint, build, Lighthouse, E2E |

### nexus-cloud (local, not on remote)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy.yml` | push main, tags v*, workflow_dispatch | Docker build → GHCR, migrate, release |
| `preview.yml` | PR | Preview deployments |
| `rollback.yml` | workflow_dispatch | Manual rollback |
| `ci.yml` | push, PR | CI validation |

---

## Deployment Environments

| Repo | Environment | Verified |
|------|-------------|----------|
| NEXUSEOS/NEXUS-website | `github-pages` | Yes (API) — awaiting content |
| nexus-cloud | `staging`, `production` | Local workflow only — no remote |

---

## Secrets Inventory (names only)

### Website deployment (required in GitHub Actions secrets)

| Secret | Status |
|--------|--------|
| `VITE_SUPABASE_URL` | Cannot verify on remote (empty repo + invalid local token) |
| `VITE_SUPABASE_ANON_KEY` | Cannot verify on remote |

### Platform API (local env)

| Secret | Purpose |
|--------|---------|
| `GITHUB_TOKEN` / `GH_TOKEN` | GitHub API probes — **currently invalid** |
| `GITHUB_REPOSITORY` | Default `NEXUSEOS/NEXUS-website` |

**Never commit secret values.** Mission Control and Connection Orchestrator expose secret **names** only.

---

## Deployment Health Probes

EPIC 69 + EPIC 70 probe stack (via `@nexus-cloud/deployment`):

| Probe | Method |
|-------|--------|
| Repository exists | `GET /repos/{owner}/{repo}` |
| Repository empty | `size === 0` |
| Pages enabled | `GET /repos/{owner}/{repo}/pages` |
| Pages live | HTTP GET to Pages URL |
| Workflows present | `GET /repos/{owner}/{repo}/actions/workflows` |
| Latest run | `GET /repos/{owner}/{repo}/actions/runs` |
| Ecosystem audit | `auditEcosystemRepositories()` |

---

## Mission Control Integration

Mission Control homepage (`GET /v1/mission-control/homepage`) includes:

- `overviews.githubDeployment` — EPIC 69 single-repo Pages status
- `overviews.repositoryInfrastructure` — EPIC 70 full ecosystem audit
- `repositoryHealth` KPI tile — average ecosystem health score

Dedicated dashboard: `GET /v1/mission-control/repository-infrastructure`

---

## Connection Orchestrator Integration

Composes EPIC 69 GitHub managed service with EPIC 70 ecosystem audit:

- `GET /v1/connections/github/managed-service` — Connect GitHub wizard + deployment validation
- `GET /v1/connections/repository-infrastructure` — Full repo inventory + connection mapping
- `GET /v1/connections/integration-dashboard` — Includes `repositoryInfrastructure` summary

---

## Activation Checklist

1. **Push nexus-website** — initial commit to `NEXUSEOS/NEXUS-website`
2. **Enable Pages** — Settings → Pages → Source: GitHub Actions
3. **Add Actions secrets** — `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
4. **Configure valid GITHUB_TOKEN** — repo + workflow scopes for Mission Control
5. **Verify live URL** — https://nexuseos.github.io/NEXUS-website/ returns 200
6. **Create GitHub repos** for remaining ecosystem packages
7. **Add remotes + push** — nexus-cloud, nexus-studio, nexus-platform, nexus-os
8. **Initialize git** — nexus-sdk, nexus-specifications
