# Supabase Production Guide

EPIC 62 — Wire Supabase production services via connection orchestrator.

## Services

| Service | Env vars | Connection ID |
|---------|----------|---------------|
| Auth | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | `supabase-auth` |
| Database | `DATABASE_URL` (Supabase Postgres) | `postgresql` |
| Storage | `SUPABASE_URL`, service role key | `supabase-storage` |
| Realtime | `SUPABASE_URL`, anon key | `supabase-realtime` |
| Edge Functions | Deploy via Supabase CLI | `supabase-edge` |

## Setup

1. Create production Supabase project
2. Run nexus-cloud migrations: `npm run db:migrate` (includes `0050_live_platform_activation.sql`)
3. Configure secrets in GitHub Actions / production host
4. Register credentials in Connection Center (nexus-studio) or via API:

```http
PUT /v1/connections/supabase-auth/credentials
POST /v1/connections/supabase-auth/validate
```

## Client (website)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client builds.

## Validation

- Live probe: `live_supabase_auth` in launch-validation
- Connection orchestrator: `validateAllProductionConnections()`
- Health domain: Mission Control → Live Activation → `auth`, `database`, `storage`, `realtime`

## Backups

Use `nexus-cloud/scripts/backup-db.mjs` against production `DATABASE_URL`.
Verify with `scripts/restore-test.mjs`.

## Related

- [CONNECTION_ORCHESTRATOR_GUIDE.md](./CONNECTION_ORCHESTRATOR_GUIDE.md)
- [PRODUCTION_ENV_TEMPLATE.md](./PRODUCTION_ENV_TEMPLATE.md)
