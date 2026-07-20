# Master Connection Inventory

Aggregated from `packages/connection-orchestrator` connection registry, ecosystem repo map, and environment variable registry.

## Ecosystem Repository Map

Source: `nexus-cloud/packages/connection-orchestrator/src/ecosystemRepos.ts`

| Repo Key | Label | Service IDs | Owner Repository |
|----------|-------|-------------|------------------|
| website | NEXUS Website | website, cms | nexus-website |
| cloud | NEXUS Cloud | cloud-api, postgresql, supabase | nexus-cloud |
| studio | NEXUS Studio | studio, ros2 | nexus-studio |
| platform | NEXUS Platform | cloud-api | nexus-platform |
| os | NEXUS OS | robot-runtime, mqtt, nexus-os-sync | nexus-os |
| ai | NEXUS Intelligence | nexus-intelligence, openai, anthropic | nexus-cloud |
| sdk | NEXUS SDK | sdk-cli, cloud-api | nexus-sdk |
| marketplace | Marketplace | marketplace, stripe | nexus-cloud |
| designSystem | Design System | website, cms | nexus-platform |

## Core Connection Services

| Service ID | Category | Owner | Required Env Vars |
|------------|----------|-------|-------------------|
| cloud-api | infrastructure | nexus-cloud | NEXUS_CLOUD_URL, DATABASE_URL |
| postgresql | database | nexus-cloud | DATABASE_URL |
| supabase | auth | nexus-cloud | SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY |
| stripe | billing | nexus-cloud | STRIPE_SECRET_KEY |
| marketplace | commerce | nexus-cloud | (via cloud-api) |
| openai | ai | nexus-cloud | OPENAI_API_KEY |
| anthropic | ai | nexus-cloud | ANTHROPIC_API_KEY |
| nexus-intelligence | ai | nexus-cloud | OPENAI_API_KEY (optional) |
| resend | messaging | nexus-cloud | RESEND_API_KEY |
| sendgrid | messaging | nexus-cloud | SENDGRID_API_KEY |
| cloudflare | cdn | nexus-cloud | CLOUDFLARE_API_TOKEN |
| github | deployment | nexus-cloud | GITHUB_TOKEN |
| grafana | monitoring | nexus-cloud | GRAFANA_URL, GRAFANA_API_KEY |
| sentry | monitoring | nexus-cloud | SENTRY_DSN |
| robot-runtime | robotics | nexus-os | MQTT broker config |
| mqtt | robotics | nexus-os | MQTT broker URL |
| nexus-os-sync | robotics | nexus-os | NEXUS_CLOUD_URL |
| ros2 | robotics | nexus-studio | ROS2 workspace |
| sdk-cli | developer | nexus-sdk | NEXUS_CLOUD_URL |
| website | client | nexus-website | VITE_NEXUS_CLOUD_URL, VITE_SUPABASE_URL |
| cms | content | nexus-cloud | (via cloud-api) |
| studio | client | nexus-studio | NEXUS_CLOUD_URL |

## Extended Connectors (EPIC 30+)

From `registryExtended.ts`: google-gemini, aws, azure, gcp, slack, discord, linear, datadog, pagerduty, and additional AI/deployment/messaging providers.

## Environment Variable Registry

Production variables seeded across migrations 0050–0056:

### Required

| Variable | Category |
|----------|----------|
| NEXUS_CLOUD_URL | cloud_api |
| DATABASE_URL | database |
| SUPABASE_URL | supabase |
| SUPABASE_ANON_KEY | supabase |
| SUPABASE_SERVICE_ROLE_KEY | supabase |
| WEBSITE_URL | website |
| STRIPE_SECRET_KEY | billing |
| GITHUB_TOKEN | github |
| CLOUDFLARE_API_TOKEN | cdn |
| OPENAI_API_KEY | ai |

### Optional (Production Activation EPIC 65)

| Variable | Category |
|----------|----------|
| SENTRY_DSN | monitoring |
| SLACK_WEBHOOK_URL | alerting |
| BACKUP_BUCKET | storage |
| OAUTH_GOOGLE_CLIENT_ID | auth |
| OAUTH_GITHUB_CLIENT_ID | auth |

## Validation APIs

| Endpoint | Purpose |
|----------|---------|
| POST `/v1/connections/validate-all` | Validate all production connections |
| GET `/v1/connections/health-matrix` | Connection health matrix |
| GET `/v1/connections/connection-center` | Connection Center dashboard |
| POST `/v1/connections/{serviceId}/repair` | One-click repair |

## Client Integration Points

| Client | Integration File | Pattern |
|--------|-----------------|---------|
| nexus-website | `src/services/platform/integrationService.ts` | `createPlatformIntegrationClient` |
| nexus-studio | `src/services/platformIntegration.ts` | `createPlatformIntegrationClient` |
| nexus-sdk CLI | `packages/cli/src/index.ts` | `connect validate` command |
| nexus-os | `packages/sync/src/cloudSync.ts` | Cloud sync client |

## Audit Commands

```bash
cd nexus-cloud
node scripts/validate-production-env.mjs --audit
# Output: docs/launch/production-activation-audit.json
```

## Related Documents

- [CONNECTION_ORCHESTRATOR_GUIDE.md](../operations/CONNECTION_ORCHESTRATOR_GUIDE.md)
- [PRODUCTION_ENV_TEMPLATE.md](../operations/PRODUCTION_ENV_TEMPLATE.md)
- ADR-221, ADR-110 in nexus-specifications
