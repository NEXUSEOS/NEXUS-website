# ADR-091: Platform Events and WebSocket

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 — Full Platform Integration

## Context

Platform notifications and CMS publish events had no real-time delivery path. Studio Command Center required manual refresh after administrative changes.

## Decision

Implement **platform events** with PostgreSQL persistence and WebSocket fan-out:

1. `platform_events` table stores all events (org-scoped, typed payload)
2. `POST /v1/platform/events` publishes and broadcasts
3. `GET /v1/platform/events/ws` WebSocket gateway (`@fastify/websocket`)
4. Clients filter by `organizationId` query param
5. Heartbeat via `{ type: 'ping' }` / `{ type: 'pong' }`

Event types include: `cms.published`, `feature_flag.updated`, `deployment.status`, `platform.notification`

Studio Command Center subscribes on connect and triggers refresh on incoming events.

## Consequences

- Live Command Center updates without polling
- Foundation for robot telemetry and deployment status streams
- Events are auditable via database history

*Related: ADR-089, ADR-092*
