# NEXUS Platform Overview

> **Status:** Phase A — Incubation Document  
> **Location:** `nexus-website/docs/`  
> **Future Home:** `nexus-specifications` repository

---

## Purpose

The NEXUS Robotics ecosystem is built across multiple repositories, each with a defined role. This document describes how those repositories relate, how development progresses from incubation to production, and how engineering decisions are governed.

---

## Repository Relationships

### nexus-website (Phase A — Incubation)

**Role:** Design, validate, refine, and test new systems before they are shared across the ecosystem.

**Current responsibilities:**

- UI component development and visual validation
- Design system incubation
- Page and layout prototyping
- Motion and interaction experiments
- Integration testing against real user flows

**Lifecycle:** Components and systems proven stable in `nexus-website` are candidates for extraction into `nexus-platform`.

---

### nexus-platform (Phase B — Shared Foundation)

**Role:** Shared library consumed by all NEXUS applications.

**Target consumers:**

| Application     | Purpose                              |
|-----------------|--------------------------------------|
| Website         | Public-facing marketing and product  |
| Studio          | Robot design and simulation          |
| Marketplace     | Asset and module distribution        |
| Cloud           | Fleet management and telemetry       |
| SDK             | Developer tools and integrations     |

**Expected contents after extraction:**

- Design system tokens and theme
- Shared UI components (Button, GlassPanel, Navigation, etc.)
- Layout primitives
- Motion system utilities
- Aether visual effects (Mist, Particles, Formation)
- Shared hooks, services, and utilities

---

### nexus-specifications (Single Source of Truth)

**Role:** Authoritative engineering documentation for the entire NEXUS ecosystem.

**Planned contents:**

- Architecture Decision Records (ADRs)
- Engineering Standards
- UI Design Standards
- Motion Standards
- API Specifications
- Database Schemas
- Coding Standards
- Robot Communication Standards
- Release Notes
- Sprint Documentation
- Long-Term Roadmap

**Governance:** All engineering decisions are documented here. Implementation repositories (`nexus-website`, `nexus-platform`, and application repos) follow specifications defined in `nexus-specifications`.

---

## Phase A → Phase B Migration Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     PHASE A — INCUBATION                    │
│                      (nexus-website)                        │
│                                                             │
│   Design → Validate → Refine → Test → Stabilize            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │  Extraction (stable systems only)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   PHASE B — SHARED PLATFORM                 │
│                      (nexus-platform)                       │
│                                                             │
│   Published as shared package consumed by all apps          │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      Website          Studio         Marketplace
           │               │               │
           └───────────────┼───────────────┘
                           ▼
                    Cloud / SDK
```

### Migration Criteria

A system is ready for extraction when it meets all of the following:

1. **Stable API** — Public interface is finalized and documented
2. **Design approved** — Matches locked NEXUS design language
3. **Tested** — Validated in `nexus-website` under real usage
4. **Decoupled** — No website-specific business logic embedded
5. **Documented** — Specification written for `nexus-specifications`

### Migration Process

1. Identify stable component or system in `nexus-website`
2. Write or update specification in `nexus-specifications`
3. Extract code into `nexus-platform` with versioned release
4. Update `nexus-website` to consume from `nexus-platform`
5. Propagate to Studio, Marketplace, Cloud, and SDK as needed

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    nexus-specifications                          │
│              (Single Source of Truth — Docs & ADRs)              │
└───────────────────────────────┬──────────────────────────────────┘
                                │ governs
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      nexus-platform                              │
│         Design System · Components · Hooks · Services            │
└───────┬──────────────┬──────────────┬──────────────┬───────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
   nexus-website  nexus-studio  nexus-marketplace  nexus-cloud
   (Phase A)                                        nexus-sdk
```

### Layer Responsibilities

| Layer                  | Responsibility                                      |
|------------------------|-----------------------------------------------------|
| Specifications         | What to build and why                               |
| Platform               | How to build it consistently                        |
| Applications           | What users experience                               |

---

## Engineering Workflow

