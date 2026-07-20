# ADR-109: Unified Design Language

**Status:** Accepted  
**Date:** 2026-07-14  
**Epic:** EPIC 30 — Unified Nexus Experience

## Decision

Establish `@nexus/design-system` as the single design source for the NEXUS ecosystem. All applications consume tokens via `@nexus/theme` and components via `@nexus/ui` — no local color, spacing, or typography definitions.

Visual language: Rose Gold, Champagne, Pearl White, Graphite, Soft Mist, Liquid Glass, particle backgrounds, glass navigation, floating cards, shared motion.

Packages:
- `nexus-design-system` — token definitions, visual language contract, globals.css
- `@nexus/theme` — theme engine with dark/light modes and CMS bridge
- `@nexus/ui` — shared components including ConnectionCard and GlassPanel

## Consequences

- `@nexus/theme` v1.0 re-exports semantic colors from design-system
- Website imports `@nexus/design-system/globals.css` before theme globals
- Studio and Command Center use shared ConnectionCard for glass surfaces

*Related: ADR-013, ADR-034, ADR-112*
