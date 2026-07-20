# ADR-092: Global Platform Search

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 20 — Full Platform Integration

## Context

Search existed only for static documentation catalog filtering. CMS pages, blog posts, and platform resources had no unified discovery API.

## Decision

Implement **`platform_search_index`** table and search service:

| Field | Purpose |
|-------|---------|
| `resource_type` | `cms_page`, `documentation`, `blog`, `media`, etc. |
| `resource_id` | Stable external ID |
| `title`, `excerpt`, `url`, `portal` | Display + navigation |
| `keywords` | Tag array for matching |

API: `GET /v1/platform/search?q=&type=&limit=`

Reindex: `POST /v1/platform/search/reindex` (admin) — indexes all CMS pages

Command Center: `GET /v1/command-center/search?q=` (admin)

Client: `@nexus/integration` `search()` and `@nexus/sdk-platform` `search()`

## Consequences

- Website nav search can extend to Cloud-backed global search
- CMS publish workflow should call `indexSearchDocument()` (future hook on publish)
- Search index supports multi-tenant org filtering

*Related: ADR-086, ADR-089*