### Sprint Cycle

1. **Specification** — Requirements and standards defined (future: in `nexus-specifications`)
2. **Incubation** — Implementation and validation in `nexus-website`
3. **Review** — Design, code, and architecture review before approval
4. **Stabilization** — Refinement until acceptance criteria are met
5. **Extraction** — Migration to `nexus-platform` when stable
6. **Distribution** — Consumption across ecosystem applications

### Development Rules (Locked)

- Never redesign without specification approval
- Never duplicate components across repositories
- Always reuse existing platform components when available
- Never install packages without explicit instruction
- Never continue to the next sprint without approval
- Document all architectural decisions for future ADR migration

### Design Language (Locked)

**Colors:** Deep Space Black · Soft Graphite · Silver Mist · Pearl White · Champagne · Rose Gold

**Style:** Premium · Luxury Industrial · Apple-quality · Glassmorphism · Minimal · Elegant

**Motion:** Mist → Particles → Formation → Materialization → Interaction → Dissolution → Mist

---

## Document Migration Plan

This document (`docs/NEXUS_PLATFORM_OVERVIEW.md`) is a **temporary incubation artifact**.

When `nexus-specifications` is established:

1. Migrate this document to `nexus-specifications/platform/OVERVIEW.md`
2. Expand with formal ADRs for repository boundaries
3. Add cross-links to UI, motion, and API standards
4. Remove duplicate from `nexus-website` or replace with a pointer

---

## Current Sprint Context

**Sprint 1 — Task 2:** NEXUS Design System Foundation

The design system tokens (`src/styles/`) created in this sprint are the first stable system candidate for future `nexus-platform` extraction. Token values map to the locked NEXUS color palette and will propagate to all ecosystem applications once extracted.

**Sprint 1 — Task 3:** Core UI Framework + Navigation + Hero Foundation

The reusable UI framework and website shell are now established. All components consume design tokens via CSS custom properties — no hardcoded values in component styles.

**Sprint 2 — Task 1:** AETHER ENGINE + Advanced Design System

The reusable Aether Engine is now implemented. It powers the Hero background and is designed for extraction into `nexus-platform` as `@nexus/aether`.

**Sprint 2 — Task 2:** Website Experience + Production Foundation

The website is prepared for its first production deployment on GitHub Pages with full routing, externalized configuration, SEO, accessibility, and code splitting.

**Sprint 3 — Task 1:** Cloud Foundation + Authentication + User System

Supabase-backed authentication, user profiles, role system, protected routes, and authenticated download placeholder are integrated. Preparing for v0.1.0 release.

**Sprint 3 — Task 2:** Developer Portal + Sponsor Portal + Download Center

Production-ready authenticated portal experiences with role-based permissions, centralized download catalog, and analytics tracking.

**Sprint 4 — Task 1:** Platform Extraction to `nexus-platform`

Seven scoped packages extracted into the `nexus-platform` monorepo. `nexus-website` consumes shared code via `@nexus/*` re-export shims — zero duplicated implementations.

**Sprint 5 — Task 1:** v0.2.0 Beta Production Website

Extended Developer Platform (11 dashboard sections), Behavior Workspace foundation, SDK documentation architecture, content platform (docs hub, blog, releases, changelog), and enhanced SEO with build-time sitemap and structured data.

**Sprint 5 — Task 2:** Behavior SDK, Marketplace Pipeline, Digital Twin Preparation

Behavior package specification (behavior.json v1.0.0), 11-stage distribution pipeline, seven SDK API contracts, CLI specification, Digital Twin interfaces, marketplace foundation, ecosystem ownership registry, and architecture docs at `/docs/architecture`.

---

## Sprint 5 — Task 1: v0.2.0 Beta Production Website

### Developer Platform Extension

Eleven dashboard sections and eight additional portal routes extend the Sprint 3 Developer Portal. Website-owned features incubate in `nexus-website`; base portal contract remains stable in `@nexus/config`.

