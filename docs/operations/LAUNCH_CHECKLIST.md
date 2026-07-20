# NEXUS Launch Checklist

Pre-launch checklist for production deployment and public beta graduation.

## Quality Gate (Automated)

Run from Command Center **Final Release → Run validation** or:

```bash
curl -X POST https://api.example.com/v1/launch/validation/final-release \
  -H "Authorization: Bearer $TOKEN"
```

All items must pass for `approvedForProductionLaunch: true`.

| Gate | Owner | Automated |
|------|-------|-----------|
| Production deployed | Platform Ops | ✓ |
| Monitoring operational | SRE | ✓ |
| Alerts operational | SRE | ✓ |
| Testing complete | QA | ✓ |
| Security validated | Security | ✓ |
| Public beta approved | Product | ✓ |
| Launch approved | Leadership | ✓ |

## Build & CI

- [ ] `nexus-cloud` CI: lint, typecheck, migrations, integration, Terraform, Docker
- [ ] `nexus-website` CI: lint, build, Lighthouse, Playwright E2E
- [ ] `nexus-studio` CI green
- [ ] `nexus-sdk` and `nexus-platform` build

## Infrastructure

- [ ] DNS records configured (API, website, CDN)
- [ ] SSL certificates valid
- [ ] Supabase project in production tier
- [ ] Database migrations applied (through 0043)
- [ ] Backup job scheduled
- [ ] Restore test passed in last 90 days

## Application

- [ ] `VITE_NEXUS_CLOUD_URL` points to production API
- [ ] Feature flag `finalReleaseGateEnabled` enabled
- [ ] Rate limiting active
- [ ] Audit logging verified
- [ ] Sitemap includes all public routes (52 URLs)

## Testing

- [ ] Playwright E2E: `npm run test:e2e` (website)
- [ ] Integration test: platform hub
- [ ] Load test: `node scripts/load-test.mjs`
- [ ] Accessibility: Lighthouse pre-check
- [ ] Security checklist reviewed

## Documentation

- [ ] Deployment Guide current
- [ ] Production Runbook current
- [ ] Recovery Guide current
- [ ] ADRs 213–216 accepted

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Platform Engineering | | | |
| SRE / Operations | | | |
| Security | | | |
| Product | | | |
| Leadership | | | |

## Post-Launch (24h)

- [ ] Monitor error rates and latency
- [ ] Confirm alerts firing correctly
- [ ] Verify backup completed
- [ ] Status page updated
- [ ] EPIC-55 STOP report archived
