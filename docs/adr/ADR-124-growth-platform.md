# ADR-124: Growth Platform

## Status
Accepted — EPIC 32

## Context
NEXUS requires referral programs, affiliate tracking, email campaigns, newsletter subscriptions, launch campaign management, and beta invitation coordination.

## Decision
Implement `createGrowthService`:

- Tables: `growth_referrals`, `growth_affiliates`, `growth_campaigns`, `growth_newsletter_subscribers`, `growth_launch_campaigns`
- Public newsletter subscribe endpoint
- Referral code generation and redemption with reward credits
- Launch campaigns with beta slot tracking
- API: `/v1/business/growth/*`
- Command Center **Marketing** and **Growth** panels

Email delivery delegates to existing CMS email templates and Resend connection when configured.

## Consequences
- Growth metrics dashboard for platform admins
- Referral rewards integrate with billing credits (future automation)
- Launch campaigns complement existing `beta_invitations`
