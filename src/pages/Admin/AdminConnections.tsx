import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlassPanel, Button, Heading, Text } from '@nexus/ui'
import { useAsyncMount } from '../../hooks'
import {
  fetchConnectionHealthMatrix,
  validateConnectionService,
  repairConnectionService,
  reconnectConnectionService,
  validateAllConnections,
  type ConnectionRow,
  type HealthMatrixResponse,
} from '../../services/platform/connectionOrchestratorService'
import { EPIC_PLATFORM_SERVICES } from '../../config/platformServices'
import './AdminPages.css'

function statusClass(status: string): string {
  if (status === 'connected') return 'admin-connection-card__status--connected'
  if (status === 'configuration_required' || status === 'not_configured') return 'admin-connection-card__status--configuration_required'
  return 'admin-connection-card__status--validation_failed'
}

function healthScore(row: ConnectionRow): number {
  if (row.healthScore != null) return row.healthScore
  if (row.health === 'healthy') return 100
  if (row.health === 'degraded') return 50
  if (row.status === 'connected') return 85
  if (row.status === 'configuration_required') return 25
  return 0
}

export default function AdminConnections() {
  const [matrix, setMatrix] = useState<HealthMatrixResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setMatrix(await fetchConnectionHealthMatrix())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load connections')
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  async function runAction(serviceId: string, action: 'validate' | 'repair' | 'reconnect') {
    setBusyId(serviceId)
    setActionMessage(null)
    try {
      if (action === 'validate') await validateConnectionService(serviceId)
      else if (action === 'repair') await repairConnectionService(serviceId)
      else await reconnectConnectionService(serviceId)
      setActionMessage(`${action} complete for ${serviceId}`)
      await refresh()
    } catch (err) {
      setActionMessage(err instanceof Error ? err.message : `${action} failed`)
    } finally {
      setBusyId(null)
    }
  }

  const rows = matrix?.connections ?? []
  const summary = matrix?.summary
  const degraded = summary?.connected === 0 && (summary?.total ?? 0) > 0

  const platformByConnection = Object.fromEntries(
    EPIC_PLATFORM_SERVICES.filter((s) => s.connectionId).map((s) => [s.connectionId!, s]),
  )

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Connection Orchestrator</Heading>
      <Text variant="caption">Live infrastructure connections — health matrix, validation, repair, and diagnostics</Text>

      {degraded && (
        <div className="admin-banner" role="status">
          <Text variant="caption">
            No live connections detected. Configure credentials in{' '}
            <Link to="/admin/setup">Setup Wizard</Link>
            {' or '}
            <Link to="/admin/secrets">Secrets</Link>
            , then sign in as platform admin to validate.
          </Text>
        </div>
      )}

      <div className="admin-page__actions">
        <Button variant="primary" onClick={() => void refresh()} disabled={loading}>Refresh</Button>
        <Button
          variant="secondary"
          onClick={() => void validateAllConnections().then(() => refresh()).catch((e: Error) => setActionMessage(e.message))}
        >
          Validate All
        </Button>
        <Link to="/admin"><Button variant="secondary">Mission Control</Button></Link>
      </div>

      {loading && <Text variant="muted">Loading health matrix…</Text>}
      {error && <p role="alert">{error}</p>}
      {actionMessage && <p role="status">{actionMessage}</p>}

      {summary && (
        <section>
          <Heading as="h3" level="title">Health Summary</Heading>
          <div className="admin-stats">
            <div className="admin-stat"><Text variant="caption">Total</Text><strong>{summary.total ?? rows.length}</strong></div>
            <div className="admin-stat"><Text variant="caption">Connected</Text><strong>{summary.connected ?? 0}</strong></div>
            <div className="admin-stat"><Text variant="caption">Healthy</Text><strong>{summary.healthy ?? 0}</strong></div>
            <div className="admin-stat"><Text variant="caption">Degraded</Text><strong>{summary.degraded ?? 0}</strong></div>
            <div className="admin-stat"><Text variant="caption">Readiness</Text><strong>{summary.percent ?? 0}%</strong></div>
          </div>
        </section>
      )}

      <div className="admin-connection-grid">
        {rows.map((row) => {
          const platform = platformByConnection[row.serviceId]
          const score = healthScore(row)
          return (
            <GlassPanel key={row.serviceId} className="admin-connection-card">
              <div className="admin-connection-card__header">
                <Heading as="h3" level="title">{row.serviceName ?? row.service ?? row.name}</Heading>
                <span className={`admin-connection-card__status ${statusClass(row.status)}`}>{row.status.replace(/_/g, ' ')}</span>
              </div>
              <Text variant="caption">Health score: {score}% · {row.category}</Text>
              {platform?.owner && <Text variant="muted">Owner: {platform.owner}</Text>}
              {row.latencyMs != null && <Text variant="muted">Latency: {row.latencyMs}ms</Text>}
              {row.lastValidation && <Text variant="muted">Last validation: {new Date(row.lastValidation).toLocaleString()}</Text>}
              {row.lastFailureReason && <Text variant="muted">Last failure: {row.lastFailureReason}</Text>}
              {row.dependencies && row.dependencies.length > 0 && (
                <Text variant="muted">Dependencies: {row.dependencies.join(', ')}</Text>
              )}
              {row.missingSecrets.length > 0 && (
                <Text variant="muted">Missing: {row.missingSecrets.join(', ')}</Text>
              )}
              {row.requiredFeatures && row.requiredFeatures.length > 0 && (
                <Text variant="muted">Features: {row.requiredFeatures.join(', ')}</Text>
              )}
              <div className="admin-connection-card__actions">
                <Button
                  variant="secondary"
                  disabled={busyId === row.serviceId}
                  onClick={() => void runAction(row.serviceId, 'validate')}
                >
                  Validate
                </Button>
                <Button
                  variant="secondary"
                  disabled={busyId === row.serviceId}
                  onClick={() => void runAction(row.serviceId, 'reconnect')}
                >
                  Reconnect
                </Button>
                <Button
                  variant="secondary"
                  disabled={busyId === row.serviceId}
                  onClick={() => void runAction(row.serviceId, 'repair')}
                >
                  Repair
                </Button>
                {platform?.adminPath && (
                  <Link to={platform.adminPath}><Button variant="secondary">Open</Button></Link>
                )}
              </div>
            </GlassPanel>
          )
        })}
      </div>

      {!loading && rows.length === 0 && (
        <Text variant="muted">No connection services registered. Check Cloud API configuration.</Text>
      )}
    </GlassPanel>
  )
}
