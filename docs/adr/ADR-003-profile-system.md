# ADR-003: Profile System

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 1

## Context

Authenticated users require persistent profiles with identity, organization affiliation, preferences, and avatar support across the NEXUS ecosystem.

## Decision

Implement user profiles as a **Supabase-backed extension of `auth.users`** with related settings and storage.

### Data Model

```
auth.users
  └── profiles (1:1)
        ├── username, full_name, avatar_url
        ├── organization_id → organizations
        └── role_id → roles
  └── user_settings (1:1)
        ├── email_notifications
        ├── marketing_emails
        └── theme_preference
```

### Profile Fields

| Field | Source | Editable |
|---|---|---|
| Avatar | Supabase Storage (`avatars` bucket) or initials placeholder | Yes |
| Name | `profiles.full_name` | Yes |
| Username | `profiles.username` (unique) | Yes |
| Organization | `profiles.organization_id` | Read-only (admin assigned) |
| Role | `profiles.role_id` | Read-only (admin assigned) |

### Lifecycle

1. User signs up via Supabase Auth
2. `handle_new_user()` trigger creates `profiles` + `user_settings` rows
3. `AuthProvider` loads profile and settings on session establish
4. Account Settings page allows profile and preference updates

### Storage

- Avatar uploads target `avatars/{userId}/avatar.{ext}` bucket
- Public URL stored in `profiles.avatar_url`
- Placeholder initials rendered when no avatar URL exists

## Consequences

**Positive:**
- Complete user identity model ready for platform extraction
- Separated settings from profile data
- Avatar support with graceful placeholder fallback

**Negative:**
- Requires Supabase Storage bucket configuration
- Organization assignment requires future admin tooling

## Future Extraction

Move to `@nexus/profile` package in `nexus-platform`:
- `ProfileAvatar`, `ProfileForm` components
- `profileService` module
- Profile types and update payloads
