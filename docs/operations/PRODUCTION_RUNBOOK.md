# NEXUS Production Runbook

Day-to-day operations for production NEXUS Cloud and website.

## On-call Quick Reference

| Symptom | First action | Panel |
|---------|--------------|-------|
| 5xx spike | Check `/v1/health`, review logs | Production Dashboard |
| DB connectivity | Verify Postgres, connection pool | System Health |
| Auth failures | Check Supabase status, JWT secret | Security Center |
| Deploy failure | Rollback via CD or Deployment Center | Deployment Center |
| Alert fired | Acknowledge in Incident Center | Incident Center |

## Health Checks

```bash
# Liveness
curl -s https://api.example.com/v1/health | jq .

# Readiness (includes DB, migrations)
curl -s https://api.example.com/v1/ready | jq .
```

Expected: `status: "ok"`, readiness `score >= 90`.

## Monitoring

- **Metrics**: Prometheus registry in `@nexus-cloud/observability`
- **Traces**: Distributed tracing via observability package
- **Dashboards**: Command Center → Production Dashboard, Production Reliability
- **Alerts**: Evaluate via `POST /v1/command-center/production/alerts/evaluate`

### Key Metrics

- API request rate and p95 latency
- 5xx error rate (< 0.1% target)
- Database connection pool utilization
- Background job queue depth

## Logging

- Structured JSON logs from Fastify API
- Audit logs: `GET /v1/command-center/audit-logs`
- CMS audit: `GET /v1/command-center/cms-audit`

## Backups

Scheduled: daily via `scripts/backup-db.mjs` (or managed Postgres PITR).

Manual backup:

```bash
cd nexus-cloud
node scripts/backup-db.mjs
```

Verify restore quarterly:

```bash
node scripts/restore-test.mjs
```

## Releases

1. Merge to `main` triggers CD pipeline
2. Release recorded in deployment service
3. Migration runs automatically
4. Canary optional via Production Reliability panel
5. Final Release validation must pass before launch approval

## Scaling

- API: horizontal scale behind load balancer (stateless)
- Database: read replicas for analytics queries
- CDN: cache static website assets with long TTL

## Security Operations

- Rotate `API_KEY_PEPPER` and Supabase secrets on schedule
- Review audit logs weekly
- Run security validation: `POST /v1/launch/validation/run`

## Escalation

1. On-call engineer (15 min)
2. Platform lead (30 min)
3. Incident commander for SEV-1

See [RECOVERY_GUIDE.md](./RECOVERY_GUIDE.md) for disaster recovery procedures.
