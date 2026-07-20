# ADR-121: Business Platform

## Status
Accepted — EPIC 32

## Context
NEXUS requires a complete commercial layer: subscriptions, licensing, organization billing, marketplace payments, developer payouts, invoices, tax, coupons, credits, usage billing, and financial dashboards. Prior epics had marketplace revenue rules and Stripe connection stubs only.

## Decision
Introduce `@nexus-cloud/business-platform` with `createBillingService`:

- PostgreSQL tables: `billing_plans`, `billing_accounts`, `billing_subscriptions`, `billing_invoices`, `billing_payments`, `billing_coupons`, `billing_credits`, `billing_usage_records`, `billing_payouts`, `billing_tax_rates`, `billing_marketplace_transactions`, `billing_stripe_events`
- Stripe REST client when `STRIPE_SECRET_KEY` is configured; local ledger fallback otherwise
- Webhook handler at `/v1/webhooks/stripe`
- Org routes: `/v1/organizations/:id/billing/*`
- Admin routes: `/v1/business/financial-dashboard`, `/v1/business/billing/plans`

Marketplace purchases apply `marketplace_revenue_rules` publisher share and schedule developer payouts.

## Consequences
- Single billing service consumed by Command Center Billing and Revenue panels
- Enterprise licensing via `billing_licenses` table
- API/usage billing via `billing_usage_records` meter aggregation
