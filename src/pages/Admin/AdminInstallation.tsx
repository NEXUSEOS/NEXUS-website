import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, GlassPanel, Heading, Text } from '@nexus/ui'
import { useAsyncMount } from '../../hooks'
import { fetchInstallationDashboard } from '../../services/platform/installationService'

/** EPIC 66 — Website Installation Center for first-run admin routing. */
export default function AdminInstallation() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await fetchInstallationDashboard())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load installation center')
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  const progress = (data?.setupProgress ?? {}) as { percent?: number; completed?: number; total?: number; steps?: Array<{ stepKey: string; title: string; completed: boolean; panelRoute: string }> }
  const actions = (data?.requiredActions ?? []) as Array<{ id: string; title: string; severity: string }>

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Installation Center</Heading>
      <Text variant="caption">Unified first-run setup — configure platform through UI wizards. Open NEXUS Studio Command Center for full panel navigation.</Text>
      <div className="admin-page__actions">
        <Button variant="primary" onClick={() => void refresh()} disabled={loading}>Refresh</Button>
        <Link to="/admin/setup"><Button variant="secondary">Setup Wizard</Button></Link>
        <Link to="/admin"><Button variant="secondary">Mission Control</Button></Link>
      </div>
      {loading && <Text variant="muted">Loading…</Text>}
      {error && <p role="alert">{error}</p>}
      {progress.percent != null ? (
        <section>
          <Heading as="h3" level="title">Setup Progress</Heading>
          <div className="admin-stats">
            <div className="admin-stat"><Text variant="caption">Progress</Text><strong>{progress.percent}%</strong></div>
            <div className="admin-stat"><Text variant="caption">Readiness</Text><strong>{String(data?.readinessScore ?? 0)}%</strong></div>
            <div className="admin-stat"><Text variant="caption">Steps</Text><strong>{progress.completed ?? 0}/{progress.total ?? 0}</strong></div>
          </div>
        </section>
      ) : null}
      {progress.steps?.length ? (
        <section>
          <Heading as="h3" level="title">Installation Steps</Heading>
          <ul>
            {progress.steps.map((step) => (
              <li key={step.stepKey}>{step.completed ? '✓' : '○'} {step.title}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {actions.length ? (
        <section>
          <Heading as="h3" level="title">Required Actions</Heading>
          <ul>{actions.slice(0, 10).map((a) => <li key={a.id}>[{a.severity}] {a.title}</li>)}</ul>
        </section>
      ) : null}
    </GlassPanel>
  )
}
