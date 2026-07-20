# ADR-099: Developer Platform Completion

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 22 — Developer Platform

## Decision

Complete the external developer platform with migration `0011_developer_platform`, `@nexus-cloud/developer-platform` service, extended `@nexus/sdk-behavior` (semver, dependency resolver, package manager), `@nexus/sdk-templates`, CLI wizard/templates/signing commands, and functional Developer Portal pages (analytics, marketplace wizard, sandbox orgs, API/SDK explorers, playground, tutorial engine).

OpenAPI spec is generated at `GET /v1/developer/openapi.json`. Package verification supports RSA-SHA256 keys registered per organization plus content-hash fallback. Behavior certification runs automated checks on package versions.

## Consequences

External developers can scaffold (`nexus wizard`), validate, sign, publish, and maintain behaviors end-to-end via CLI and portal. Sandbox organizations isolate development workloads. Interactive docs replace architecture-preview placeholders.

*Related: ADR-008, ADR-016, ADR-094, ADR-095*
