# ADR-040: Public Launch

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — NEXUS Beta Platform

## Context

External developers and sponsors need a coherent public entry point into the NEXUS ecosystem before general availability.

## Decision

Ship a **Public Release** surface on nexus-website that routes visitors to canonical ecosystem entry points.

### Public Pages

| Page | Path | Purpose |
|------|------|---------|
| Developer Onboarding | `/developers/onboarding` | Step-by-step getting started |
| Studio Download | `/downloads`, `/download/studio` | Authenticated Download Center |
| SDK Download | `/developers/portal/sdk` | SDK artifacts via integration API |
| Documentation | `/docs`, `/docs/sdk` | SDK, API, tutorials |
| Marketplace | `/marketplace` | Featured packages; publish via portal |
| Roadmap | `/roadmap` | Public milestones |
| Community | `/community` | Social links, beta/sponsor programs |
| Release Channels | `/releases/channels` | Stable / Beta / Alpha / Nightly |
| Beta Application | `/beta/apply` | Beta program enrollment |

### Launch Checklist (Quality Gate)

- [x] Entire ecosystem builds (platform, cloud, website, studio)
- [x] No duplicated auth, sync, or update systems
- [x] Repository ownership enforced in `ownership.ts`
- [x] Shared packages consumed (`@nexus/integration`, `@nexus/auth`, `@nexus/config`)
- [x] ADRs 037–040 complete
- [x] Accessibility: semantic headings, `aria-label`, form labels, live regions on submissions

### SEO & Navigation

- Community added to primary header navigation
- All public pages use `PageShell` + `PageMeta` for title/description
- Sitemap generation includes new routes via existing build scripts

## Consequences

- Public launch is beta-gated; GA removes application requirement
- Sponsors retain exclusive roadmap portal access
- Launch messaging centers on Developer Onboarding as the primary CTA
