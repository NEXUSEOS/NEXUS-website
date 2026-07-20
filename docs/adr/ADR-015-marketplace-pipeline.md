# ADR-015: Marketplace Pipeline

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 2

## Context

Validated behavior packages must flow through review, registry publish, installation, updates, and analytics. **nexus-marketplace** owns publishing; **nexus-website** documents the pipeline.

## Decision

Implement an **11-stage behavior pipeline** with explicit repository ownership per stage:

```
Create → Validate → Security Scan → Simulation → Compatibility Check
  → Review → Approval → Marketplace Release → Installation → Updates → Analytics
```

### Marketplace Foundation

| Capability | Owner | Architecture Location |
|------------|-------|----------------------|
| Package Upload | nexus-sdk + nexus-marketplace | `uploadSystem` in `pipeline.ts` |
| Validation | nexus-sdk | `nexus validate` + marketplace queue |
| Approval | nexus-marketplace | `reviewSystem` |
| Version Management | nexus-marketplace | `updateSystem`, `PackageVersion` |
| Ratings | nexus-marketplace | `ratingsSystem`, `PackageRatingSummary` |
| Reviews | nexus-marketplace | `reviewsSystem`, `PackageReview` |
| Analytics | nexus-cloud | `analyticsSystem`, `PackageAnalytics` |
| Distribution | nexus-marketplace | `distributionSystem`, `DistributionChannel` |
| Package registry | nexus-marketplace | `registry.ts` |

### Publishing Flow

1. `nexus package` (nexus-sdk)
2. Local validate + simulate (nexus-sdk)
3. `nexus publish` → marketplace upload queue
4. Security scan + compatibility verification
5. Review + approval
6. Registry publish + distribution channels
7. Installation (simulation first; robot deferred to nexus-os)
8. Updates + analytics

Robot installation references **nexus-os** — architecture only, no execution in this sprint.

## Consequences

- Developer portal Marketplace Uploads page links to documented pipeline
- No live registry in nexus-website — specification only

---

*Related: ADR-014, ADR-016, ADR-017*
