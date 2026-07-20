# Master Recovery Guide

Consolidated disaster recovery procedures from EPIC 55 final release, EPIC 56 live infrastructure, and EPIC 60 automation engine recovery actions.

## Recovery Objectives

| Metric | Target | Source |
|--------|--------|--------|
| RPO (Recovery Point Objective) | 24 hours | Daily backups via `scripts/backup-db.mjs` |
| RTO (Recovery Time Objective) | 4 hours | Docker rollback + DNS failover |

## Backup Inventory

| Asset | Method | Location |
|-------|--------|----------|
| Database | `scripts/backup-db.mjs` | Supabase PITR + manual snapshots |
| Storage | Supabase Storage replication | Supabase dashboard |
| Configuration | GitHub Actions secrets / vault | GitHub repo settings |
| Website | Git rebuild from git tag | nexus-website CI |
| Infrastructure | Terraform state | `infra/terraform/` |
| Certification runs | `production_certification_runs` table | Postgres |

## Recovery Automation (EPIC 60)

API: `POST /v1/automation/recovery`

Studio panels: Disaster Recovery Center, Repair Center, Backup Center

Artifact checks validated in E2E recovery journey:
- `docs/runbooks/disaster-recovery.md`
- DisasterRecoveryCenterPanel
- Automation recovery API route

## Scenario: Complete Region Failure

1. Provision standby region (Terraform: `infra/terraform/modules/dns`, `monitoring`, `secrets`)
2. Restore database from latest backup or Supabase PITR
3. Deploy API: `docker compose -f docker-compose.prod.yml up -d`
4. Redeploy website from git tag
5. Update DNS (Cloudflare module)
6. Run validate-all: `POST /v1/connections/validate-all`
7. Run production certification to confirm GO

## Scenario: Database Corruption

1. Stop write traffic (maintenance mode)
2. Identify corruption window from audit logs (`connection_audit_events`)
3. Restore DB: `node scripts/restore-test.mjs`
4. Replay safe migrations: `npm run db:migrate`
5. Validate: `/v1/ready`, production certification

## Scenario: Credential Compromise

1. Rotate: `SUPABASE_JWT_SECRET`, `API_KEY_PEPPER`, Supabase service keys
2. Invalidate sessions
3. Re-issue API keys via API Keys panel
4. Update GitHub Actions secrets
5. Run connection audit: `GET /v1/production-activation/connection-audit`

## Scenario: Failed Deployment

```bash
# Rollback Cloud API
gh workflow run rollback.yml -f release=<previous-version>

# Or manual Docker rollback
docker pull nexus-cloud-api:<previous-tag>
docker compose -f docker-compose.prod.yml up -d
```

## Scenario: Website Outage

```bash
git checkout v<previous-tag>
cd nexus-website && npm ci && npm run build:pages
# Redeploy via GitHub Actions deploy.yml
```

## Post-Recovery Validation

1. Health probes: `/v1/health`, `/v1/ready`
2. Live platform validation: `POST /v1/launch/validation/live-platform`
3. Production certification: `POST /v1/launch/validation/certification/production/run`
4. Connection validate-all
5. Load test: `node scripts/load-test.mjs`

## Runbooks

| Document | Location |
|----------|----------|
| Disaster recovery | `nexus-cloud/docs/runbooks/disaster-recovery.md` |
| Recovery guide | `nexus-website/docs/operations/RECOVERY_GUIDE.md` |
| Production runbook | `nexus-website/docs/operations/PRODUCTION_RUNBOOK.md` |

## Related Documents

- [MASTER_DEPLOYMENT_GUIDE.md](./MASTER_DEPLOYMENT_GUIDE.md)
- ADR-220 (Disaster Recovery), ADR-255 (Recovery Certification)
