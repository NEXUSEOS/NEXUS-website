# ADR-088: Dynamic Content Delivery

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 19 — Platform Integration + Command Center Foundation

## Context

Consumer applications (Website, Studio, portals) previously embedded navigation, footer, and blog content from TypeScript config files. This violates the EPIC 19 operational rule: content must update live without redeployment.

## Decision

All editable ecosystem page content flows through a single delivery path:

```
Consumer App → @nexus/sdk-cms → Cloud API /v1/cms/published/:portal/* → PostgreSQL
Admin (Studio) → @nexus/sdk-cms → Cloud API /v1/cms/* (authenticated) → PostgreSQL
```

### Website Integration

| Surface | Service | Endpoint |
|---------|---------|----------|
| Blog index/detail | `cmsContentService.ts` | `published/website/pages` |
| Navigation | `Navigation.tsx` | `published/website/navigation` |
| Footer | `Footer.tsx` | `published/website/footer` |

Static catalogs (`src/content/blog/posts.ts`) are deprecated for runtime; seed migration preserves historical posts in CMS.

### Configuration

- `VITE_NEXUS_CLOUD_URL` — Cloud API base URL (default `http://localhost:8787`)
- Optional bearer token from Supabase session for authenticated CMS reads

### Error Handling

When CMS is unreachable, consumer UIs show empty states — not hardcoded fallback content.

## Consequences

- Content edits in Command Center appear on Website after publish
- Same SDK serves Studio admin and Website public reads
- Future portals add a portal enum value and consumer fetch — no duplicate CMS clients

*Related: ADR-085, ADR-086*