| Section | Status | Route |
|---|---|---|
| Projects | beta | `/developers/portal/projects` |
| SDK Downloads | beta | `/developers/portal/sdk` |
| Applications | architecture | `/developers/portal/applications` |
| Organizations | architecture | `/developers/portal/organizations` |
| Robot Registry | architecture | `/developers/portal/robot-registry` |
| Behavior Library | beta | `/developers/portal/behaviors` |
| Simulation Jobs | architecture | `/developers/portal/simulation` |
| Marketplace Uploads | architecture | `/developers/portal/marketplace-uploads` |
| Release History | architecture | `/developers/portal/release-history` |
| Developer Analytics | beta | `/developers/portal/analytics` |
| API Keys | beta | `/developers/portal/api-keys` |

Analytics integration via `@nexus/analytics`: portal visit tracking in `PortalLayout`, download events in `DeveloperSdk`, dashboard metrics in `DeveloperDashboard`.

### Behavior Workspace

Client-only behavior authoring with typed metadata schema, full lifecycle (draft → version → publish → archive), and `localStorage` persistence (`nexus-behavior-workspace-v1`). No on-robot execution — deferred to `nexus-os`. Cloud persistence deferred to `nexus-cloud`.

| Route | Component |
|---|---|
| `/developers/portal/behaviors` | `BehaviorList` |
| `/developers/portal/behaviors/new` | `BehaviorEditor` |
| `/developers/portal/behaviors/:behaviorId` | `BehaviorDetail` |

### SDK Documentation Architecture

Website hosts documentation routes and section catalog; `nexus-sdk` owns `@nexus/sdk-*` package implementations.

| Package | Status |
|---|---|
| `@nexus/sdk-core` | beta |
| `@nexus/sdk-behavior` | beta |
| `@nexus/sdk-motion` | planned |
| `@nexus/sdk-vision` | planned |
| `@nexus/sdk-ai` | planned |
| `@nexus/sdk-cloud` | planned |
| `@nexus/sdk-fleet` | planned |
| `@nexus/sdk-simulation` | planned |

14 SDK documentation sections at `/docs/sdk/:sectionId`. Docs hub at `/docs`.

### Content Platform

Static TypeScript content catalogs — no CMS during incubation.

| Route | Content |
|---|---|
| `/docs` | Documentation hub |
| `/docs/sdk` | SDK documentation |
| `/docs/api`, `/docs/tutorials`, `/docs/guides`, `/docs/examples` | Section articles |
| `/blog`, `/blog/:slug` | Engineering blog |
| `/releases` | Release notes (0.1.0, 0.2.0) |
| `/changelog` | Granular change log |

Unified search via `NavSearch` across routes, docs, and blog. `ContentLayout` with sidebar navigation and breadcrumbs.

### SEO Enhancements

| Asset | Implementation |
|---|---|
| PageMeta | Per-route title, description, Open Graph, Twitter cards |
| StructuredData | JSON-LD (`WebSite`, `Article`) on docs and blog pages |
| Sitemap | Build-time generation (`scripts/generate-sitemap.mjs` → `public/sitemap.xml`) |
| robots.txt | Allow all; references sitemap URL |

24 static paths in sitemap. Portal routes excluded (auth-gated).

### Feature Flags

| Flag | Capability |
|---|---|
| `developerPlatformExtended` | Extended developer portal sections |
| `behaviorWorkspace` | Behavior authoring UI |
| `contentPlatform` | Docs hub, blog, releases, changelog |
| `sdkDocumentation` | SDK docs routes and package roadmap |
| `navSearch` | Unified content search |
| `structuredMetadata` | JSON-LD structured data |

### ADRs

| ADR | Topic |
|---|---|
| `docs/adr/ADR-008-developer-platform.md` | Developer Platform architecture |
| `docs/adr/ADR-009-behavior-workspace.md` | Behavior Workspace schema and lifecycle |
| `docs/adr/ADR-010-sdk-architecture.md` | SDK documentation architecture |
| `docs/adr/ADR-011-documentation-platform.md` | Content platform and SEO |

---

