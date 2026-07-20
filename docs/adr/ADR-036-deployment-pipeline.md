# ADR-036: Deployment Pipeline

**Status:** Accepted  
**Date:** 2026-07-11  
**Sprint:** EPIC 8 — Platform Integration

## Context

Integrated releases must coordinate Website, Cloud API, Studio desktop builds, SDK artifacts, OS OTA bundles, and platform npm packages.

## Decision

Adopt a **hub-and-spoke release pipeline** with Cloud as the integration gate and `platform_updates` as the canonical update manifest.

### Release Channels

| Channel | Audience | Products |
|---------|----------|----------|
| `stable` | Production users | Website, Studio, SDK, OS |
| `beta` | Partner developers | Studio, SDK |
| `canary` | Internal NEXUS team | All |

### Pipeline Stages

```
1. Platform packages (@nexus/*)  → npm build + version bump
2. Cloud API + migration         → deploy + db:migrate
3. Website                       → static build to CDN / GitHub Pages
4. Studio / SDK / OS               → artifact upload → platform_updates row
5. Update Center                 → clients poll GET /v1/integration/updates
```

### Artifact Registry

- **SDK downloads:** `GET /v1/integration/sdk/downloads` (platform, arch, version, url, checksum)
- **Studio/OS:** same updates table with `product` discriminator
- **Website:** deployed independently; version surfaced via `/v1/integration/ecosystem`

### Environment Matrix

| Environment | Cloud URL | Auth |
|-------------|-----------|------|
| development | `localhost:8787` | Supabase dev project |
| staging | `api.staging.nexus.local` | staging Supabase |
| production | `api.nexus.local` | production Supabase |

Studio and Website read `VITE_NEXUS_CLOUD_URL` at build time.

### CI Requirements (Target)

- `nexus-platform`: build + lint on every PR
- `nexus-cloud`: build + lint + migration dry-run
- `nexus-studio` / `nexus-website`: build + lint against linked platform packages
- Integration smoke: auth session → sync push → notification list

## Consequences

- Single update API for all desktop/runtime clients
- Cloud migration must run before client releases that depend on new integration tables
- Full automated CI wiring is incremental; ADR defines contract for Sprint 8+
