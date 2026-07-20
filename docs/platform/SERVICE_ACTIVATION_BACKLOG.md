# Service Activation Backlog

Items requiring external providers, credentials, or infrastructure wiring. **Do not fake these in production.**

Generated during EPIC 67 repository audit. See `packages/live-services/src/serviceInventory.ts` for the machine-readable inventory.

## External Provider Credentials Required

| Service | Environment Variables | Blocker |
|---------|---------------------|---------|
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY` | Marketplace billing, sponsor billing |
| Stripe Connect | `STRIPE_CONNECT_ACCOUNT_ID` | Developer payouts |
| OpenAI | `OPENAI_API_KEY` | AI services (falls back to `nexus-stub` without key) |
| Anthropic | `ANTHROPIC_API_KEY` | Claude routing |
| Supabase | `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_ANON_KEY` | Auth, storage, realtime |
| SendGrid / Resend | `SENDGRID_API_KEY` or `RESEND_API_KEY` | Transactional email |
| PostHog | `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` | Product analytics |
| Sentry | `SENTRY_DSN` | Error logging |
| Grafana | `GRAFANA_URL`, `GRAFANA_API_KEY` | Monitoring dashboards |
| Cloudflare | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID` | CDN, DNS, SSL |
| GitHub | `GITHUB_TOKEN` | CI/CD and container registry |

## Production Blockers (Code / Infra)

| ID | Item | Resolution |
|----|------|------------|
| TERRAFORM-001 | Terraform modules are foundation stubs | Wire modules for target cloud (`infra/terraform/`) |
| audit-stripe-connect-placeholder | `acct_placeholder` fallback in stripe.ts | Set real Connect account ID |
| audit-intelligence-stub | `nexus-stub` AI provider | Configure OpenAI or Anthropic API keys |

## Acceptable Dev-Only Items

| Item | Location | Notes |
|------|----------|-------|
| Simulation stub runtime | `nexus-studio/src/simulation/stubRuntime.ts` | Studio offline mode only |
| Demo environment seeds | `0029_public_beta_atlas_alpha.sql` | `.local` URLs for demos |
| Vision SDK offline fallback | `nexus-sdk/packages/vision/` | Client-side degradation |

## Activation Checklist

- [ ] Configure all required env vars in production secrets store
- [ ] Run `POST /v1/live-services/validate` from Mission Control
- [ ] Verify health matrix ≥ 80% connected in Live Services Dashboard
- [ ] Confirm Stripe balance probe passes (billing live)
- [ ] Confirm Supabase auth + storage + realtime probes pass
- [ ] Confirm GitHub Pages and Cloud API HTTPS probes pass
- [ ] Review failing quality gates in Production Readiness Dashboard (composed, not duplicated)

## Related Documentation

- [EPIC-67-STOP-REPORT.md](./EPIC-67-STOP-REPORT.md)
- ADR-249 through ADR-252 in `nexus-specifications/docs/adr/`
- Connection Orchestrator guide: `docs/operations/CONNECTION_ORCHESTRATOR_GUIDE.md`
