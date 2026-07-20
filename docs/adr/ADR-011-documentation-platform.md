# ADR-011: Documentation Platform Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 1

## Context

Sprint 2 Task 2 established basic SEO (placeholder sitemap, `PageMeta`, `robots.txt`) for the production website. Sprint 5 expands the public site into a full **content platform**: documentation hub, blog, release notes, changelog, unified search, and enhanced SEO with build-time sitemap generation, structured data, and expanded crawl coverage.

All content is **static TypeScript catalogs** owned by `nexus-website` — no CMS dependency during incubation.

## Decision

Implement a **static content platform** in `nexus-website` with config-driven navigation, unified search, and build-time SEO generation.

### Ownership

| Concern | Owner | Location |
|---------|-------|----------|
| Content types | `nexus-website` | `src/content/types.ts` |
| Documentation catalog | `nexus-website` | `src/content/docs/catalog.ts` |
| Blog posts | `nexus-website` | `src/content/blog/posts.ts` |
| Release notes | `nexus-website` | `src/content/releases/catalog.ts` |
| Changelog entries | `nexus-website` | `src/content/changelog/entries.ts` |
| Search index | `nexus-website` | `src/content/searchIndex.ts` |
| Content navigation | `nexus-website` | `src/config/contentNavigation.ts` |
| SEO components | `nexus-website` | `src/components/seo/` |
| Sitemap generator | `nexus-website` | `scripts/generate-sitemap.mjs` |
| Feature flag | `nexus-website` | `contentPlatform: true` |

### Route Map

| Route | Component | Content Source |
|-------|-----------|----------------|
| `/docs` | `DocsHub` | `documentationSections` |
| `/docs/sdk` | `SdkDocsHub` | `sdkPackages`, `sdkDocSections` |
| `/docs/sdk/:sectionId` | `SdkDocSection` | Section metadata |
| `/docs/api` | `DocsSectionPage` | `documentationArticles` (api) |
| `/docs/tutorials` | `DocsSectionPage` | `documentationArticles` (tutorials) |
| `/docs/guides` | `DocsSectionPage` | `documentationArticles` (guides) |
| `/docs/examples` | `DocsSectionPage` | `documentationArticles` (examples) |
| `/blog` | `BlogIndex` | `blogPosts` |
| `/blog/:slug` | `BlogPost` | `getBlogPost(slug)` |
| `/releases` | `Releases` | `releaseNotes` |
| `/changelog` | `ChangelogPage` | `changelogEntries` |
| `/documentation` | Redirect | → `/docs` (legacy) |

### Content Navigation

Two navigation groups merged in `contentNavigation.ts`:

**Documentation nav:** Overview · SDK · API · Tutorials · Guides · Examples

**Engineering content nav:** Blog · Release Notes · Changelog

Footer links defined in `websiteFooter.ts`.

### Content Layout

```
ContentLayout
├── Sidebar navigation (from contentNavigation)
├── PageMeta (per-page SEO)
├── Breadcrumbs (auto from merged routes)
└── Page content (Outlet)
```

`NavSearch` provides unified search across routes, documentation articles, and blog posts via `searchContent()` from `searchIndex.ts`.

### Blog

Static post catalog in `src/content/blog/posts.ts`. Current posts:

| Slug | Title |
|------|-------|
| `nexus-v0-2-production-gateway` | NEXUS v0.2 — Production Gateway Launch |
| `behavior-workspace-architecture` | Introducing the Behavior Workspace Architecture |
| `shared-platform-extraction` | Shared Platform Extraction Complete |

### Releases & Changelog

| Content | File | Format |
|---------|------|--------|
| Release notes | `src/content/releases/catalog.ts` | Versioned release summaries (0.1.0, 0.2.0) |
| Changelog | `src/content/changelog/entries.ts` | Granular change entries per version |

Release notes provide high-level summaries; changelog provides detailed change lists.

### SEO Architecture

#### PageMeta

Per-route metadata via `PageMeta` component:

- `document.title` from route config
- Meta description
- Open Graph tags (title, description, type)
- Twitter card tags

#### Structured Data

JSON-LD injection via `StructuredData` component (`structuredMetadata: true`):

| Page | Schema Type |
|------|-------------|
| `DocsHub` | `WebSite` |
| `BlogIndex` | `WebSite` |
| `BlogPost` | `Article` (with `datePublished`, `author`) |

Future: `TechArticle` for SDK documentation sections.

#### Sitemap

Build-time generation via `scripts/generate-sitemap.mjs`:

| Setting | Value |
|---------|-------|
| Trigger | `npm run build` (runs generator first) |
| Output | `public/sitemap.xml` |
| Site URL | `VITE_SITE_URL` env (default: `https://nexuseos.github.io/nexus-website`) |
| Coverage | 24 static paths (marketing, docs hub, blog/releases/changelog index) |

**Excluded from sitemap:** SDK section sub-pages (`/docs/sdk/:sectionId`), blog post slugs, authenticated portal routes.

#### Robots

`public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://nexuseos.github.io/nexus-website/sitemap.xml
```

### Content Module Structure

```
src/content/
├── types.ts              — Content type definitions
├── docs/catalog.ts       — Documentation sections + articles
├── blog/posts.ts         — Blog post catalog
├── releases/catalog.ts   — Release note catalog
├── changelog/entries.ts  — Changelog entry catalog
├── searchIndex.ts        — Unified search index builder
└── index.ts              — Barrel exports
```

### Search Architecture

`searchIndex.ts` builds a unified index from:

- Route definitions (titles, descriptions, paths)
- Documentation articles (title, excerpt, section)
- Blog posts (title, excerpt, slug)

Consumed by `NavSearch` component in site navigation.

## Consequences

### Positive

- Full content platform without CMS infrastructure
- Unified search across all public content
- Build-time sitemap ensures crawl coverage stays current
- Structured data improves search engine rich results
- Static catalogs are version-controlled and reviewable
- Clear separation from authenticated portal content

### Negative

- No CMS — content updates require code changes and deploy
- Sitemap excludes dynamic routes (blog slugs, SDK sections) — may need expansion
- Blog and changelog require manual authoring per release
- No content preview or draft workflow

## Quality Gate

- [x] Documentation hub routes registered (`/docs`, `/docs/*`)
- [x] Blog routes registered (`/blog`, `/blog/:slug`)
- [x] Release notes and changelog routes registered
- [x] `contentNavigation` drives sidebar and footer links
- [x] `NavSearch` searches unified index
- [x] `PageMeta` renders per-route SEO metadata
- [x] `StructuredData` injects JSON-LD on docs and blog pages
- [x] `generate-sitemap.mjs` produces `public/sitemap.xml` on build
- [x] `robots.txt` references sitemap URL
- [x] `npm run build` and `npm run lint` pass

---

*Related: ADR-008 (developer platform), ADR-010 (SDK documentation)*
