# ADR-037: Beta Program

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — NEXUS Beta Platform

## Context

NEXUS is ready for external developers and sponsors. A structured beta program is required for access control, feedback collection, and operational visibility without duplicating auth or analytics systems.

## Decision

Launch the **NEXUS Beta Program** as a Cloud-backed service with Website portal UI.

### Architecture

| Layer | Owner | Responsibility |
|-------|-------|----------------|
| Contracts | `@nexus/integration` (`beta.ts`) | DTOs, release channels, client methods |
| Backend | `@nexus-cloud/beta` | Applications, invitations, feedback, bugs, crashes, sponsor records |
| UI | `nexus-website` | Beta Dashboard, forms, public onboarding |
| Producer | `nexus-studio` | Crash ingestion via `@nexus/integration` |

### Beta Features

- **Application System** — developers apply; status tracked in `beta_applications`
- **Developer Invitations** — org admins invite by email with expiring tokens
- **Feedback Center** — categorized feedback with ratings
- **Bug Reporting** — severity-classified reports from Website and Studio
- **Crash Analytics** — fingerprint-grouped crashes from Studio/OS
- **Sponsor Dashboard** — partnership status from `sponsor_records`

### Non-Duplication Rules

- Auth: existing `@nexus/auth` (Supabase) — no separate beta login
- Portal analytics: `@nexus/analytics` for website events; beta tables for program data
- Updates: canonical `platform_updates` table — beta program reads, does not duplicate

## Consequences

- Beta access is application-gated; approval workflow can be extended post-launch
- All beta HTTP routes live under `/v1/beta/*`
- Studio installs global crash handler at startup
