# ADR-130: Live Infrastructure

## Status
Accepted — PROGRAM ALPHA Phase 1

## Context
Every major NEXUS system must communicate through real services with self-validating connections declaring health, latency, diagnostics, and recovery steps.

## Decision
Extend the Connection Orchestrator integration via platform module sync:

- Each module declares: name, description, environment variables, dependencies, capabilities, required/optional features, recovery steps
- `syncModuleRegistry()` overlays Connection Orchestrator dashboard status onto `platform_module_registrations`
- Health dimensions: online/offline, latency, authentication, database, storage, API, errors, warnings, version, last successful check
- Startup validation aggregates orchestrator checklist, integration health, identity inventory, and Command Center counts

## Consequences
- Modules without `connectionServiceId` register as connected when present in ecosystem definition
- Recovery steps surfaced in Platform Operations UI diagnostics column
