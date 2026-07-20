# NEXUS Recovery Guide

Disaster recovery and backup restore procedures for NEXUS production.

## Recovery Objectives

| Metric | Target |
|--------|--------|
| RPO (Recovery Point Objective) | 24 hours (daily backups) |
| RTO (Recovery Time Objective) | 4 hours |

## Backup Strategy

- **Database**: Daily snapshots via `scripts/backup-db.mjs` or Supabase PITR
- **Storage**: Supabase Storage bucket replication (configure in Supabase dashboard)
- **Configuration**: Secrets in GitHub Actions / vault; infra in Terraform stubs
- **Website**: Static build artifacts reproducible from git

## Restore Database

### From backup script snapshot

```bash
cd nexus-cloud
# Restore to staging first
DATABASE_URL=postgres://... node scripts/restore-test.mjs
```

### From Supabase PITR

1. Open Supabase dashboard → Database → Backups
2. Select point-in-time before incident
3. Restore to new project or in-place
4. Update `DATABASE_URL` in deployment secrets
5. Restart API containers

## Restore API Service

```bash
# Roll back to previous Docker image
docker pull nexus-cloud-api:<previous-tag>
docker compose -f docker-compose.prod.yml up -d

# Or trigger GitHub Actions rollback workflow
gh workflow run rollback.yml -f release=<previous-version>
```

## Restore Website

Redeploy previous static build from CI artifacts or rebuild from git tag:

```bash
git checkout v1.x.x
cd nexus-website && npm ci && npm run build
# Deploy dist/ to CDN
```

## Disaster Scenarios

### Complete region failure

1. Provision standby region (Terraform foundation in `infra/terraform`)
2. Restore database from latest backup
3. Deploy API from container registry
4. Update DNS to standby endpoints
5. Invalidate CDN cache

### Data corruption

1. Stop write traffic (maintenance mode)
2. Identify corruption window from audit logs
3. Restore DB to last known good snapshot
4. Replay safe migrations if needed
5. Validate with `restore-test.mjs` and `/v1/ready`

### Credential compromise

1. Rotate `SUPABASE_JWT_SECRET`, `API_KEY_PEPPER`, Supabase service keys
2. Invalidate all active sessions
3. Re-issue API keys for integrators
4. Review audit logs for unauthorized access

## Verification After Recovery

```bash
curl https://api.example.com/v1/health
curl https://api.example.com/v1/ready
cd nexus-cloud && node scripts/validate-launch.mjs
```

Command Center: Final Release → Run validation → confirm launch gate.

## Runbook Reference

Detailed DR steps: `nexus-cloud/docs/runbooks/disaster-recovery.md`

## Post-Incident

1. Document timeline in Incident Center
2. Update runbooks with lessons learned
3. Schedule restore drill if RTO exceeded
