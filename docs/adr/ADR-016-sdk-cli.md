# ADR-016: SDK CLI Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 2

## Context

Developers need a unified CLI to create, validate, simulate, package, publish, install, and update behaviors. Implementation belongs to **nexus-sdk**; specification is documented on **nexus-website**.

## Decision

Define the **NEXUS CLI** command surface in `src/sdk/cli/commands.ts`:

| Command | Pipeline Stage |
|---------|----------------|
| `nexus init` | Project scaffold |
| `nexus login` | Cloud auth |
| `nexus create behavior` | Create |
| `nexus validate` | Validate |
| `nexus simulate` | Simulation |
| `nexus package` | Package build |
| `nexus publish` | Marketplace Release |
| `nexus install` | Installation (simulation first) |
| `nexus update` | Updates |

### SDK API Modules

Seven API contracts documented in `src/sdk/apis/`:

- Behavior, Motion, Vision, AI, Simulation, Cloud, Fleet

Each maps to `@nexus/sdk-*` packages owned by **nexus-sdk**.

### SDK Package Structure

| Package | Purpose |
|---------|---------|
| `@nexus/sdk-core` | Auth, config, shared types |
| `@nexus/sdk-behavior` | Package format, validation |
| `@nexus/sdk-motion` | Motion API |
| `@nexus/sdk-vision` | Vision API |
| `@nexus/sdk-ai` | AI orchestration hooks |
| `@nexus/sdk-simulation` | Digital Twin + simulation |
| `@nexus/sdk-cloud` | Cloud API |
| `@nexus/sdk-fleet` | Fleet operations |

## Consequences

- CLI is not implemented in nexus-website
- SDK doc sections at `/docs/sdk/*` link to architecture specs at `/docs/architecture/*`

---

*Related: ADR-010, ADR-014, ADR-017*
