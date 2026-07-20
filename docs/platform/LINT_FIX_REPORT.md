# Lint Fix Report — EPIC 70

**Date:** 2026-07-20  
**Repository:** nexus-website

---

## Summary

Fixed **12 ESLint errors** and **2 warnings** without disabling rules or suppressing React Hook lint.

---

## Issues Resolved

| Rule | File | Fix |
|------|------|-----|
| `react-refresh/only-export-components` | `src/main.tsx` | Moved `Bootstrap` to `src/Bootstrap.tsx`; `main.tsx` is entry-only |
| `react-hooks/set-state-in-effect` | `AdminDashboard.tsx` | `useAsyncMount(refresh)` hook |
| `react-hooks/set-state-in-effect` | `AdminCmsBuilder.tsx` | `useAsyncMount` + `useMemo` for CMS client |
| `react-hooks/exhaustive-deps` | `AdminCmsBuilder.tsx` | Added `client` to `refreshPages` deps |
| `react-hooks/set-state-in-effect` | `AdminConnections.tsx` | `useAsyncMount(refresh)` |
| `react-hooks/set-state-in-effect` | `AdminInstallation.tsx` | `useAsyncMount(refresh)` |
| `react-hooks/set-state-in-effect` | `AdminSecrets.tsx` | `useCallback` + `useAsyncMount` |
| `react-hooks/exhaustive-deps` | `AdminSecrets.tsx` | Stable `refresh` via `useCallback` |
| `react-hooks/set-state-in-effect` | `AdminSetup.tsx` | `useAsyncMount(load)` |
| `react-hooks/set-state-in-effect` | `BlogPost.tsx` | Initial state from `slug`; async fetch in `.then()` only |
| `react-hooks/set-state-in-effect` | `CheckoutSuccessPage.tsx` | Lazy initial status; skip sync setState when no session |
| `react-hooks/immutability` | `PricingPage.tsx` | `redirectToExternalUrl()` via anchor click |
| `react-hooks/set-state-in-effect` | `DeveloperAiAssistant.tsx` | `initialOrgError()` lazy state initializer |
| `react-hooks/set-state-in-effect` | `DeveloperProjects.tsx` | `useCallback` + `useAsyncMount` |

---

## New Utilities

| File | Purpose |
|------|---------|
| `src/hooks/useAsyncMount.ts` | Defers async mount work to satisfy `set-state-in-effect` |
| `src/Bootstrap.tsx` | App bootstrap (theme + feature flags) |
| `src/utils/redirect.ts` | External redirect without mutating `window.location` |

---

## Verification

```bash
cd /Users/goober/nexus-website
npm run lint   # exit 0
npm run build  # exit 0
```