## Sprint 5 — Task 2: Behavior SDK & Marketplace Architecture

Architecture-only sprint — no hardware runtime, no robot control, no simulation engine.

### Behavior Package Format (nexus-sdk)

| Artifact | Location |
|---|---|
| `behavior.json` schema v1.0.0 | `src/behavior/package/manifest.ts` |
| Validation rules | `src/behavior/package/validation.ts` |
| Directory layout | `assets/`, `motions/`, `voice/`, `vision/`, `scripts/`, `tests/`, `simulation/`, `examples/` |

### Behavior Pipeline

Create → Validate → Security Scan → Simulate → Compatibility → Review → Approval → Marketplace → Robot Installation → Analytics → Updates

Each stage has explicit repository ownership (`src/behavior/pipeline/stages.ts`).

### SDK Architecture (nexus-sdk)

| Module | API Contract |
|---|---|
| `@nexus/sdk-behavior` | Create, validate, package, publish, install, update |
| `@nexus/sdk-motion` | Trajectory planning and execution |
| `@nexus/sdk-vision` | Camera streams and inference |
| `@nexus/sdk-ai` | Planning, speech, memory |
| `@nexus/sdk-simulation` | Simulation sessions and telemetry |
| `@nexus/sdk-cloud` | Auth, registry, OTA |
| `@nexus/sdk-fleet` | Fleet deploy and rollback |

CLI: `nexus init` through `nexus update` (`src/sdk/cli/commands.ts`).

### Digital Twin Interfaces (nexus-sdk)

Robot, Joint, Motor, Battery, Camera, Sensor, Controller, Physics, BehaviorRuntime, SimulationSession, Telemetry — `src/sdk/digital-twin/interfaces.ts`. No engine implementation.

### Marketplace Foundation (nexus-marketplace)

Registry, publishing flow, review system (automated/manual/hybrid), compatibility checks, and update/rollback policy — `src/marketplace/`.

### Architecture Documentation

Public specs at `/docs/architecture/:docId` — behavior package, marketplace pipeline, SDK CLI, Digital Twin, ecosystem ownership, design governance.

### ADRs

| ADR | Topic |
|---|---|
| `docs/adr/ADR-012-behavior-package-specification.md` | behavior.json spec |
| `docs/adr/ADR-013-marketplace-pipeline.md` | Marketplace pipeline |
| `docs/adr/ADR-014-sdk-cli.md` | SDK CLI architecture |
| `docs/adr/ADR-015-digital-twin-interfaces.md` | Digital Twin interfaces |
| `docs/adr/ADR-016-ecosystem-ownership-validation.md` | Ownership + design governance |

---

## Sprint 4 — Task 1: Platform Extraction

### Extracted Packages

| Package | Source (nexus-website) | Status |
|---|---|---|
| `@nexus/theme` | `src/styles/` | Extracted |
| `@nexus/ui` | `src/components/ui/` | Extracted |
| `@nexus/aether` | `src/components/aether/` | Extracted |
| `@nexus/config` | `src/config/` | Extracted |
| `@nexus/auth` | `src/services/auth/`, `src/contexts/AuthProvider`, guards | Extracted |
| `@nexus/downloads` | `src/components/downloads/`, download services | Extracted |
| `@nexus/analytics` | `src/services/analytics/` | Extracted |

### Monorepo Structure

```
nexus-platform/
├── packages/
│   ├── theme/
│   ├── ui/
│   ├── aether/
│   ├── config/
│   ├── auth/
│   ├── downloads/
│   └── analytics/
├── docs/NEXUS_PLATFORM_OVERVIEW.md
└── README.md
```

Each package includes `package.json`, `README.md`, and `CHANGELOG.md` at version **0.1.0**.

### Dependency Graph

```
Applications (nexus-website, Studio, …)
        ↓
@nexus/downloads ──→ @nexus/analytics ──→ @nexus/auth ──→ @nexus/config
        │                    │                  │
        └────────────────────┴──────────────────┴──→ @nexus/ui
        │
        └──→ @nexus/aether ──→ @nexus/theme
```

