# Rendering Report — EPIC 71

**Date:** 2026-07-21  
**Supersedes:** `WEBSITE_RENDER_REPORT.md` (EPIC 71 UI Recovery)

---

## Build Verification

```bash
VITE_FORCE_SHIMS=true npm run build:pages
# ✓ 324 modules, index-BohJWwqk.js (241 KB), index-CB3gga7C.css (24 KB)
```

CSS bundle includes `:root` design tokens (verified in EPIC 71 UI Recovery).

---

## Route Rendering (Preview)

| Route | Playwright / Manual | Body Content |
|-------|---------------------|--------------|
| `/` | PASS | Title matches /NEXUS/i |
| `/status` | PASS | Body visible |
| `/admin` | PASS | Mission Control heading, KPI grid, service tiles |
| `/admin/connections` | PASS | Health matrix cards |

---

## Live Site (GitHub Pages)

**URL:** https://nexuseos.github.io/NEXUS-website/

| Route | HTTP | SPA Fallback |
|-------|------|--------------|
| `/` | 200 | Yes |
| `/about`, `/marketplace`, `/pricing`, `/status`, `/sdk`, `/admin` | 404* | Yes (1926 bytes index.html) |

*GitHub Pages SPA routing — client-side router handles navigation after load.

---

## React Errors

- Pre-fix: null shim exports caused white screen
- Post-fix: No React runtime errors on home page (EPIC 71 UI Recovery verified)
- Post live-integration: Admin pages render degraded state without throwing

---

## Assets (Latest Build)

- `AdminDashboard--BLji1oW.js` — Mission Control with service tiles
- `AdminConnections-D3ojwDOF.js` — Connection Orchestrator health matrix
- `connectionOrchestratorService-CblqY1nn.js` — API client + fallback
