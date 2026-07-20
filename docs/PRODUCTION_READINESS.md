# Production Readiness Checklist

Use before promoting NEXUS Cloud to production. Automated run: `POST /v1/command-center/deployment/checklists/production-readiness`.

## Build & CI

- [ ] `nexus-cloud` CI green on target commit (lint, typecheck, migrations, integration tests)
- [ ] `nexus-platform`, `nexus-studio`, `nexus-website` CI green
- [ ] Docker image builds successfully
- [ ] Terraform validates (`infra/terraform`)

## Database

- [ ] Migrations applied on staging (`npm run db:migrate`)
- [ ] Backup snapshot created (`scripts/backup-db.mjs`)
- [ ] Restore test passed (`scripts/restore-test.mjs`)
- [ ] Rollback plan documented for latest migration

## API & Security

- [ ] `/v1/health` returns healthy on staging
- [ ] Rate limiting enabled
- [ ] Audit logs persisting
- [ ] `SUPABASE_JWT_SECRET` and `API_KEY_PEPPER` set in production secrets
- [ ] Security checklist passed

## Deployment

- [ ] Release recorded via Command Center or CD workflow
- [ ] `VITE_NEXUS_CLOUD_URL` set for website production build
- [ ] Preview deployment workflow tested on a sample PR
- [ ] Rollback workflow tested in staging

## Observability

- [ ] Enterprise ops dashboards receiving traces and logs
- [ ] Alerts configured for 5xx rate and DB connectivity
- [ ] Cost dashboard reviewed

## Sign-off

| Role | Name | Date |
|------|------|------|
| Platform admin | | |
| Engineering lead | | |
