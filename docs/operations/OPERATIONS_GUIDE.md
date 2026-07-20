# NEXUS Operations Guide

Operational procedures for platform administrators using NEXUS Command Center.

## Command Center Overview

Studio Command Center connects to NEXUS Cloud and provides operator panels:

| Panel | Purpose |
|-------|---------|
| Production Dashboard | Unified deployment, health, launch status |
| Deployment Center | Releases, migrations, previews, backups |
| Production Reliability | Monitoring, alerts, canary, DR |
| Final Release | Quality gate, go/no-go, launch approval |
| Incident Center | Active incidents and response |
| Release Center | Version management and changelogs |
| Integration Dashboard | Ecosystem connection health |

## Connecting Command Center

1. Open NEXUS Studio → Command Center
2. Enter Cloud API URL (e.g. `https://api.example.com`)
3. Sign in via Supabase auth (platform admin role required)
4. Click **Connect**

## Routine Operations

### Daily

- Review Production Dashboard service health
- Check open alerts in Production Reliability
- Scan audit logs for anomalies

### Weekly

- Run Final Release validation
- Review open issues in launch report
- Verify backup snapshot exists

### Per Release

1. Confirm CI green on all repos
2. Run migrations on staging
3. Execute load test: `node scripts/load-test.mjs`
4. Deploy via CD or manual Docker
5. Run Final Release → **Run validation**
6. Confirm go/no-go checklist all green

## Feature Flags

Managed via Feature Flags panel and `feature_flags` table. EPIC 55 adds `finalReleaseGateEnabled` for production launch gating.

## Demo Environments

Launch validation maintains demo environments for public beta and sales demos. Manage via Demo Management panel.

## Load Testing

```bash
cd nexus-cloud
node scripts/load-test.mjs
```

Target: p95 < 500ms at expected peak RPS.

## Accessibility & SEO

Website CI runs Lighthouse pre-check (`npm run lighthouse`) validating sitemap, robots.txt, meta tags, and RSS.

## Support Workflow

1. User report → Support Dashboard
2. Triage → Incident Center if production-impacting
3. Post-incident review documented in audit log

## Related Documents

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [PRODUCTION_RUNBOOK.md](./PRODUCTION_RUNBOOK.md)
- [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
