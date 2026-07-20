# ADR-013: Design Approval Pipeline

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

NEXUS applications share a unified brand and interaction language. Sprint 5 expands the production website with navigation, developer portal, content platform, and behavior workspace UI. All visual changes must follow a locked approval pipeline to prevent competing design systems across `nexus-website`, `nexus-studio`, and `nexus-marketplace`.

## Decision

All visual changes follow the locked Design Approval Pipeline. Applications may **consume** design packages; they may **not** create independent design systems.

### Pipeline Stages

```
Design Concept
      ↓
nexus-design-system
  (Component Spec, Motion Spec, Accessibility Review)
      ↓
Approval / ADR (when cross-application)
      ↓
@nexus/theme / @nexus/ui Updates (nexus-platform)
      ↓
nexus-platform Release
      ↓
Application Adoption
```

### Implementation in nexus-website

| Layer | Source | Compliance |
|-------|--------|------------|
| Design tokens | `@nexus/theme` | globals.css imports platform tokens |
| UI primitives | `@nexus/ui` | Button, Container, Section, Heading, Text, GlassPanel |
| Aether effects | `@nexus/aether` | Hero background only |
| Layout CSS | `nexus-website` local | Spacing and navigation layout only — no competing tokens |
| MDX content styles | `src/content/mdx/mdx.css` | Typography and callouts using platform CSS variables |

### Governed Future UIs

The following UIs **must** follow this pipeline when implemented:

- Behavior Editor UI (`nexus-studio`)
- Marketplace UI (`nexus-marketplace`)
- Digital Twin UI (`nexus-studio`)
- Studio application chrome (`nexus-studio`)

Registry: `src/architecture/design-governance.ts` — `governedFutureUis[]`

### Governance Rules

1. No visual system changes bypass `nexus-design-system` review.
2. Applications consume `@nexus/theme` and `@nexus/ui` — never duplicate primitives.
3. Motion and Aether effects follow `nexus-design-system` motion specifications.
4. Accessibility standards defined in `nexus-design-system` apply to all governed UIs.
5. Breaking visual changes require ADR and semver bump in `nexus-platform` packages.

### Navigation Drawer (Sprint 5)

The responsive navigation drawer uses local layout CSS (`Navigation.css`) with platform design tokens (`--color-surface`, `--spacing-*`, `--color-accent`). No new primitives were introduced outside `@nexus/ui`.

## Consequences

### Positive

- Consistent NEXUS brand across website, studio, and marketplace
- Single source of truth for tokens and components
- Accessibility review centralized in design system

### Negative

- Visual iteration requires design-system → platform → app release cycle
- Local CSS limited to layout; new components require platform package work

## References

- ADR-007 Shared Package Strategy
- ADR-012 Repository Ownership
- `src/architecture/design-governance.ts`
- `nexus-platform/packages/theme`, `nexus-platform/packages/ui`
