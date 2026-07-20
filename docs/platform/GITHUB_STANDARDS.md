# GitHub Standards — NEXUS Ecosystem

**Protocol:** Nexus Engineering Protocol v6.0 Phase 12  
**Applies to:** All NEXUSEOS ecosystem repositories

---

## Repository Naming

| Local workspace | Recommended GitHub name | Current status |
|-----------------|---------------------------|----------------|
| nexus-website | `NEXUSEOS/NEXUS-website` | Exists (empty) |
| nexus-cloud | `NEXUSEOS/nexus-cloud` | **Not created** |
| nexus-studio | `NEXUSEOS/nexus-studio` | **Not created** |
| nexus-sdk | `NEXUSEOS/nexus-sdk` | **Not created** |
| nexus-platform | `NEXUSEOS/nexus-platform` | **Not created** |
| nexus-os | `NEXUSEOS/nexus-os` | **Not created** |
| nexus-specifications | `NEXUSEOS/nexus-specifications` | **Not created** |

Use consistent casing. Website repo uses `NEXUS-website` (legacy); new repos should use lowercase kebab-case unless org policy dictates otherwise.

---

## Required Repository Files

Every production repository MUST include:

| File | Purpose | Current ecosystem compliance |
|------|---------|------------------------------|
| `README.md` | Project overview, setup, links | 7/7 local |
| `LICENSE` | SPDX license (recommend MIT or Apache-2.0) | 0/7 |
| `CONTRIBUTING.md` | Contribution guidelines | 0/7 |
| `SECURITY.md` | Vulnerability reporting | 0/7 |
| `CHANGELOG.md` | Semantic version history | 0/7 |
| `.github/CODEOWNERS` | Review ownership | 0/7 |
| `.github/pull_request_template.md` | PR checklist | 0/7 |
| `.github/ISSUE_TEMPLATE/` | Bug/feature templates | 0/7 |

---

## Branch Strategy

| Setting | Standard |
|---------|----------|
| Default branch | `main` |
| Branch protection | Required on `main` for production repos |
| Required checks | CI workflow must pass |
| Signed commits | Recommended |
| Direct push to main | Disallow after initial bootstrap |

**Current state:** No branch protection verifiable — NEXUS-website has no branches on remote.

---

## Semantic Versioning

| Repo | Current version | CHANGELOG |
|------|-----------------|-----------|
| nexus-website | 0.2.0 | Missing |
| nexus-cloud | 0.1.0 | Missing |
| nexus-studio | 0.1.0-alpha | Missing |
| nexus-sdk | 0.1.0 | Missing |
| nexus-platform | 0.1.0 | Missing |
| nexus-os | 0.1.0-alpha | Missing |

Follow [SemVer 2.0](https://semver.org/). Tag releases as `v{major}.{minor}.{patch}`.

---

## Repository Metadata

| Field | Standard | NEXUS-website current |
|-------|----------|----------------------|
| Description | One-line project summary | null |
| Topics | `nexus`, `robotics`, product-specific tags | [] |
| Homepage | Live URL or docs link | null |
| Discussions | Enable for community repos | Disabled |
| Wiki | Disabled (use docs/) | Disabled |
| Issues | Enabled | Enabled |
| Projects | Optional | Enabled |

**Community health score (NEXUS-website):** 0% — no README, LICENSE, CONTRIBUTING, SECURITY, or templates on remote.

---

## Labels & Milestones

NEXUS-website has 9 default GitHub labels (bug, documentation, duplicate, enhancement, good first issue, help wanted, invalid, question, wontfix).

**Recommended additional labels:**

- `epic`, `blocked`, `security`, `deployment`, `breaking-change`
- Priority: `P0-critical`, `P1-high`, `P2-medium`, `P3-low`

**Milestones:** None configured. Align with EPIC numbering in Nexus Engineering Protocol.

---

## GitHub Actions Standards

| Requirement | Detail |
|-------------|--------|
| CI on every PR | Required |
| CD on main merge | Required for deployable services |
| Workflow permissions | `contents: read`, add `pages: write` + `id-token: write` for Pages |
| Concurrency | Use concurrency groups for deploy workflows |
| Secrets | Repository or environment secrets — never in workflow files |
| Pin actions | Use version tags (`@v4`) not `@main` |

---

## Access & Security

| Item | Standard |
|------|----------|
| Visibility | Public for open-source ecosystem; private for credentials/internal |
| PAT scopes | `repo`, `workflow`, `read:org` minimum for deployment automation |
| Dependabot | Enable for npm/Rust/Go ecosystems |
| Secret scanning | Enable on all public repos |
| CODEOWNERS | Require review from platform team for infra changes |

---

## Organization Standards (NEXUSEOS)

| Item | Status |
|------|--------|
| Org exists | Yes |
| Public repos | 1 |
| SSO/SAML | Not verified |
| Team permissions | Not verified (token invalid) |

---

## Compliance Scorecard

| Repo | GitHub exists | Standards | CI | CD | Pages | Score |
|------|---------------|-----------|----|----|-------|-------|
| nexus-website | Yes (empty) | Partial local | Local | Local | Blocked | ~15% |
| nexus-cloud | No | Minimal | Local | Local | N/A | ~10% |
| nexus-studio | No | Minimal | Local | — | N/A | ~8% |
| nexus-sdk | No | Minimal | — | — | N/A | ~5% |
| nexus-platform | No | Minimal | Local | — | N/A | ~8% |
| nexus-os | No | Minimal | — | — | N/A | ~5% |
| nexus-specifications | No | Minimal | — | — | N/A | ~3% |

**Target:** 80%+ before marking repository infrastructure operational.
