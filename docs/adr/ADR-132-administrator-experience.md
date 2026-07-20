# ADR-132: Administrator Experience

## Status
Accepted — PROGRAM ALPHA Phase 1

## Context
Platform administrators need a single login, first-login dashboard, and Command Center workspace covering all operational modules with real data.

## Decision

- **Unified login**: Supabase JWT across Website, Studio, Command Center, Developer Portal, Sponsor Portal, Marketplace
- **First-login dashboard** (`GET /v1/platform-ops/admin/dashboard`): platform health, startup score, connection checklist, outstanding tasks, security recommendations, live org/member/marketplace/CMS/audit counts
- **Command Center panels**: Setup Wizard (auto-launch when uninitialized), Platform Operations, Administrator Dashboard, Connections Workspace
- **Platform Operations sections**: Infrastructure, Connections, Database, Authentication, Marketplace, CMS, Organizations, Storage, Security, Analytics, System Health, Notifications, Updates

## Consequences
- Admin dashboard requires platform admin RBAC (`requirePlatformAdmin`)
- Setup wizard hidden in Studio once platform is initialized
