import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, GlassPanel, Heading, Text } from '@nexus/ui'
import { HolographicHealthWidget, HolographicPanel } from '../../experience'
import { useAsyncMount } from '../../hooks'
import { fetchMissionControlHomepage, runMissionControlAction } from '../../services/platform/missionControlService'
import { fetchConnectionHealthMatrix } from '../../services/platform/connectionOrchestratorService'
import { EPIC_PLATFORM_SERVICES } from '../../config/platformServices'
import { fetchAdminWizardHub } from '../../services/platform/adminExperienceService'
import AdminCiHealthWidget from './AdminCiHealthWidget'
import AdminMissionControlNav from './AdminMissionControlNav'
import AdminServiceTiles, { type ServiceTile } from './AdminServiceTiles'
import './AdminPages.css'

type MissionAction = {
  id: string
  title: string
  severity: string
  actionType: string
  endpoint?: string
  method?: 'GET' | 'POST'
}

/** EPIC 59 + EPIC 63 + EPIC 71 — Primary administrator landing: Mission Control homepage. */
export default function AdminDashboard() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [wizardHub, setWizardHub] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [homepage, hub, matrix] = await Promise.all([
        fetchMissionControlHomepage(),
        fetchAdminWizardHub().catch(() => null),
        fetchConnectionHealthMatrix().catch(() => null),
      ])
      if (!homepage.serviceTiles && matrix) {
        homepage.serviceTiles = EPIC_PLATFORM_SERVICES.map((svc) => {
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
      }
      setData(homepage)
      setWizardHub(hub)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mission control')
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  const degraded = Boolean(data?.degraded)
  const kpiTiles = (data?.kpiTiles ?? {}) as Record<string, unknown>
  const overviews = (data?.overviews ?? {}) as Record<string, Record<string, unknown>>
  const ciHealth = overviews.ciHealth as Record<string, unknown> | null | undefined
  const actions = (data?.requiredActions ?? data?.actions ?? []) as MissionAction[]
  const activityFeed = (data?.activityFeed ?? []) as unknown[]
  const auditFeed = (data?.auditFeed ?? []) as Array<{ serviceId?: string; action?: string; createdAt?: string }>
  const aiRecommendations = ((data?.aiRecommendations as { all?: Array<{ title: string; priority: string }> })?.all) ?? []
  const alerts = (data?.alerts ?? {}) as Record<string, number>
  const hubSummary = (wizardHub?.summary ?? {}) as { percentComplete?: number; completed?: number; total?: number }
  const serviceTiles = (data?.serviceTiles ?? []) as ServiceTile[]

  async function handleAction(action: MissionAction) {
    if (!action.endpoint) return
    try {
      await runMissionControlAction(action.endpoint, action.method ?? 'POST')
      setActionMessage(`${action.actionType} complete`)
      await refresh()
    } catch (err) {
      setActionMessage(err instanceof Error ? err.message : 'Action failed')
    }
  }

  return (
    <GlassPanel className="admin-page cx-surface cx-surface--mission">
      <Heading as="h2" level="title">NEXUS Mission Control</Heading>
      <Text variant="caption">Administrator homepage — configure everything through UI wizards. Zero code access required.</Text>
      <Text variant="muted">Open NEXUS Studio → Command Center for full panel navigation and wizard hub.</Text>

      {degraded && (
        <div className="admin-banner" role="status">
          <Text variant="caption">
            {String(data?.message ?? 'Cloud API not configured — showing local platform catalog.')}
            {' '}
            <Link to="/admin/setup">Open Setup Wizard</Link>
            {' · '}
            <Link to="/admin/secrets">Configure Secrets</Link>
          </Text>
        </div>
      )}

      <div className="admin-page__actions">
        <Button variant="primary" onClick={() => void refresh()} disabled={loading}>
          Refresh
        </Button>
        <Link to="/admin/connections"><Button variant="secondary">Connection Orchestrator</Button></Link>
        <Link to="/admin/installation"><Button variant="secondary">Installation Center</Button></Link>
      </div>

      {loading && <Text variant="muted">Loading…</Text>}
      {error && <p role="alert">{error}</p>}
      {actionMessage && <p role="status">{actionMessage}</p>}

      {(Object.keys(kpiTiles).length > 0 || degraded) && (
        <HolographicPanel label="Platform Telemetry" pulse>
          <section>
            <Heading as="h3" level="title">Platform KPIs</Heading>
            <div className="admin-stats lg-materialize-stagger">
              {[
                ['Platform Health', kpiTiles.platformHealthScore, 'healthy'],
                ['Connection Orchestrator', kpiTiles.connectionOrchestratorStatus, 'unknown'],
                ['Active Users', kpiTiles.activeUsers, 'unknown'],
                ['Organizations', kpiTiles.organizations, 'unknown'],
                ['Marketplace Revenue', kpiTiles.marketplaceRevenue, 'unknown'],
                ['Subscriptions', kpiTiles.subscriptions, 'unknown'],
                ['Sponsors', kpiTiles.sponsors, 'unknown'],
                ['Developers', kpiTiles.developers, 'unknown'],
                ['Security', kpiTiles.security, 'unknown'],
                ['Production', kpiTiles.production, 'unknown'],
                ['Billing', kpiTiles.billing, 'unknown'],
                ['AI', kpiTiles.ai, 'unknown'],
              ].map(([label, value, status]) => (
                <HolographicHealthWidget
                  key={String(label)}
                  label={String(label)}
                  value={`${String(value ?? 0)}${typeof value === 'number' && String(label).includes('Health') ? '%' : ''}`}
                  status={status as 'healthy' | 'unknown'}
                />
              ))}
            </div>
          </section>
        </HolographicPanel>
      )}

      {serviceTiles.length > 0 && <AdminServiceTiles tiles={serviceTiles} />}

      <section>
        <Heading as="h3" level="title">Alerts & Wizard Progress</Heading>
        <div className="admin-stats">
          <div className="admin-stat"><Text variant="caption">Critical Alerts</Text><strong>{String(alerts.critical ?? 0)}</strong></div>
          <div className="admin-stat"><Text variant="caption">Open Incidents</Text><strong>{String(alerts.openIncidents ?? 0)}</strong></div>
          <div className="admin-stat"><Text variant="caption">Warnings</Text><strong>{String(alerts.warnings ?? 0)}</strong></div>
          <div className="admin-stat"><Text variant="caption">Wizard Hub</Text><strong>{hubSummary.completed ?? 0}/{hubSummary.total ?? 11} ({hubSummary.percentComplete ?? 0}%)</strong></div>
        </div>
      </section>

      <AdminCiHealthWidget overview={ciHealth ?? null} />

      <AdminMissionControlNav />

      {Object.keys(overviews).length > 0 && (
        <section>
          <Heading as="h3" level="title">Overviews</Heading>
          <div className="admin-stats">
            <div className="admin-stat"><Text variant="caption">Organizations</Text><strong>{String(overviews.organization?.count ?? 0)}</strong></div>
            <div className="admin-stat"><Text variant="caption">Marketplace Downloads</Text><strong>{String(overviews.marketplace?.downloads ?? 0)}</strong></div>
            <div className="admin-stat"><Text variant="caption">MRR</Text><strong>${String(overviews.revenue?.mrr ?? 0)}</strong></div>
            <div className="admin-stat"><Text variant="caption">Infrastructure</Text><strong>{String(overviews.infrastructure?.score ?? 0)}%</strong></div>
          </div>
        </section>
      )}

      {actions.length > 0 && (
        <section>
          <Heading as="h3" level="title">Required Actions</Heading>
          <ul>
            {actions.map((action) => (
              <li key={action.id}>
                [{action.severity}] {action.title}
                {action.endpoint ? (
                  <Button variant="secondary" onClick={() => void handleAction(action)}>
                    {action.actionType}
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {aiRecommendations.length > 0 && (
        <section>
          <Heading as="h3" level="title">AI Recommendations</Heading>
          <ul>
            {aiRecommendations.slice(0, 8).map((rec, i) => (
              <li key={i}>[{rec.priority}] {rec.title}</li>
            ))}
          </ul>
        </section>
      )}

      {(activityFeed.length > 0 || auditFeed.length > 0) && (
        <section>
          <Heading as="h3" level="title">Activity & Audit</Heading>
          {activityFeed.length > 0 ? (
            <>
              <Text variant="caption">Recent activity ({activityFeed.length})</Text>
              <ul>{activityFeed.slice(0, 5).map((item, i) => <li key={i}>{JSON.stringify(item)}</li>)}</ul>
            </>
          ) : null}
          {auditFeed.length > 0 ? (
            <>
              <Text variant="caption">Connection audit</Text>
              <ul>{auditFeed.slice(0, 5).map((item, i) => (
                <li key={i}>{item.createdAt} — {item.serviceId}: {item.action}</li>
              ))}</ul>
            </>
          ) : null}
        </section>
      )}
    </GlassPanel>
  )
}
