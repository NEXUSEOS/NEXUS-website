# ADR-136: Event Bus Architecture

## Status
Accepted — PROGRAM ALPHA Phase 2

## Context
All NEXUS modules must publish and subscribe to platform events (user created, CMS published, deployment complete, etc.) through one shared bus.

## Decision
Extend Phase 1 `platform_events` with subscription model:

- **`event_subscriptions`** — module subscribers with handler routes
- **`createEventBusService`** — publish persists event, notifies subscribers, broadcasts via existing WebSocket fan-out
- **Standard event types** — 20 canonical types in `PLATFORM_EVENT_TYPES`
- **Activity timeline** — unified feed from events table
- **API**: `GET/POST /v1/platform-admin/events`, subscriptions CRUD

Existing `/v1/platform/events` and WebSocket remain for backward compatibility; admin bus adds subscription metadata and timeline.

## Consequences
- Cross-module reactions (e.g. CMS publish → search reindex subscription) declared in database
- Event monitor at `/admin/events` and Studio `EventsPanel`