### Migration Pattern

1. Code moved to owning package `src/`
2. Public API exported from package `index.ts`
3. `nexus-website` re-exports from `@nexus/*` (backwards-compatible paths)
4. Verified: `npm run build`, `npm run lint`, TypeScript clean

### ADR

| ADR | Topic |
|---|---|
| `docs/adr/ADR-007-shared-package-strategy.md` | Package ownership, dependency rules, versioning |

---

## Sprint 3 — Task 2: Portals & Download Center

### Portal Architecture

```
ProtectedRoute
  └── RoleGuard
        └── PortalLayout (sidebar + analytics)
              └── Portal Page (Outlet)
```

| Portal | Base Route | Roles |
|---|---|---|
| Developer Portal | `/developers/portal` | developer, administrator |
| Sponsor Portal | `/sponsors/portal` | sponsor, administrator |
| Download Center | `/downloads` | all authenticated (permission-gated items) |

### Permission Model

| Role | Portal Access | Key Downloads |
|---|---|---|
| Visitor | — | Studio, Docs, Release Notes |
| Developer | Developer Portal | + SDK, Firmware, API Keys |
| Sponsor | Sponsor Portal | + Sponsor Roadmap |
| Administrator | All | All permissions |

### Configuration Externalized

| Config | Location |
|---|---|
| Portal navigation | `config/portals.ts` |
| Download catalog | `config/portals.ts` |
| Permission map | `config/permissions.ts` |
| Sponsorship tiers | `config/portals.ts` |

### Analytics

| Metric | Source |
|---|---|
| Download tracking | `downloads` table |
| Portal visits | `portal_events` table |
| Dashboard metrics | `getDashboardMetrics()` |

Migration: `supabase/migrations/002_portal_analytics.sql`

### ADRs

| ADR | Topic |
|---|---|
| `ADR-004-portal-architecture.md` | Portal layout and routing |
| `ADR-005-permission-model.md` | Role-based permission keys |
| `ADR-006-download-architecture.md` | Download catalog and tracking |

---

## Sprint 3 — Task 1: Cloud Foundation

### Authentication Flow

```
Sign Up → Email Verification → Login → Session (localStorage)
                ↓
         Profile auto-created (visitor role)
                ↓
    Account Settings / Protected Downloads
                ↓
            Logout → Session cleared
```

| Flow | Route | Service |
|---|---|---|
| Sign Up | `/auth/sign-up` | `signUp()` |
| Login | `/auth/login` | `signIn()` |
| Logout | Navigation action | `signOut()` |
| Password Reset | `/auth/forgot-password` | `resetPassword()` |
| Set Password | `/auth/reset-password` | `updatePassword()` |
| Email Verify | `/auth/verify-email` | `resendVerificationEmail()` |
| Account | `/account` (protected) | Profile + settings |
| Studio Download | `/download/studio` (protected) | `initiateStudioDownload()` |

### Database Schema

| Table | Purpose |
|---|---|
| `roles` | visitor, developer, sponsor, administrator |
| `organizations` | Organization entities |
| `profiles` | User identity (extends auth.users) |
| `user_settings` | Notification and theme preferences |
| `downloads` | Authenticated download tracking |
| `beta_programs` | Beta program registry |

Migration: `supabase/migrations/001_initial_schema.sql`

### Architecture

```
main.tsx
  └── AuthProvider
        └── App → AppRouter
              ├── Public routes
              └── ProtectedRoute
                    ├── /account
                    └── /download/studio
```

### ADRs

| ADR | Topic |
|---|---|
| `docs/adr/ADR-001-authentication-architecture.md` | Supabase Auth, session, protected routes |
| `docs/adr/ADR-002-role-system.md` | Four-role model, RLS, assignment |
| `docs/adr/ADR-003-profile-system.md` | Profiles, settings, avatar storage |

### Environment Variables

| Variable | Required | Exposure |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes (live auth) | Client-safe |
| `VITE_SUPABASE_ANON_KEY` | Yes (live auth) | Client-safe (anon only) |

