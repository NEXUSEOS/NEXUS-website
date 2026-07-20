# ADR-016: Ecosystem Ownership Validation

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 2

## Context

NEXUS spans multiple repositories. Features placed in the wrong repo create duplication, broken dependency direction, and conflicting implementations.

## Decision

Maintain a **Feature Ownership Registry** in `nexus-website/src/architecture/ownership.ts` validating Sprint 5 Task 2 scope:

| Feature | Owner |
|---------|-------|
| Behavior Editor UI | nexus-studio |
| Behavior Package Format | nexus-sdk |
| Marketplace Publishing | nexus-marketplace |
| Simulation / Digital Twin Interfaces | nexus-sdk |
| Robot Runtime | nexus-os |
| Documentation | nexus-website |
| Specifications | nexus-specifications |
| Shared UI | nexus-platform |
| Design | nexus-design-system |

### Design Governance

All future Behavior Editor, Marketplace, Studio, and Digital Twin UIs must follow:

```
nexus-design-system → @nexus/theme / @nexus/ui → Applications
```

Documented in `src/architecture/design-governance.ts`. Current nexus-website status: **compliant**.

### Validation Rules

1. Documentation may reference cross-repo contracts; implementation stays in owner repo
2. nexus-website does not implement SDK CLI, marketplace registry, or robot runtime
3. Shared packages consumed via `@nexus/*` — no local UI replacements

## Consequences

- ADR incubation remains in nexus-website until nexus-specifications exists
- Ownership registry updated when new features are assigned

---

*Related: ADR-007, ADR-012 through ADR-017*
