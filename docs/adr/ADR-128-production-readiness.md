# ADR-128: Production Readiness

## Status
Accepted — EPIC 33

## Context
EPIC 33 completes production readiness by unifying security validation, deployment infrastructure, connection orchestrator health, and launch approval into a single readiness dashboard.

## Decision
`getPlatformReadinessSummary()` computes overall readiness from:

- Live security checklist (30% weight)
- Connection orchestrator completion (25%)
- Launch validation score (25%)
- Launch approval status (20%)

Quality gate criteria:
- Zero trust policy enabled platform-wide
- Marketplace secure downloads require signature + scan pass
- Billing secured via Stripe + PCI-aligned architecture
- AI secured via intelligence platform + inference logging
- Monitoring via enterprise-ops tracing + threat events
- Incident response via ops incidents + public status bridge

Feature flag: `enterpriseSecurityLaunchEnabled`

## Consequences
- Single `/v1/launch-ops/readiness` endpoint for go/no-go decisions
- Command Center Launch Operations panel drives approval workflow
- Future: automated E2E and load tests in CI feed load test records
