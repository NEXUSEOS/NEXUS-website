# ADR-135: Background Services

## Status
Accepted — PROGRAM ALPHA Phase 2

## Context
NEXUS requires durable background processing: scheduled CMS publishes, search reindex, analytics aggregation, health monitoring, backups.

## Decision
Implement in `@nexus-cloud/platform-administration`:

- **`background_jobs` table** — pending/running/completed/failed with retry and priority
- **`scheduled_jobs` table** — cron expressions seeding CMS, search, analytics, health, backup jobs
- **`createWorkerProcessor`** — claims jobs, executes typed handlers, publishes `job.completed` / `job.failed` events
- **API tick** — `platformAdministration.runTick()` every 60s replaces direct CMS `setInterval`

Worker types: `cms.process_scheduled_publishes`, `cms.process_scheduled_announcements`, `search.reindex_cms`, `analytics.aggregate`, `platform.health_check`, `backup.daily`.

## Consequences
- Job dashboard at `/admin/jobs` and Studio `JobsPanel`
- Failed jobs visible and retryable via API
