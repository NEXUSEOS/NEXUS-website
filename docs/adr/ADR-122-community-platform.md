# ADR-122: Community Platform

## Status
Accepted — EPIC 32

## Context
Developers, sponsors, and customers need native community features: profiles, forums, messaging, events, achievements, reputation, leaderboards, and activity feeds. Prior launch integrations only referenced external forums.

## Decision
Implement `createCommunityService` in `@nexus-cloud/business-platform`:

- Tables: `community_profiles`, `community_forums`, `community_threads`, `community_posts`, `community_messages`, `community_events`, `community_followers`, `community_achievements`, `community_user_achievements`, `community_activity`, `community_leaderboard`
- Seeded forums: general, developers, marketplace
- API: `/v1/business/community/*`
- Command Center **Community** panel

Marketplace reviews remain in marketplace schema; community adds social layer on top.

## Consequences
- Organization-scoped and user-scoped profiles (developer, sponsor types)
- Reputation points flow into leaderboard rankings
- Activity feed supports follower-based filtering
