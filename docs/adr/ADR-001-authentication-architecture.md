# ADR-001: Authentication Architecture

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 2 — Sprint 3 Task 1

## Context

The NEXUS platform requires production-ready user authentication to replace placeholder interactions. The website deploys as a static SPA on GitHub Pages, requiring a client-compatible backend.

## Decision

Implement authentication using **Supabase Auth** with a client-side `@supabase/supabase-js` integration.

### Architecture

```
AuthProvider (React Context)
  ├── supabase.auth.getSession() — initial session restore
  ├── supabase.auth.onAuthStateChange() — live session sync
  └── Profile + settings load on authenticated state

Services Layer
  ├── authService — signUp, signIn, signOut, resetPassword, updatePassword
  └── Session persistence via Supabase client (localStorage)

Routes
  ├── /auth/login
  ├── /auth/sign-up
  ├── /auth/forgot-password
  ├── /auth/reset-password
  ├── /auth/verify-email
  ├── /account (protected)
  └── /download/studio (protected)
```

### Security Model

| Rule | Implementation |
|---|---|
| Secrets | `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` only — never service role key |
| Session | `persistSession: true`, `autoRefreshToken: true` |
| Protected routes | `ProtectedRoute` redirects unauthenticated users to login |
| Password reset | Supabase email link → `/auth/reset-password` with hash detection |
| Email verification | Supabase signup flow → `/auth/verify-email` |

### GitHub Pages Compatibility

- Supabase Auth operates entirely client-side — compatible with static hosting
- Redirect URLs must be configured in Supabase dashboard for production domain
- Build injects env vars via GitHub Actions secrets at compile time

## Consequences

**Positive:**
- Production auth without custom backend
- Session persistence across page reloads
- Extraction-ready service layer for `@nexus/platform`

**Negative:**
- Requires Supabase project configuration for live auth
- Anon key is embedded in client bundle (expected for Supabase SPA pattern)
- RLS policies must be maintained in Supabase migrations

## Future Extraction

Move to `@nexus/auth` package in `nexus-platform`:
- `AuthProvider`, `useAuth`, `ProtectedRoute`
- `authService` module
- Supabase client factory with env configuration
