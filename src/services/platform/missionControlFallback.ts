import { EPIC_PLATFORM_SERVICES } from '../../config/platformServices'
import { fetchConnectionHealthMatrix } from './connectionOrchestratorService'

/** Build a degraded Mission Control homepage when cloud API is unreachable. */
export async function buildMissionControlFallbackHomepage(): Promise<Record<string, unknown>> {
  const matrix = await fetchConnectionHealthMatrix()
  const connected = matrix.summary.connected ?? 0
  const total = matrix.summary.total ?? matrix.connections.length
  const healthPercent = total > 0 ? Math.round((connected / total) * 100) : 0

  const serviceTiles = EPIC_PLATFORM_SERVICES.map((svc) => {
    const conn = svc.connectionId
      ? matrix.connections.find((c) => c.serviceId === svc.connectionId)
      : undefined
    return {
      id: svc.id,
      name: svc.name,
      category: svc.category,
      status: conn?.status ?? 'local_only',
      health: conn?.health ?? 'unknown',
      adminPath: svc.adminPath,
      owner: svc.owner,
      description: svc.description,
    }
  })

  return {
    homepage: true,
    degraded: true,
    message: 'Cloud API not configured — showing local platform catalog. Connect credentials in Setup Wizard.',
    kpiTiles: {
      platformHealthScore: healthPercent,
      connectionOrchestratorStatus: `${connected}/${total}`,
      activeUsers: '—',
      organizations: '—',
      marketplaceRevenue: '—',
      subscriptions: '—',
      sponsors: '—',
      developers: '—',
      security: '—',
      production: '—',
      billing: '—',
      ai: '—',
    },
    serviceTiles,
    overviews: {
      organization: { count: '—' },
      marketplace: { downloads: '—' },
      revenue: { mrr: '—' },
      infrastructure: { score: healthPercent },
      ciHealth: null,
    },
    alerts: { critical: 0, openIncidents: 0, warnings: matrix.summary.failed ?? 0 },
    requiredActions: [
      {
        id: 'connect-cloud',
        title: 'Configure VITE_NEXUS_CLOUD_URL and sign in as platform admin',
        severity: 'warning',
        actionType: 'Connect',
      },
      {
        id: 'setup-wizard',
        title: 'Complete Setup Wizard for first-run configuration',
        severity: 'info',
        actionType: 'Open',
      },
    ],
    activityFeed: [],
    auditFeed: [],
    aiRecommendations: { all: [] },
  }
}
