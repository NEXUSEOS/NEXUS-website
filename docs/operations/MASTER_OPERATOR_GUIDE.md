# Master Operator Guide

Day-to-day operational procedures for NEXUS platform operators.

## Operator Responsibilities

| Frequency | Task | Panel / Command |
|-----------|------|-----------------|
| Daily | Review platform health | Mission Control |
| Daily | Check open alerts | Production Reliability, Issue Dashboard |
| Daily | Monitor background jobs | Jobs panel |
| Weekly | Run production certification | Production Certification |
| Weekly | Verify backups | Backup Center |
| Per release | Final release validation | Final Release |
| Per release | Production activation audit | Production Readiness Dashboard |
| Incident | Triage and respond | Incident Center, Repair Center |

## Connecting to Operations

1. Open NEXUS Studio → Command Center
2. Enter Cloud API URL
3. Authenticate via Supabase (platform admin)
4. Click **Connect**

## Health Monitoring

### Mission Control Scores

| Score | Healthy | Degraded | Critical |
|-------|---------|----------|----------|
| Platform Health | ≥90 | ≥70 | <70 |
| Connection Health | ≥90 | ≥70 | <70 |
| Launch Readiness | ≥95 | ≥90 | <90 |
| Production Readiness | 100 (all steps) | partial | failing |

### Live Probes

Configured via environment variables:

- `NEXUS_CLOUD_URL` / `CLOUD_URL` — Cloud API probes
- `WEBSITE_URL` / `VITE_WEBSITE_URL` — Website probes
- `SUPABASE_URL` — Auth health probe
- `STRIPE_SECRET_KEY` — Billing probe

Run live validation: `POST /v1/launch/validation/live-platform`

## Automation Engine (EPIC 60)

Scheduled jobs include daily launch validation at 11:00 UTC.

| Job | Handler | Schedule |
|-----|---------|----------|
| launch_validation | `launchValidation.runFullValidation` | Daily 11:00 |
| connection_health | validate-all | Configurable |
| backup_verification | restore-test | Weekly |

Panels: Automation Dashboard, Automation Jobs, Maintenance Calendar, Repair Center, Optimization Center

## Incident Response

1. Alert detected → Incident Center
2. Assess severity via Mission Control action center
3. One-click repair via Connection Center or Repair Center
4. If data issue → follow [MASTER_RECOVERY_GUIDE.md](./MASTER_RECOVERY_GUIDE.md)
5. Post-incident: update beta_known_issues, run certification

## Load Testing

```bash
cd nexus-cloud
node scripts/load-test.mjs
```

## Backup Verification

```bash
cd nexus-cloud
node scripts/backup-db.mjs      # Create backup
node scripts/restore-test.mjs   # Verify restore
```

## Certification Score Interpretation

| Score Range | Status | Action |
|-------------|--------|--------|
| ≥95% | GO eligible | Proceed with launch approval |
| 90–94% | Review | Address failing journeys/components |
| <90% | NO-GO | Block launch, resolve critical items |

Score weights: ecosystem 25%, E2E 25%, static 30%, live 20%.

## Related Documents

- [MASTER_ADMIN_GUIDE.md](./MASTER_ADMIN_GUIDE.md)
- [PRODUCTION_RUNBOOK.md](./PRODUCTION_RUNBOOK.md)
- [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
