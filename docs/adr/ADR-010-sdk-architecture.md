# ADR-010: SDK Documentation Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

NEXUS SDK packages (`@nexus/sdk-*`) are implemented in the `nexus-sdk` repository. The public website must document the SDK package roadmap, API reference sections, and integration guides — without duplicating package source or becoming the implementation owner.

Sprint 5 establishes the **SDK documentation architecture** on `nexus-website`: route structure, section catalog, package roadmap metadata, and cross-links to the Developer Portal — while `nexus-sdk` retains ownership of all package implementations.

## Decision

Host SDK documentation on `nexus-website` as a **documentation-only layer**. Package implementations ship from `nexus-sdk`; the website owns routes, section metadata, and architecture reference pages.

### Ownership Split

| Layer | Owner | Location |
|-------|-------|----------|
| Package implementations | `nexus-sdk` | `@nexus/sdk-*` packages |
| Package roadmap metadata | `nexus-website` | `src/sdk/packages.ts` |
| Documentation sections | `nexus-website` | `src/sdk/sections.ts` |
| Documentation pages | `nexus-website` | `src/pages/Docs/` |
| Feature flag | `nexus-website` | `sdkDocumentation: true` |

### `@nexus/sdk-*` Package Roadmap

| Package | Scope | Status | Description |
|---------|-------|--------|-------------|
| `@nexus/sdk-core` | core | beta | Auth, config, shared client utilities |
| `@nexus/sdk-motion` | motion | planned | Motion planning, trajectories |
| `@nexus/sdk-vision` | vision | planned | Camera pipelines, perception |
| `@nexus/sdk-ai` | ai | planned | Planning, reasoning, speech, memory |
| `@nexus/sdk-cloud` | cloud | planned | Cloud API client, telemetry, fleet hooks |
| `@nexus/sdk-behavior` | behavior | beta | Behavior schema, versioning, publish |
| `@nexus/sdk-fleet` | fleet | planned | Multi-robot fleet management |
| `@nexus/sdk-simulation` | simulation | planned | Simulation job scheduling, digital twin |

All packages declare `repository: 'nexus-sdk'`. Status progresses: `planned` → `alpha` → `beta` → `stable`.

### Documentation Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/docs` | `DocsHub` | Documentation hub (all sections) |
| `/docs/sdk` | `SdkDocsHub` | SDK package overview + section index |
| `/docs/sdk/:sectionId` | `SdkDocSection` | Individual SDK doc section |
| `/docs/api` | `DocsSectionPage` | API reference articles |
| `/docs/tutorials` | `DocsSectionPage` | Tutorial articles |
| `/docs/guides` | `DocsSectionPage` | Guide articles |
| `/docs/examples` | `DocsSectionPage` | Example articles |

Legacy `/documentation` redirects to `/docs`.

### SDK Documentation Sections (14)

Route pattern: `/docs/sdk/:sectionId`

| ID | Title | Order |
|----|-------|-------|
| `getting-started` | Getting Started | 1 |
| `installation` | Installation | 2 |
| `quick-start` | Quick Start | 3 |
| `authentication` | Authentication | 4 |
| `robot-api` | Robot API | 5 |
| `motion-api` | Motion API | 6 |
| `vision-api` | Vision API | 7 |
| `speech-api` | Speech API | 8 |
| `behavior-api` | Behavior API | 9 |
| `simulation-api` | Simulation API | 10 |
| `cloud-api` | Cloud API | 11 |
| `fleet-api` | Fleet API | 12 |
| `ota-api` | OTA API | 13 |
| `cli` | CLI | 14 |

Each section renders architecture reference content with cross-links to Developer Portal API Keys and SDK Downloads. Full API reference content ships from `nexus-sdk` as packages mature.

### Module Structure

```
src/sdk/
├── packages.ts     — Package roadmap metadata
├── sections.ts     — Documentation section catalog
└── index.ts        — Public exports + lookup helpers
```

Lookup helpers: `getSdkDocSection(id)`, `getSdkPackage(scope)`.

### Cross-Links

| From | To | Purpose |
|------|----|---------|
| `SdkDocSection` | `/developers/portal/api-keys` | API key management |
| `SdkDocSection` | `/developers/portal/sdk` | SDK package downloads |
| `SdkDocsHub` | `sdkPackages` roadmap | Package status overview |
| `DocsHub` | `/docs/sdk` | SDK documentation entry |

**Note:** Execution APIs (robot, motion, vision, cloud) connect when cloud and robot services are available. Documentation sections exist as architecture references until `nexus-sdk` packages reach `beta` or `stable`.

### Relationship to Behavior Workspace

`behavior-api` documentation section aligns with:

- `BehaviorMetadata` schema (ADR-009)
- `@nexus/sdk-behavior` package roadmap entry
- Developer Portal Behavior Library (`/developers/portal/behaviors`)

## Consequences

### Positive

- Clear separation: `nexus-sdk` owns code, `nexus-website` owns docs
- Package roadmap visible to developers before all packages ship
- 14-section structure scales as APIs mature
- Cross-links connect documentation to Developer Portal actions
- Section catalog is config-driven — easy to add new APIs

### Negative

- Documentation may precede package availability (architecture reference only)
- Two repositories must stay synchronized on package names and scopes
- Full API reference content not yet generated from `nexus-sdk` source
- Planned packages have no installable artifacts yet

## Quality Gate

- [x] `sdkPackages` roadmap with 8 packages defined
- [x] `sdkDocSections` catalog with 14 sections defined
- [x] Routes registered: `/docs`, `/docs/sdk`, `/docs/sdk/:sectionId`
- [x] `SdkDocsHub` renders package roadmap
- [x] `SdkDocSection` renders section content with portal cross-links
- [x] `sdkDocumentation` feature flag enabled
- [x] `npm run build` and `npm run lint` pass

---

*Related: ADR-008 (developer platform), ADR-009 (behavior workspace), ADR-011 (documentation platform)*
