# ADR-123: CRM

## Status
Accepted — EPIC 32

## Context
NEXUS needs lead management, contact/deal tracking, sponsor pipeline, and investor CRM beyond basic sponsor applications.

## Decision
Implement `createCrmService`:

- Tables: `crm_leads`, `crm_contacts`, `crm_deals`, `crm_sponsor_pipeline`, `crm_investor_records`
- Sponsor pipeline syncs pending `sponsor_applications` automatically
- API: `/v1/business/crm/*`, org deals at `/v1/organizations/:id/crm/deals`
- Command Center **CRM** panel with dashboard KPIs

CRM integrates with billing (deal values) and growth (lead sources).

## Consequences
- Platform admins manage global leads, sponsor pipeline, investors
- Org members view org-scoped deals and contacts
- Sponsor applications flow into pipeline without duplicate data entry
