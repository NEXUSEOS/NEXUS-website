# ADR-007: Shared Package Strategy

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 3 — Sprint 4 Task 1

## Context

NEXUS systems were incubated in `nexus-website` as monolithic source. Multiple applications (Website, Studio, Marketplace, Cloud, SDK) require the same design system, UI primitives, auth, configuration, and services without duplicating implementations.

## Decision

Establish `nexus-platform` as a **npm workspaces monorepo** with seven scoped packages. Each package is the **single owner** of its domain. Applications consume packages; they never become the source of truth for shared code.

### Package Ownership

| Package | Owner Domain | Canonical Source |
|---------|--------------|------------------|
| `@nexus/theme` | Design tokens, globals.css | `packages/theme` |
| `@nexus/ui` | Shared UI primitives | `packages/ui` |
| `@nexus/aether` | WebGL visual engine | `packages/aether` |
| `@nexus/config` | Navigation, routes, permissions, portals | `packages/config` |
| `@nexus/auth` | Auth provider, guards, Supabase services | `packages/auth` |
| `@nexus/downloads` | Download center UI and services | `packages/downloads` |
| `@nexus/analytics` | Portal event tracking and metrics | `packages/analytics` |

### Dependency Graph

```
Applications (nexus-website, Studio, …)
        ↓
@nexus/downloads ──→ @nexus/analytics ──→ @nexus/auth ──→ @nexus/config
        │                    │                  │
        └────────────────────┴──────────────────┴──→ @nexus/ui
        │
        └──→ @nexus/aether ──→ @nexus/theme
```

**Rules:**

- Dependencies flow **downward only** (applications → packages → platform core).
- Shared packages **never** depend on applications.
- `@nexus/theme` and `@nexus/config` have no internal `@nexus/*` dependencies.

### Migration Strategy

1. **Extract** — Move stable code from `nexus-website` into owning package `src/`.
2. **Publish API** — Export only public symbols from package `index.ts`.
3. **Re-export shim** — Keep backwards-compatible paths in `nexus-website` that re-export from `@nexus/*` (no duplicated implementations).
4. **Verify** — `npm run build`, `npm run lint`, TypeScript clean in both repos.
5. **Propagate** — Studio, Marketplace, Cloud, SDK adopt packages as they mature.

### Versioning Strategy

- All packages start at **semver `0.1.0`**.
- Each package includes `package.json`, `README.md`, and `CHANGELOG.md`.
- Breaking changes require major version bumps and migration notes in CHANGELOG.
- Internal workspace references use matching semver (`0.1.0`) until private registry publishing is enabled.

### Future Publishing Strategy

1. Configure private npm registry (GitHub Packages or npm org).
2. Add CI pipeline: lint → typecheck → publish on tagged release.
3. Applications switch from `file:../nexus-platform/packages/*` to registry semver ranges.
4. ADRs and `nexus-specifications` become the governance layer for cross-package API changes.

## Consequences

### Positive

- Single canonical implementation per shared system
- Clear dependency direction prevents circular imports
- Applications can upgrade packages independently via semver
- Foundation for multi-app ecosystem (Studio, Cloud, SDK)

### Negative

- Monorepo + symlink wiring adds Vite/tsconfig complexity during incubation
- App-specific layouts (AuthLayout, PortalLayout) remain in applications until generalized

## Quality Gate

- [x] `npm run build` passes in `nexus-website`
- [x] `npm run lint` passes in `nexus-website`
- [x] Package README and CHANGELOG created
- [x] Public exports verified via package `index.ts` barrels
- [x] Zero duplicated implementations in application source

---

*Related: ADR-001 through ADR-006 (auth, portals, downloads)*
