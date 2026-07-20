# EPIC 67 — Live Service Activation STOP Report

**Date:** 2026-07-20  
**Status:** Implementation complete — pending credential provisioning for full production activation

## Repository Audit

| Repository | Files scanned | Pattern matches (source) |
|------------|---------------|--------------------------|
| nexus-cloud | ~80 | 101 |
| nexus-studio | ~60 | 217 |
| nexus-website | ~40 | 172 |
| nexus-sdk | ~12 | ~50 (excl. node_modules) |
| nexus-platform | ~6 | ~15 (excl. node_modules) |
| **Ecosystem total** | **198** | **413** |

Patterns: `TODO`, `FIXME`, `placeholder`, `stub`, `demo`, `mock`, `temporary`, `incomplete`, `disabled`

Curated production-relevant items: 8 (see `SERVICE_ACTIVATION_BACKLOG.md`)

## Service Matrix Summary

| Service | Probe | Status (local audit) |
|---------|-------|---------------------|
| GitHub | `github_api` | Credential-dependent |
| GitHub Pages | `github_pages`, `ssl` | URL-dependent |
| Supabase | auth, storage, realtime, RLS | Credential-dependent |
| Cloud API | health, ready | URL-dependent |
| Database | `postgresql_ping` | DATABASE_URL required |
| Storage | `supabase_storage` | Supabase required |
| Realtime | `supabase_realtime` | Supabase required |
| Stripe | `stripe_api` | STRIPE_SECRET_KEY required |
| Stripe Connect | `stripe_connect` | Stripe + Connect account |
| Marketplace Billing | stripe + listings | Stripe + Cloud API |
| Developer Payouts | connect + account ID | STRIPE_CONNECT_ACCOUNT_ID |
| Sponsor Billing | stripe products | Stripe required |
| OpenAI | `openai_api` | OPENAI_API_KEY required |
| Email | SendGrid or Resend | Provider key required |
| Analytics | PostHog | VITE_POSTHOG_KEY required |
| Monitoring | Grafana, Prometheus | URLs required |
| Logging | Sentry DSN format | SENTRY_DSN required |
| CDN / DNS / SSL | Cloudflare + HTTPS | Tokens + URLs required |
| Object Storage | Supabase + registry | Supabase required |

**Total live services:** 21

## Missing Credentials (typical production gap)

Without production secrets configured in the runtime environment, probes honestly report `configuration_required`:

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDFLARE_API_TOKEN`
- `SENDGRID_API_KEY` or `RESEND_API_KEY`
- `VITE_POSTHOG_KEY`, `SENTRY_DSN`, `GRAFANA_URL`
- `GITHUB_TOKEN`

## Production Status

| Component | Status |
|-----------|--------|
| `@nexus-cloud/live-services` package | Implemented |
| Migration `0055_live_services.sql` | Created |
| Feature flag `liveServicesEnabled` | Seeded |
| API `/v1/mission-control/live-services` | Wired |
| API `/v1/live-services/dashboard` | Wired |
| Mission Control composition | Extends EPIC 59/65/66 without duplicating Installation Center |
| Studio `LiveServicesDashboardPanel` | Implemented |
| Launch validation `runLiveServicesValidation()` | Implemented |
| liveProbeEngine extensions | 15+ new probes |

## Activation Checklist

1. Apply migration `0055_live_services.sql`
2. Set production environment variables (see backlog)
3. Run `npm run build` in nexus-cloud
4. Run `npx tsc --noEmit` in nexus-studio
5. POST `/v1/live-services/validate` as platform admin
6. Open Live Services Dashboard in Command Center
7. Resolve items in `SERVICE_ACTIVATION_BACKLOG.md`

## Blockers

1. **External credentials** — Stripe, OpenAI, Supabase production keys not present in local audit environment
2. **Terraform stubs** — TERRAFORM-001 blocks full infra automation
3. **Stripe Connect account** — Developer payouts require `STRIPE_CONNECT_ACCOUNT_ID`

## Files Changed (summary)

- `nexus-cloud/packages/live-services/` (new)
- `nexus-cloud/packages/connection-orchestrator/src/liveProbeEngine.ts`
- `nexus-cloud/packages/mission-control/src/index.ts`
- `nexus-cloud/packages/launch-validation/src/index.ts`
- `nexus-cloud/packages/database/migrations/0055_live_services.sql`
- `nexus-cloud/apps/api/src/routes/live-services.ts`
- `nexus-studio/src/command-center/panels/LiveServicesDashboardPanel.tsx`
- Documentation: ADR-249–252, this report, SERVICE_ACTIVATION_BACKLOG.md
