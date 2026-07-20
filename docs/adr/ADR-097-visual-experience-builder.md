# ADR-097: Visual Experience Builder

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 21 Task 1 — Visual Experience Builder

## Decision

Implement a section/component layout model backed by existing `cms_sections` and `cms_components` tables. Store layout snapshots in `cms_page_versions.body` for revision history, rollback, and version compare. Expose builder APIs via `@nexus-cloud/cms` and `@nexus/sdk-cms`. Render pages through shared `@nexus/cms-renderer` in website and Studio live preview. Manage portal themes in new `cms_themes` table with CSS variable injection.

## Consequences

Administrators edit public pages in Studio Command Center without code changes. Website serves CMS-built pages at `/pages/:slug`. Scheduled publishing uses `cms_pages.scheduled_publish_at` processed by the API interval.

*Related: ADR-085, ADR-088, ADR-096*
