# ADR-086: CMS Architecture

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 19 — Platform Integration + Command Center Foundation

## Context

Hardcoded page text and static navigation in consumer repos prevent non-engineers from updating the live ecosystem. EPIC 19 requires database-driven content with draft/publish workflow, version history, and audit trails.

## Decision

Implement a **portal-scoped CMS** in `nexus-cloud`:

### Data Model

| Table | Purpose |
|-------|---------|
| `cms_pages` | Page identity, portal, slug, status |
| `cms_page_versions` | Version history + JSON body / MDX source |
| `cms_sections` | Page sections |
| `cms_components` | Typed components (hero, blocks, buttons, forms, media) |
| `cms_navigation` | Portal navigation links |
| `cms_footer` | Portal footer columns |
| `cms_hero` | Hero sections |
| `cms_content_blocks` | Reusable blocks |
| `cms_media` | Media library |
| `cms_seo` / `cms_metadata` | SEO and metadata |
| `cms_audit_history` | Append-only audit log |
| `feature_flags` | Runtime feature toggles |

### Portals

`website`, `developer`, `sponsor`, `marketplace`, `studio`, `documentation`

### Workflow

1. Editor creates/updates page → new `cms_page_versions` row, page stays `draft`
2. Publish → page status `published`, `published_at` set, audit entry written
3. Public consumers fetch `/v1/cms/published/:portal/*` (no auth)
4. Management routes require CMS editor role

### Service Layer

`createCmsService(db)` in `@nexus-cloud/cms` is the single backend implementation. No in-memory CMS stubs in production paths.

## Consequences

- Website blog, navigation, and footer load from Cloud CMS
- Seed migration `0006_cms_seed_website.sql` migrates legacy static content once
- RLS enabled on CMS tables; public read limited to published content

*Related: ADR-085, ADR-087*
