# ADR-134: Visual CMS

## Status
Accepted — PROGRAM ALPHA Phase 2

## Context
Platform administrators need drag-and-drop CMS editing with responsive preview, publish, and rollback without source code changes.

## Decision
Extend existing `@nexus/sdk-cms` + `@nexus/cms-renderer` builder:

- **Website** `/admin/cms` — Visual CMS Builder with HTML5 drag-and-drop palette, desktop/tablet/mobile preview, save/publish via CMS API
- **Studio** `PageBuilderPanel` — drag-and-drop enhancement on existing click-to-add builder
- Supports all CMS component palette types: hero, content blocks, cards, buttons, forms, navigation sections
- Draft/save via `savePageLayout`, publish via `publishPage`, versions via existing CMS versioning API

No duplicate CMS backend — all writes through `/v1/cms/*`.

## Consequences
- Theme and layout changes propagate to published pages via existing CMS publish pipeline
- Blog, documentation, portal pages editable per portal (website, developer, sponsor, marketplace, documentation)
