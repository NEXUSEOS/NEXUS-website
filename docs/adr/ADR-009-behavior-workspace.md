# ADR-009: Behavior Workspace Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

NEXUS developers need to author, version, and publish robot behaviors as a first-class platform capability. Sprint 5 introduces the **Behavior Workspace** as an architecture foundation in `nexus-website` — metadata schema, lifecycle management, and portal UI — without on-robot execution or cloud persistence.

Execution is deferred to `nexus-os`. Persistence is deferred to `nexus-cloud`. Schema and publish workflows will align with `@nexus/sdk-behavior` in `nexus-sdk`.

## Decision

Implement a **client-only Behavior Workspace** in `nexus-website` with a typed metadata schema, full draft/version/publish/archive lifecycle, and `localStorage` persistence as an architecture preview.

### Ownership

| Concern | Owner | Location |
|---------|-------|----------|
| Metadata schema | `nexus-website` | `src/behavior/types.ts` |
| CRUD + lifecycle service | `nexus-website` | `src/behavior/behaviorService.ts` |
| React hook | `nexus-website` | `src/behavior/hooks/useBehaviors.ts` |
| Portal UI pages | `nexus-website` | `src/pages/Behavior/` |
| Feature flag | `nexus-website` | `behaviorWorkspace: true` |
| Future execution | `nexus-os` | Deferred |
| Future persistence | `nexus-cloud` | Deferred |
| Future SDK contract | `nexus-sdk` | `@nexus/sdk-behavior` |

### Metadata Schema

```typescript
interface BehaviorMetadata {
  behaviorId: string          // generated: behavior_{uuid}
  name: string
  version: string             // semver, starts 0.1.0
  author: string
  description: string
  robotCompatibility: string[]
  requiredSensors: string[]
  requiredHardware: string[]
  requiredAiModels: string[]
  motionDependencies: string[]
  permissions: string[]
  safetyLevel: SafetyLevel    // monitor | supervised | autonomous | restricted
  categories: string[]
  tags: string[]
  license: string             // default: 'Proprietary'
  status: BehaviorStatus      // draft | published | archived
  createdAt: string           // ISO 8601
  updatedAt: string
  publishedAt?: string
}
```

Supporting types: `BehaviorDraftPayload` (create/update input), `BehaviorVersion` (version audit record).

### Lifecycle

| Action | Method | Result |
|--------|--------|--------|
| Create draft | `createDraft(author, payload)` | `status=draft`, `version=0.1.0` |
| Update draft | `updateDraft(id, payload)` | Blocked if archived |
| Save draft | `saveDraft(id)` | Touches `updatedAt` |
| Version | `versionBehavior(id, changelog?)` | Bumps patch semver |
| Clone | `cloneBehavior(id, author)` | New draft, name suffixed `(Copy)` |
| Publish | `publishDraft(id)` | `status=published`, sets `publishedAt` |
| Archive | `archiveBehavior(id)` | `status=archived` |

**State transitions:**

```
draft ──publish──→ published
  │                    │
  │                    └──archive──→ archived
  │
  └──version──→ draft (new patch version)
```

Published behaviors cannot be edited directly; clone to create a new draft.

### localStorage Architecture

| Setting | Value |
|---------|-------|
| Storage key | `nexus-behavior-workspace-v1` |
| Format | JSON array of `BehaviorMetadata[]` |
| Read/write | `readStore()` / `writeStore()` in `behaviorService.ts` |
| List order | Sorted by `updatedAt` descending |

This is an **architecture preview** — not production persistence. Data is browser-local and cleared on storage reset.

### Portal Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/developers/portal/behaviors` | `BehaviorList` | Library view with status filters |
| `/developers/portal/behaviors/new` | `BehaviorEditor` | Create new draft |
| `/developers/portal/behaviors/:behaviorId` | `BehaviorDetail` | View + lifecycle actions |

### No Robot Execution

The Behavior Workspace is **metadata and lifecycle only**:

- No behavior runtime, interpreter, or simulator in `nexus-website`
- No robot communication or fleet dispatch
- UI explicitly labels the feature as architecture preview
- Execution deferred to `nexus-os` on-robot runtime

### Future Integration

| System | Role | Timeline |
|--------|------|----------|
| `nexus-cloud` | Replace `localStorage` with cloud API persistence, org-scoped libraries | Post-incubation |
| `nexus-os` | On-robot behavior execution and safety enforcement | Post-incubation |
| `nexus-sdk` (`@nexus/sdk-behavior`) | Canonical schema, versioning, publish API contract | Parallel development |
| Developer Portal Simulation | Validate behaviors before deployment | Architecture section (ADR-008) |
| Marketplace | Distribute published behaviors | Architecture section (ADR-008) |

**Migration path:**

1. Stabilize schema in `nexus-website` under real developer usage
2. Extract schema types to `@nexus/sdk-behavior` in `nexus-sdk`
3. Implement `nexus-cloud` persistence API matching lifecycle methods
4. Wire `nexus-os` execution to published behavior artifacts
5. Replace `localStorage` service with cloud API client in `behaviorService.ts`

## Consequences

### Positive

- Developers can explore behavior authoring UX before cloud infrastructure exists
- Metadata schema establishes contract for `nexus-sdk` and `nexus-cloud`
- Lifecycle (draft → version → publish → archive) models real production workflow
- Portal integration demonstrates Developer Platform section pattern (ADR-008)
- Clear deferral boundaries prevent premature execution complexity

### Negative

- `localStorage` data is ephemeral and not shared across devices or users
- Schema may evolve before cloud API is defined, requiring migration
- No validation against real robot hardware or simulation environments
- Published behaviors have no deployable artifact — metadata only

## Quality Gate

- [x] `BehaviorMetadata` schema defined with all required fields
- [x] Full lifecycle implemented in `behaviorService.ts`
- [x] `localStorage` persistence under `nexus-behavior-workspace-v1`
- [x] Portal routes registered: list, create, detail
- [x] UI labels architecture preview; no execution paths
- [x] `useBehaviors` hook wraps service for React consumption
- [x] `npm run build` and `npm run lint` pass

---

*Related: ADR-008 (developer platform), ADR-010 (SDK architecture)*
