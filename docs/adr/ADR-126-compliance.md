# ADR-126: Compliance Framework

## Status
Accepted — EPIC 33

## Context
Enterprise customers and public launch require demonstrable compliance posture across SOC 2, PCI DSS-aligned payments, GDPR, and CCPA.

## Decision
Persist compliance controls in `security_compliance_controls` with framework, control ID, status, and evidence. Expose via `GET /v1/security/compliance` with per-framework implementation counts.

| Framework | Scope |
|-----------|-------|
| SOC 2 | Access controls, monitoring, change management |
| PCI | Audit trails, no PAN storage (Stripe) |
| GDPR | Erasure, security of processing |
| CCPA | Disclosure, deletion workflows |

Compliance panel in Command Center displays implementation progress. Controls link to existing systems (audit_logs, RBAC, deployment releases).

## Consequences
- Compliance is tracked in-database, not spreadsheet-only
- `in_progress` controls documented for launch roadmap
- External audit evidence export deferred to future work
