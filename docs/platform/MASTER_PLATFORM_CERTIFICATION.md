# Master Platform Certification Guide

EPIC 68 — Production certification orchestration for the NEXUS ecosystem.

## Overview

Production certification extends existing launch-validation (EPIC 58), production activation (EPIC 65), and mission control (EPIC 59) without introducing new platform features. It validates readiness across 19 ecosystem components and 21 end-to-end journeys before production launch.

## Certification Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Production Certification Engine                 │
│  (packages/launch-validation/src/productionCertification.ts) │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼──────────┐        ┌──────────▼──────────┐
    │ Ecosystem Validation │        │  E2E Certification  │
    │  19 components       │        │  21 journey suites    │
    └──────────┬──────────┘        └──────────┬──────────┘
               │                              │
    ┌──────────▼──────────────────────────────▼──────────┐
    │  runFullValidation() + runLivePlatformValidation()  │
    └──────────────────────────┬───────────────────────────┘
                               │
              ┌────────────────▼────────────────┐
              │  production_certification_runs   │
              │  (migration 0056)                │
              └─────────────────────────────────┘
```

## Ecosystem Components Validated

| Component | Repository | Key Checks |
|-----------|------------|------------|
| Website | nexus-website | package.json, AppRouter, deploy.yml, E2E |
| Cloud | nexus-cloud | API app, Dockerfile, CI/CD |
| Studio | nexus-studio | Command Center, Electron config |
| SDK | nexus-sdk | CLI, behavior, atlas packages |
| Platform | nexus-platform | auth, aether packages |
| Specifications | nexus-specifications | ADRs 221, 228 |
| OS | nexus-os | cloudSync, module registry |
| Mission Control | nexus-cloud | service, routes, panel, migration 0047 |
| Command Center | nexus-cloud + studio | service, routes, UI |
| Marketplace | nexus-cloud + website | API, operations, UI |
| Billing | nexus-cloud + studio | BillingPanel, Stripe probe |
| CMS | nexus-cloud + website | service, routes, dynamic pages |
| Developer Portal | nexus-website + cloud | onboarding, projects, API |
| Sponsor Portal | nexus-website | onboarding, apply, status |
| Investor Portal | nexus-website + studio | Investors page, CRM panel |
| Community | nexus-website + studio | Community page, panel |
| Atlas Engineering | nexus-cloud + studio | HW/mechanical/electrical APIs |
| Automation | nexus-cloud + studio | engine, routes, dashboard |
| Executive Platform | nexus-cloud + studio | service, routes, panel |

## E2E Journey Suites

Visitor, registration, admin login, developer journey, sponsor journey, marketplace buy/publish, behavior upload/download, SDK publish, Studio auth, Command Center/Mission Control, Atlas engineering, production deploy, GitHub Pages, cloud deploy, connection orchestrator, installation manager (deployment service fallback), recovery, backups, security, accessibility, performance.

## Score Methodology

| Layer | Weight | Threshold |
|-------|--------|-----------|
| Ecosystem artifact checks | 25% | ≥90% per component, ≥75% minimum |
| E2E journey validation | 25% | ≥90% per journey, ≥75% minimum |
| Full static validation | 30% | ≥95% overall |
| Live HTTP probes | 20% | ≥60% pass rate |

**GO criteria**: Overall score ≥95%, no critical open issues, all quality gates pass, static production launch gate pass, live platform verified.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/launch/validation/certification` | Launch certification report (EPIC 58) |
| GET | `/v1/launch/validation/certification/production` | Production certification report |
| POST | `/v1/launch/validation/certification/production/run` | Run and persist certification |
| GET | `/v1/launch/validation/certification/production/dashboard` | Certification dashboard |
| GET | `/v1/mission-control/production-certification` | Mission Control enriched dashboard |

## Command Center Panels

| Panel | Purpose |
|-------|---------|
| Production Certification Dashboard | EPIC 68 — composite GO/NO-GO view |
| Certification Testing | Developer behavior certification |
| Validation Dashboard | Static validation runs |
| Release Center | Version management |
| Launch Center | Launch operations |
| Final Release | EPIC 55 quality gate |
| Production Readiness Dashboard | EPIC 65 activation audit |
| Executive Platform | Leadership approval |

## Feature Flag

`productionCertificationEnabled` — seeded in migration `0056_production_certification.sql`.

## Running Certification

```bash
# Via API (platform admin auth required)
curl -H "Authorization: Bearer $TOKEN" \
  https://api.example.com/v1/launch/validation/certification/production/run \
  -X POST

# Via Studio Command Center
# Connect → Production Certification → Run certification
```

## Related Documents

- [MASTER_CONNECTION_INVENTORY.md](./MASTER_CONNECTION_INVENTORY.md)
- [MASTER_DEPLOYMENT_GUIDE.md](../operations/MASTER_DEPLOYMENT_GUIDE.md)
- [EPIC-68-STOP-REPORT.md](./EPIC-68-STOP-REPORT.md)
- ADR-253 through ADR-256 in nexus-specifications