**Never expose:** Supabase service role key.

### Future Extraction

| Module | Target Package | Status |
|---|---|---|
| `src/services/auth/` | `@nexus/auth` | Done (Sprint 4 Task 1) |
| `src/services/profile/` | `@nexus/auth` | Done (Sprint 4 Task 1) |
| `src/contexts/AuthProvider` | `@nexus/auth` | Done (Sprint 4 Task 1) |
| `src/components/auth/` | `@nexus/ui` | Remaining (app-specific layouts) |
| `supabase/migrations/` | `nexus-platform` infra | Remaining |

---

## Sprint 2 — Task 2: Production Foundation

### Routing Architecture

```
main.tsx
  └── App (BrowserRouter + basename)
        ├── ScrollToTop
        └── AppRouter (Suspense + lazy routes)
              └── MainLayout (Outlet)
                    ├── Navigation (NavLink + config)
                    ├── Page Content (lazy-loaded)
                    └── Footer (config-driven links)
```

| Route | Path | Page |
|---|---|---|
| Home | `/` | Hero + Aether (lazy) |
| Atlas | `/atlas` | PageShell |
| Nova | `/nova` | PageShell |
| Sentinel | `/sentinel` | PageShell |
| Studio | `/studio` | PageShell |
| Marketplace | `/marketplace` | PageShell |
| Developers | `/developers` | PageShell |
| Sponsors | `/sponsors` | PageShell |
| Documentation | `/documentation` | PageShell |
| Roadmap | `/roadmap` | PageShell |
| Contact | `/contact` | PageShell |
| 404 | `*` | NotFound |

**Features:** Active page indicator · Scroll restoration · Lazy-loaded routes · Code-split Three.js chunk

### Configuration Architecture

All site-wide data is externalized in `src/config/` for future `@nexus/config` extraction:

```
src/config/
├── routes.ts       — Paths, titles, SEO descriptions
├── navigation.ts   — Header nav links + sponsor CTA
├── footer.ts       — Footer column definitions
├── social.ts       — Social media links
├── company.ts      — Company metadata, default SEO, image config
├── site.ts         — Deployment target, base path, site URL
└── index.ts        — Barrel exports
```

**Consumption:** Navigation, Footer, PageMeta, and PageShell all read from config — no hardcoded links in components.

### Deployment Architecture

```
GitHub Push (main)
  └── .github/workflows/deploy.yml
        ├── npm ci
        ├── npm run build:pages
        │     ├── VITE_BASE_PATH=/nexus-website/
        │     ├── VITE_SITE_URL=https://nexuseos.github.io/nexus-website
        │     ├── vite build
        │     └── cp index.html → 404.html (SPA fallback)
        └── deploy-pages → GitHub Pages
```

| Setting | Value |
|---|---|
| Platform | GitHub Pages |
| Repository | NEXUSEOS/nexus-website |
| Base path | `/nexus-website/` |
| Production URL | https://nexuseos.github.io/nexus-website/ |
| SPA fallback | `404.html` (copy of `index.html`) |

**Local commands:**

- `npm run dev` — Development at `/`
- `npm run build` — Standard production build
- `npm run build:pages` — GitHub Pages build with base path
- `npm run preview:pages` — Preview Pages build locally

### SEO & Public Assets

| Asset | Location |
|---|---|
| Page titles / meta | `PageMeta` component (per-route) |
| Default meta | `index.html` + `config/company.ts` |
| Open Graph | Placeholder tags via PageMeta |
| Favicon | `public/favicon.svg` |
| robots.txt | `public/robots.txt` |
| sitemap.xml | `public/sitemap.xml` (placeholder) |

### Accessibility

- Skip-to-content link (`SkipLink`)
- Semantic HTML (`nav`, `main`, `footer`, `ul/li` nav)
- ARIA labels on navigation and social links
- `:focus-visible` states on all interactive elements
- Keyboard-navigable routing via React Router `Link` / `NavLink`

### Performance

