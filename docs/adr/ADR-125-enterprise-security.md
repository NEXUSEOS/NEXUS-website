# ADR-125: Enterprise Security Platform

## Status
Accepted — EPIC 33

## Context
NEXUS requires production-grade security: zero trust, MFA, RBAC, API security, marketplace package signing, threat detection, audit logs, and compliance readiness (SOC 2, PCI, GDPR, CCPA) before public launch.

## Decision
Introduce `@nexus-cloud/enterprise-security` with `createSecurityPlatformService`:

- **Zero trust**: policy-driven access evaluation with MFA compliance checks
- **MFA & passkeys**: enrollment tracking via `security_mfa_enrollments`; org policies via `security_policies`
- **Threat detection**: `security_threat_events` with SOC dashboard integration
- **Live security checklist**: environment-aware checks (secrets, JWT, API pepper, Docker non-root, Stripe webhook)
- **Marketplace security**: package signatures, scan reports, secure download verification
- **Compliance**: seeded controls for SOC2, PCI, GDPR, CCPA in `security_compliance_controls`
- **Rate limit tiers**: `security_rate_limit_tiers` for org-tier API limits
- **API**: `/v1/security/*`

Command Center: Security Center, SOC Dashboard, Compliance, Threat Monitor.

## Consequences
- Static deployment security checklists superseded by live `runLiveSecurityChecklist()`
- Zero trust enforced at API layer via policy engine (extensible to route middleware)
- PCI alignment: Stripe handles card data; no PAN storage in NEXUS database
