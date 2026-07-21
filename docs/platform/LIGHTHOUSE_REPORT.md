# Lighthouse Report — EPIC 71

**Date:** 2026-07-21  
**Target:** https://nexuseos.github.io/NEXUS-website/

---

## Audit status

Full Lighthouse CLI audit **deferred until post-deploy** (pre-fix white screen made scores meaningless).

### SEO pre-check (local)

`npm run lighthouse` validates:

- `public/robots.txt` — present
- `public/sitemap.xml` — generated at build
- `public/blog.rss.xml` — generated at build
- `index.html` meta: viewport, description, og:title, RSS alternate

**Result:** PASS (pre-fix pipeline)

---

## Expected improvements (post-fix)

| Category | Pre-fix estimate | Post-fix target | Rationale |
|----------|------------------|-----------------|-------------|
| Performance | N/A (blank) | >85 | Route splitting, lazy Three.js, manual chunks |
| Accessibility | N/A | >90 | Skip link, focus-visible, semantic headings |
| Best Practices | N/A | >90 | HTTPS, no document.write |
| SEO | N/A | >95 | Sitemap, meta, structured data on Home |

### Bundle notes (shim build)

- Main chunk: ~241 KB (gzip ~74 KB)
- Three.js chunk: excluded from first paint in shim mode (gradient Aether fallback)
- Supabase chunk: lazy-loaded on auth routes

---

## Recommended post-deploy command

```bash
npm run build:pages:shims
npm run preview:pages
npx lighthouse http://localhost:4173/NEXUS-website/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/platform/lighthouse-epic71.json
```

Update this document with actual scores after deploy verification.
