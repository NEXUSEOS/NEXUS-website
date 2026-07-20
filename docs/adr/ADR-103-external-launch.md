# ADR-103: External Launch Completion

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 26 — External Launch

## Decision

Complete external launch with migration `0015_external_launch`, package `@nexus-cloud/launch`, public API routes under `/v1/launch/*`, and website surfaces for onboarding, support, community, and status.

### Delivered

| Capability | Implementation |
|------------|----------------|
| Developer Onboarding | Cloud-tracked progress at `/developers/onboarding` |
| Sponsor Onboarding | 5-step path at `/sponsors/onboarding` |
| Interactive Tutorials | Existing Developer Portal tutorials (EPIC 22) linked from Support |
| Welcome Tours | `WelcomeTour` overlay + `launch_welcome_tour_steps` |
| Knowledge Base | `/support/knowledge` + searchable `launch_kb_articles` |
| Support Center | `/support` hub |
| Community Portal | Enhanced `/community` with forum integrations |
| Forum Integration | GitHub Discussions + internal links in `launch_forum_integrations` |
| Feedback Portal | `/support/feedback` → `POST /v1/launch/feedback` |
| Issue Tracking | `/support/issues` + `launch_issues` |
| Release Notes | Static content + `GET /v1/launch/releases` from `platform_updates` |
| Status Page | `/status` + `launch_status_components` / public incidents |
| Launch Checklist | `/launch/checklist` + automated external launch checklist |
| Beta Invitations | Existing beta stack linked from launch overview |

Non-duplication: beta feedback/bugs remain in `@nexus-cloud/beta`; launch layer adds tickets, KB, status, and onboarding progress without forking auth.

## Consequences

External users can onboard via documented paths with persisted progress, self-serve support, and public status. Quality gate: external launch checklist must score ≥90% before GA.

*Related: ADR-037, ADR-040, ADR-099, ADR-102*