- All routes lazy-loaded via `React.lazy()`
- Aether Engine lazy-loaded via `AetherBackground` chunk (~7 KB + Three.js ~885 KB separate)
- Manual chunk splitting: `three`, `router`
- Image optimization config placeholder in `config/company.ts`

### Future Platform Extraction

| Config Module | Target Package | Status |
|---|---|---|
| `routes.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |
| `navigation.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |
| `footer.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |
| `social.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |
| `company.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |
| `site.ts` | `@nexus/config` | Done (Sprint 4 Task 1) |

Per-app deployment overrides remain in consuming applications at build time.

---

## Sprint 2 — Task 1: AETHER ENGINE

### Purpose

The Aether Engine is the visual identity system of NEXUS. It provides cinematic particle atmospherics, depth, mist, and glow — reusable across Website, Studio, Marketplace, Cloud, Developer Portal, Sponsor Portal, Digital Twin, and future desktop UI.

### Architecture

```
AetherProvider (context controller)
├── MouseField (cursor tracking — window-level)
├── FormationEngine (API registration — deferred visual)
├── MaterializationLayer (API registration — deferred visual)
├── DissolveLayer (API registration — deferred visual)
└── ParticleCanvas (R3F Canvas)
      └── AetherScene
            ├── DepthFog
            ├── AmbientGlow
            ├── MistLayer
            └── ParticleField
```

### Component Responsibilities

| Component | Type | Responsibility |
|---|---|---|
| **AetherProvider** | Controller | Theme tokens, mouse state, performance tier, formation/materialization/dissolve APIs |
| **ParticleCanvas** | Renderer | R3F Canvas setup, responsive resize, animation loop, performance defaults |
| **AetherScene** | Composer | Assembles all rendered 3D layers inside the canvas |
| **ParticleField** | Visual | Floating particles with organic drift, depth/opacity variation, gentle mouse reaction |
| **MistLayer** | Visual | Animated procedural fog planes with subtle cinematic drift |
| **DepthFog** | Visual | Three.js atmospheric fog for layered depth |
| **AmbientGlow** | Visual | Soft champagne point light + emissive sphere |
| **MouseField** | Input | Normalized cursor coordinates fed to ParticleField |
| **FormationEngine** | API | `prepare`, `start`, `reset` — logo formation not implemented |
| **MaterializationLayer** | API | `start`, `setProgress`, `reset` — visual deferred |
| **DissolveLayer** | API | `start`, `setProgress`, `reset` — visual deferred |

### Hooks

| Hook | Purpose |
|---|---|
| `useAether()` | Access full engine context |
| `useFormationEngine()` | Formation state + controls |
| `useMaterializationLayer()` | Materialization state + controls |
| `useDissolveLayer()` | Dissolve state + controls |

### Component Inventory

```
src/components/aether/
├── AetherProvider.tsx
├── AetherScene.tsx
├── ParticleCanvas.tsx / ParticleCanvas.css
├── ParticleField.tsx
├── MistLayer.tsx
├── DepthFog.tsx
├── AmbientGlow.tsx
├── MouseField.tsx
├── FormationEngine.tsx
├── MaterializationLayer.tsx
├── DissolveLayer.tsx
├── aetherContext.ts
├── types.ts
├── utils.ts
├── useAether.ts
├── useFormationEngine.ts
├── useMaterializationLayer.ts
├── useDissolveLayer.ts
└── index.ts
```

### Design Token Integration

All Aether colors are sourced from `theme.colors` via `createAetherTheme()` in `utils.ts`. No hardcoded hex values in component files.

### Hero Integration

The Hero mounts `<AetherProvider>` + `<ParticleCanvas />` inside `hero__aether`. The canvas uses `pointer-events: none` so foreground content and CTAs remain fully interactive.

### Future Platform Extraction

| Target Package | Contents | Status |
|---|---|---|
| `@nexus/aether` | Full engine: provider, canvas, layers, hooks, types | Done (Sprint 4 Task 1) |
| `@nexus/theme` | Design tokens — Aether consumes theme at runtime | Done (Sprint 4 Task 1) |

**Remaining work:**

- Lazy-load Three.js via dynamic `import()` to reduce initial bundle size
- Document motion/performance ADR in `nexus-specifications`
- Implement FormationEngine visual logic (logo formation)
- Implement MaterializationLayer and DissolveLayer visuals
- Add performance auto-detection (device tier → particle count)

### Performance Notes

- Particle counts scale by tier: `low` 800 · `medium` 1500 · `high` 2500
- Canvas `dpr` capped at `[1, 1.5]` for GPU efficiency
- `powerPreference: 'high-performance'` on WebGL context
- Transparent layers use `depthWrite: false` to reduce overdraw
- Mouse tracking uses passive window listener (no canvas pointer capture)
- **Bundle impact:** Three.js + R3F adds ~1 MB to production bundle — code-splitting recommended before platform extraction

---

## Sprint 1 — Task 3: UI Framework Summary

### Shell Components

| Component    | Location                              | Status      |
|--------------|---------------------------------------|-------------|
| Navigation   | `src/components/navigation/`          | Complete    |
| Hero         | `src/components/hero/`                  | Complete    |
| Footer       | `src/components/layout/`              | Complete    |
| MainLayout   | `src/layouts/`                        | Complete    |

### UI Component Library

| Component    | Variants / Features                   | Location              |
|--------------|---------------------------------------|-----------------------|
| Button       | `primary`, `secondary`, `ghost`       | `src/components/ui/`  |
| GlassPanel   | Glassmorphism container               | `src/components/ui/`  |
| Container    | Responsive max-width wrapper          | `src/components/ui/`  |
| Section      | `default`, `compact`, `flush`         | `src/components/ui/`  |
| Heading      | `display`, `heading`, `title`         | `src/components/ui/`  |
| Text         | `body`, `caption`, `muted`            | `src/components/ui/`  |

### Component Inventory

```
src/components/
├── ui/
│   ├── Button.tsx / Button.css
│   ├── GlassPanel.tsx / GlassPanel.css
│   ├── Container.tsx / Container.css
│   ├── Section.tsx / Section.css
│   ├── Heading.tsx / Heading.css
│   ├── Text.tsx / Text.css
│   └── index.ts
├── navigation/
│   ├── Navigation.tsx / Navigation.css
│   └── index.ts
├── hero/
│   ├── Hero.tsx / Hero.css
│   └── index.ts
└── layout/
    ├── Footer.tsx / Footer.css
    └── index.ts
