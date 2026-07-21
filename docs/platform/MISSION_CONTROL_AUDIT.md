# Mission Control Audit — EPIC 71

**Date:** 2026-07-21  
**Surfaces:** Website `/admin`, nexus-cloud API, nexus-studio Command Center

---

## Website Mission Control (`/admin`)

### Default administrator landing

- `AdminLayout` sidebar lists all platform admin routes
- `AdminDashboard` (index route) is Mission Control homepage per EPIC 59/63
- Protected by `ProtectedRoute` + `RoleGuard` with `platformAdminRoles`

### Homepage sections

| Section | Source | Status |
|---------|--------|--------|
| Platform KPIs | `/v1/mission-control/homepage` | Wired — degrades gracefully offline |
| Alerts & Wizard Progress | Homepage payload | Wired |
| CI Health | `AdminCiHealthWidget` + `overviews.ciHealth` | Wired (EPIC 70) |
| Quick Actions grid | `AdminMissionControlNav` (EPIC 71) | **New** — 27 subsystem links |
| Required Actions | Homepage `requiredActions` | Wired |
| AI Recommendations | Homepage feed | Wired |
| Activity & Audit | Homepage feeds | Wired |

### Quick navigation (EPIC 71)

One-click cards for: Platform Health, Connection Orchestrator, Live Services, Repository, Cloud, GitHub, Supabase, Marketplace, Billing, CMS, Studio, SDK, Digital Twin, ROS, Automation, Executive KPIs, Alerts, Incidents, Deployment, Security, Performance, Accessibility, Production Readiness, Setup Wizard, Theme Editor, Events.

---

## Command Center panels (nexus-studio)

Existing panels per EPIC 85/110 — no duplication:

- Mission Control (default first panel)
- Production Health, Deployment Center, Website Health
- Performance Center, Accessibility Center, UX Audit
- Repository Health, CI Health, Connection Orchestrator

Website admin complements Studio Command Center; full wizard hub remains in Studio.

---

## Gaps

- Live KPI tiles require running nexus-cloud API
- Auth-gated `/admin` shows auth-unavailable notice in shim mode without Supabase
- Executive View tab is Studio-only (by design)
