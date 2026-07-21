# Performance Audit — EPIC 71

**Date:** 2026-07-21

---

## Build output (shim / GitHub Pages mode)

| Chunk | Size | Gzip | Strategy |
|-------|------|------|----------|
| `index-*.js` | 241 KB | 74 KB | App shell, router, layouts |
| `router-*.js` | 50 KB | 18 KB | Manual chunk |
| `three-*.js` | — | — | Not loaded on first paint in shim mode |
| `supabase-*.js` | 203 KB | 52 KB | Lazy on auth routes |

---

## Optimizations in place

1. **Route-level lazy loading** — All pages via `React.lazy()` in `AppRouter.tsx`
2. **Manual chunks** — `three`, `supabase`, `router` split in `vite.config.ts`
3. **Aether deferral** — Hero uses lazy `AetherBackground`; shim provides CSS gradient instead of Three.js canvas
4. **Bootstrap gate** — Feature flags load with `.catch(() => ({}))` — non-blocking
5. **CMS/nav fallbacks** — Static config when cloud CMS unavailable

---

## Recommendations

| Item | Priority | Notes |
|------|----------|-------|
| Preload hero font stack | P2 | System fonts already used — low impact |
| Image WebP for marketing | P2 | `imageConfig.formats` supports webp/avif |
| Reduce `routes-*.js` duplication | P3 | Consider merging website + platform route configs |
| Service worker / caching | P3 | Not in scope for GitHub Pages static hosting |

---

## Three.js / particles

Full `@nexus/aether` particle field loads only when sibling packages present (local dev). Production GitHub Pages uses lightweight gradient shim — acceptable tradeoff for first paint vs. bundle size.
