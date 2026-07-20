# Deployment Standards — NEXUS Platform

**Protocol:** Nexus Engineering Protocol v6.0 Phase 12  
**Status:** Standards defined; **live deployment not operational**

---

## Deployment Targets

| Service | Target | URL | Status |
|---------|--------|-----|--------|
| NEXUS Website | GitHub Pages | https://nexuseos.github.io/NEXUS-website/ | **404 — NOT LIVE** |
| NEXUS Cloud API | Container (GHCR) + K8s/Terraform | Configurable via `NEXUS_CLOUD_URL` | Not deployed |
| NEXUS Studio | Static / Electron | TBD | Local only |
| NEXUS Platform | npm packages | Registry TBD | Local only |

---

## Website Deployment (GitHub Pages)

### Prerequisites

1. Commits pushed to `NEXUSEOS/NEXUS-website`
2. GitHub Pages enabled (Source: GitHub Actions)
3. Actions secrets configured
4. Base path matches repo name: `/NEXUS-website/`

### Workflow: `deploy.yml`

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write
```

**Jobs:** build → upload-pages-artifact → deploy-pages (environment: `github-pages`)

### Required Secrets

| Secret | Required | Exposed in client bundle |
|--------|----------|--------------------------|
| `VITE_SUPABASE_URL` | Yes | Yes (Vite prefix) |
| `VITE_SUPABASE_ANON_KEY` | Yes | Yes (anon key only) |

### Optional Variables

| Variable | Default |
|----------|---------|
| `VITE_NEXUS_CLOUD_URL` | `https://api.nexus.local` |

### Health Check

```bash
curl -I https://nexuseos.github.io/NEXUS-website/
# Expected when operational: HTTP/2 200
# Current verified: HTTP/2 404
```

---

## Cloud Deployment

### Workflow: `deploy.yml` (nexus-cloud)

| Stage | Action |
|-------|--------|
| build-and-push | Docker image → GHCR |
| migrate-and-release | DB migrations + release record |
| Environment | `staging` or `production` (workflow_dispatch input) |

### Workflow: `preview.yml`

- Triggered on pull requests
- Provisions preview environment

### Workflow: `rollback.yml`

- Manual `workflow_dispatch`
- Inputs: `environment`, `from_version`, `to_version`, `reason`
- Validates rollback target builds before proceeding

### Deployment Environments

| Environment | Purpose |
|-------------|---------|
| `staging` | Pre-production validation |
| `production` | Live platform |
| `github-pages` | Website static hosting |

---

## Rollback Standards

| Type | Method |
|------|--------|
| Website | Re-run previous successful `deploy.yml` workflow or revert commit on main |
| Cloud API | `rollback.yml` workflow_dispatch with version tags |
| Database | `scripts/rollback-db.mjs` + migration down files |
| Release registry | `@nexus-cloud/deployment` service tracks releases and rollbacks |

**Current state:** Rollback workflows exist locally only — not operational on GitHub.

---

## Release Standards

| Item | Standard |
|------|----------|
| Version tags | `v{major}.{minor}.{patch}` on main |
| GitHub Releases | Create release notes from CHANGELOG |
| Migration version | Recorded in deploy release metadata |
| Artifact retention | GitHub Actions default (90 days) — configure as needed |

**Current releases on NEXUSEOS/NEXUS-website:** 0

---

## Deployment Validation (Platform)

Mission Control and Connection Orchestrator validate deployment via:

| Check | Endpoint |
|-------|----------|
| GitHub Pages status | `GET /v1/mission-control/github-deployment` |
| Connect GitHub wizard | `GET /v1/mission-control/github-connect-wizard` |
| Ecosystem infrastructure | `GET /v1/mission-control/repository-infrastructure` |
| Managed GitHub service | `GET /v1/connections/github/managed-service` |

### Deployment Status Values

| Status | Meaning |
|--------|---------|
| `not_connected` | No valid GITHUB_TOKEN |
| `repo_empty` | Remote repository has no commits |
| `pages_not_enabled` | Pages API returns 404 |
| `workflow_missing` | No deploy workflow on remote |
| `workflow_running` | Latest run in progress |
| `workflow_failed` | Latest run failed |
| `deployed` | Pages URL returns 200 |
| `live_404` | Pages enabled but URL 404 |
| `degraded` | Partial configuration |

**Current verified status:** `repo_empty` + `pages_not_enabled` + `live_404`

---

## Quality Gates

Before marking deployment **operational**:

- [ ] Website returns HTTP 200 at Pages URL
- [ ] GitHub Actions deploy workflow green on main
- [ ] Supabase secrets configured in Actions
- [ ] Mission Control `githubDeployment.connected === true`
- [ ] Ecosystem audit `summary.pagesLive >= 1`
- [ ] Cloud API health endpoint reachable at production URL

**None of the above are currently satisfied.**

---

## Monitoring & Probes

| Probe | Frequency | Source |
|-------|-----------|--------|
| Pages live URL | On-demand + Mission Control homepage | `probeLiveUrl()` |
| GitHub API repo state | On-demand | `getGitHubDeploymentStatus()` |
| Ecosystem repo audit | On-demand | `auditEcosystemRepositories()` |
| Workflow run status | On-demand | GitHub Actions API |

Future: scheduled automation via `@nexus-cloud/automation-engine` (not in EPIC 70 scope).
