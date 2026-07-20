# ADR-014: Behavior Package Specification

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 2

## Context

Behaviors must be distributable as versioned packages across simulation, marketplace, and (future) robot installation. A canonical package format is required before SDK CLI and marketplace pipeline implementation.

## Decision

Define the **NEXUS Behavior Package Format v1.0.0** owned by **nexus-sdk**, documented in **nexus-website**.

### Package Layout

| Path | Required |
|------|----------|
| `behavior.json` | Yes |
| `README.md` | Yes |
| `LICENSE` | Yes |
| `assets/` | Yes |
| `scripts/` | Yes |
| `tests/` | Yes |
| `simulation/` | Yes |
| `motions/`, `voice/`, `vision/`, `examples/` | Optional |

### Schema (`behavior.json`)

- **Identity:** `schemaVersion`, `id`, `name`, `version` (semver)
- **Compatibility:** `robotCompatibility`, `requiredSensors`, `requiredHardware`, `requiredAiModels`, `motionDependencies`
- **Governance:** `permissions[]`, `safetyLevel`, `license`, `categories`, `tags`
- **Dependencies:** `dependencies[]` with semver ranges
- **Runtime:** `entrypoint`, `sdkMinimum`, optional `runtimeMinimum`, `simulationProfile`

### Safety Metadata

`safetyLevel` is one of: `monitor`, `supervised`, `autonomous`, `restricted`. Permissions declare runtime capabilities with human-readable reasons.

### Validation

- Architecture preview: `nexus-website/src/behavior/package/validation.ts`
- Production validation: **nexus-sdk** CLI (`nexus validate`)

### Versioning

- Package `version`: semver for releases
- `schemaVersion`: breaking schema changes increment major

## Consequences

- Workspace metadata (ADR-009) aligns with package manifest fields
- Marketplace compatibility checks reference the same schema
- `.nexus-behavior` archive format deferred to nexus-sdk (`nexus package`)

## Ownership

| Artifact | Owner |
|----------|-------|
| behavior.json schema | nexus-sdk |
| Documentation | nexus-website |
| Validation CLI | nexus-sdk |

---

*Related: ADR-009, ADR-015, ADR-016*
