# ADR-110: Connection Orchestrator (Production)

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 30 — Unified Nexus Experience

## Decision

Production Connection Orchestrator in `@nexus-cloud/connection-orchestrator` registers **38+ integrations** (core + extended registry). Command Center **Connections Workspace** displays Nexus Glass connection cards via `@nexus/ui/ConnectionCard`.

Every connector declares credentials, dependencies, validation methods, setup wizard, health check, and blocked features. Secrets vault stores env var key references only.

Studio `ConnectionsWorkspacePanel` is the dedicated operator surface; `platformConnectionService` delegates health to orchestrator dashboard.

## Consequences

- Extended registry: Gemini, Resend, AWS, Azure, GCP, Isaac Sim, Gazebo, MuJoCo, PyBullet, Twilio, Discord, Slack, Google Drive, Firebase, Vercel, Netlify, Prometheus
- API unchanged at `/v1/connections/*`
- No service-specific connection setup outside orchestrator

*Related: ADR-111 (EPIC 29), ADR-114*