```

### Future Extraction Notes

**Extracted (Sprint 4 Task 1):**

1. **Design System (`src/styles/`)** → `@nexus/theme`
2. **UI Primitives (`src/components/ui/`)** → `@nexus/ui`
3. **Aether Engine (`src/components/aether/`)** → `@nexus/aether`
4. **Configuration (`src/config/`)** → `@nexus/config`
5. **Authentication (`src/services/auth/`, AuthProvider, guards)** → `@nexus/auth`
6. **Download Center (`src/components/downloads/`, services)** → `@nexus/downloads`
7. **Analytics (`src/services/analytics/`)** → `@nexus/analytics`

**Remaining candidates:**

1. **Layout Shell (`src/layouts/MainLayout`)** — App shell pattern (parameterize nav/footer slots for multi-app use)
2. **Navigation (`src/components/navigation/`)** — Config externalized; component extraction deferred
3. **Footer (`src/components/layout/Footer`)** — Config externalized; component extraction deferred
4. **Auth UI (`src/components/auth/`)** — App-specific layouts (AuthLayout, PortalLayout)
5. **Hero (`src/components/hero/`)** — Website-specific copy and CTA labels
6. **Supabase migrations** — Shared infra package TBD

**Next steps:**

- Generalize layout shell and navigation/footer into `@nexus/ui`
- Document component APIs in `nexus-specifications`
- Enable private registry publishing for semver consumption

---

*Last updated: Sprint 5, Task 2 — 2026-07-10*
