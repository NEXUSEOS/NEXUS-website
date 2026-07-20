# ADR-127: Launch Operations

## Status
Accepted — EPIC 33

## Context
Public launch requires deployment automation verification, backup validation, load/pen test tracking, demo environments, status page administration, and a formal launch approval workflow.

## Decision
Implement `createLaunchOpsService` in `@nexus-cloud/enterprise-security`:

- **Launch approval**: `launch_approvals` with checklist + security score gates (≥90%)
- **Backup verification**: `launch_backup_verifications`
- **Load/pen tests**: `launch_load_tests`, `launch_pen_tests`
- **Incident bridge**: `launch_incident_links` connects `ops_incidents` → `launch_public_incidents`
- **Status page admin**: publish/resolve public incidents, update status components
- **Platform readiness**: aggregates connection orchestrator checklist + launch-validation score + security checklist
- **API**: `/v1/launch-ops/*`

Reuses existing `launch_demo_environments` from migration 0016 for sponsor/developer/customer demos.

Command Center: Launch Operations, Deployment Center, Incident Center, Status Center.

## Consequences
- Launch gate requires security score, checklist score, and verified backup
- Ops incidents can be published to public status page via bridge API
- Launch approval auto-grants when scores meet threshold
