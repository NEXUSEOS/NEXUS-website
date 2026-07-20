# Master Admin Guide

Platform administrator workflows for NEXUS production operations.

## Administrator Roles

| Role | Access | Gate |
|------|--------|------|
| Platform Admin | Command Center, Mission Control, all ops panels | `requirePlatformAdmin` middleware |
| Organization Admin | Org-scoped developer/marketplace ops | RBAC org membership |
| Developer | Developer portal, SDK, Studio workspace | Supabase auth + org |
| Sponsor | Sponsor portal, billing | Supabase auth + sponsor status |

## First-Time Setup

1. **Create Administrator** — `/admin/create-administrator` (website) or Admin First Login panel (Studio)
2. **Setup Wizard** — Studio Command Center → Setup Wizard (connection configuration)
3. **Admin Wizard Hub** — 11 guided wizards (EPIC 63) for zero-code platform configuration
4. **Connection Center** — Validate all connections via validate-all API
5. **Production Readiness Wizard** — Step-by-step readiness checklist

## Command Center Panel Map

| Category | Panels |
|----------|--------|
| Platform Operations | Mission Control, Automation Dashboard, Executive Platform |
| Certification | Production Certification, Final Release, Validation Dashboard, Certification Testing |
| Production | Production Readiness Dashboard, Production Dashboard, Deployment Center |
| Connections | Connection Center, Connection Orchestrator, Configuration Manager, Secrets Dashboard |
| Infrastructure | Cloud Center, Infrastructure Center, Environment Manager, Backup Center, Disaster Recovery |
| Launch | Launch Center, Release Center, Beta Operations, Issue Dashboard |
| Business | Billing, CRM, Community, Revenue, Growth |
| Security | Security Center, SOC Dashboard, Compliance, Threat Monitor |

## Production Certification Workflow

1. Connect Command Center to Cloud API
2. Open **Production Certification** panel
3. Click **Run certification**
4. Review final readiness score and quality gates
5. Navigate linked centers for failing items:
   - Certification Testing (QA)
   - Release Center / Launch Center
   - Executive Platform (leadership approval)
6. Confirm GO/NO-GO recommendation

## Mission Control

Unified platform health at `/v1/mission-control/dashboard`:

- Platform health, connection health, security scores
- Live operations (revenue, users, deployments)
- Action center with one-click repairs
- Production certification at `/v1/mission-control/production-certification`

## Feature Flags

Key production flags (managed via Feature Flags panel):

| Flag | Epic | Purpose |
|------|------|---------|
| productionCertificationEnabled | 68 | Production certification orchestration |
| productionActivationEnabled | 65 | Production activation audits |
| finalReleaseGateEnabled | 55 | Final release quality gate |

## Admin API Quick Reference

| Endpoint | Purpose |
|----------|---------|
| GET `/v1/mission-control/dashboard` | Mission Control dashboard |
| GET `/v1/mission-control/production-certification` | Certification dashboard |
| GET `/v1/command-center/dashboard` | Command Center summary |
| POST `/v1/connections/validate-all` | Validate all connections |
| POST `/v1/launch/validation/certification/production/run` | Run certification |
| POST `/v1/production-activation/run` | Run production activation audit |

## Website Admin

Admin dashboard at `/admin` integrates Mission Control homepage via `fetchMissionControlHomepage()`.

Service: `nexus-website/src/services/platform/adminExperienceService.ts`

## Related Documents

- [MASTER_OPERATOR_GUIDE.md](./MASTER_OPERATOR_GUIDE.md)
- [MASTER_PLATFORM_CERTIFICATION.md](../platform/MASTER_PLATFORM_CERTIFICATION.md)
- [OPERATIONS_GUIDE.md](./OPERATIONS_GUIDE.md)
- ADR-253 (Admin Certification Workflow)
