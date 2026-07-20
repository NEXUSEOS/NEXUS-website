# ADR-100: Marketplace Operations Completion

**Status:** Accepted  
**Date:** 2026-07-13  
**Sprint:** EPIC 23 — Marketplace Operations

## Decision

Extend marketplace with migration `0012_marketplace_operations`: moderation/review queue, security/dependency/license scans, publisher profiles, verified developers, collections, featured listings, search indexing, download analytics, revenue sharing rules, update channels (stable/beta/nightly), and compatibility matrices. Moderator approval is required before publish; org self-publish is disabled.

Operations UI lives in Studio Command Center (`MarketplaceOpsPanel`). Public discovery enhanced on `/marketplace` with search, featured, collections, analytics, and compatibility.

## Consequences

Marketplace is fully operational for external developers and platform moderators. Publish flow: validate → scan → submit → moderate → approve → index → discover.

*Related: ADR-015, ADR-095, ADR-099*
