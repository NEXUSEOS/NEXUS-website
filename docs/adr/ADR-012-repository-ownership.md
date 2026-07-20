# ADR-012: Repository Ownership Model

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

The NEXUS ecosystem spans multiple repositories with distinct ownership boundaries. Sprint 5 Task 1 transforms `nexus-website` into the production gateway while incubating developer platform, behavior workspace, and SDK documentation architecture. Without an explicit ownership model, features risk duplication across repositories and violate the Dependency Direction Rule.

## Decision

Adopt the locked Repository Ownership Rule across all NEXUS engineering work. Each feature has exactly one owning repository; consuming repositories import packages or APIs — they do not reimplement owned capabilities.

### Ownership Matrix

| Repository | Owns |
|------------|------|
| **nexus-website** | Public website, documentation, developer portal, sponsor portal, blog, roadmap, downloads |
| **nexus-platform** | Shared packages, shared UI, shared auth, shared config, shared analytics, shared Aether |
| **nexus-design-system** | Design tokens, component specs, motion language, brand system, accessibility standards |
| **nexus-sdk** | SDK packages, CLI, behavior schemas, templates, examples |
| **nexus-cloud** | APIs, authentication infrastructure, robot registry, telemetry, OTA |
| **nexus-marketplace** | Publishing, skills, AI models, packages |
| **nexus-studio** | Desktop application, behavior editor, digital twin interface |
| **nexus-os** | Robot runtime, kernels, safety systems |
| **nexus-ai** | AI orchestration, vision, speech, reasoning |
| **nexus-specifications** | ADRs, engineering standards, API contracts, schemas |

### Website Incubation Boundaries

The following are **website-owned architecture previews** until stabilized for extraction:

| Feature | Current Location | Future Owner |
|---------|------------------|--------------|
| Behavior Workspace UI | `src/behavior/` | `nexus-studio` + `nexus-cloud` |
| Developer Platform extensions | `src/pages/DeveloperPortal/` | `nexus-cloud` |
| SDK documentation shell | `src/sdk/` | `nexus-sdk` (content) + `nexus-website` (host) |
| MDX documentation | `src/content/mdx/` | `nexus-website` |
| ADRs (incubation) | `docs/adr/` | `nexus-specifications` |

### Validation Registry

Runtime validation lives in `src/architecture/ownership.ts` — `ecosystemOwnership[]` maps features to owners for documentation and code review.

### Rules

1. **Package Ownership Rule** — shared UI/auth/config live in `nexus-platform`, not in application repos.
2. **Dependency Direction Rule** — applications → platform packages → design system. Never reverse.
3. **No Duplicate Implementations** — if `@nexus/ui` provides a primitive, applications consume it.
4. **Repository Maturity Rule** — incubating features stay in website until API contracts stabilize.

## Consequences

### Positive

- Clear extraction path for Sprint 4+ platform work
- Prevents parallel design systems and duplicate auth flows
- ADR and code review can reference a single ownership source

### Negative

- Website temporarily hosts capabilities that will migrate (behavior workspace, extended developer platform)
- Cross-repo coordination required before extraction

## References

- ADR-007 Shared Package Strategy
- ADR-008 Developer Platform
- ADR-014 through ADR-017 (Sprint 5 Task 2 — Behavior SDK, Marketplace, Digital Twin)
- ADR-021 Ecosystem Ownership Validation (Sprint 5 Task 2 supplement)
- `src/architecture/ownership.ts`
