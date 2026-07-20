# Security Checklist

Use before production launch and quarterly thereafter. Automated run: `POST /v1/command-center/deployment/checklists/security`.

## Secrets & Configuration

- [ ] No secrets committed to git (`.env` gitignored)
- [ ] Production secrets stored in CI/host secret manager
- [ ] `API_KEY_PEPPER` unique per environment
- [ ] `SUPABASE_JWT_SECRET` ≥ 32 characters
- [ ] Database credentials rotated from defaults

## Authentication & Authorization

- [ ] Command Center routes require platform admin
- [ ] SDK scopes enforced on org-scoped routes
- [ ] API keys stored hashed (never plaintext)
- [ ] JWT verification on bearer tokens

## Network & API

- [ ] Rate limiting enabled (200 req/min default)
- [ ] CORS configured appropriately for production origins
- [ ] Health/metrics endpoints excluded from heavy rate limits where needed
- [ ] WebSocket routes authenticated where required

## Data

- [ ] Postgres not exposed publicly without TLS
- [ ] Backups encrypted at rest (storage provider)
- [ ] Audit trail enabled for admin actions
- [ ] PII minimized in logs and traces

## Supply Chain

- [ ] CI runs on every PR
- [ ] Dependencies pinned via lockfiles
- [ ] Container runs as non-root user
- [ ] Docker images scanned before deploy (recommended)

## Incident Response

- [ ] Alert manager configured
- [ ] Incident manager runbook accessible
- [ ] DR plan tested within RPO/RTO targets
- [ ] Rollback procedure documented and tested

## Sign-off

| Role | Name | Date |
|------|------|------|
| Security reviewer | | |
| Platform admin | | |
