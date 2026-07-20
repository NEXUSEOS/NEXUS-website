# ADR-133: Platform Administration

## Status
Accepted — PROGRAM ALPHA Phase 2

## Context
Phase 1 delivered setup wizard and platform operations. Phase 2 requires a complete Platform Administration system operable from browser (`/admin`) and Studio Command Center without editing configuration files.

## Decision
Introduce `@nexus-cloud/platform-administration` with:

- **Configuration Registry** — versioned CRUD over `platform_config` + `platform_config_versions`
- **Service Registry** — self-registering modules with routes, commands, metrics, permissions
- **Event Bus** — durable `platform_events` + `event_subscriptions` + WebSocket broadcast
- **Job Queue** — `background_jobs` with claim/complete/fail/retry workers
- **Scheduler** — `scheduled_jobs` with cron tick enqueuing worker jobs
- **Secrets Manager** — `secret_registry` synced from Connection Orchestrator vault inventory
- **Admin Dashboard** — expanded metrics: health score, security score, service status, alerts
- **API**: `/v1/platform-admin/*`

Website: `/admin` Platform Control Center with Liquid Glass `AdminLayout`. Studio: matching panels calling same APIs.

## Consequences
- CMS scheduled publish moved from ad-hoc `setInterval` to scheduler + job queue
- No duplicate admin logic — website and Studio share Cloud APIs
