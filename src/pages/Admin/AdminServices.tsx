import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlassPanel, Heading, Text, Button } from '@nexus/ui'
import { useAsyncMount } from '../../hooks'
import { fetchServicesRegistry } from '../../services/platform/platformAdminService'
import './AdminPages.css'

export default function AdminServices() {
  const [services, setServices] = useState<Array<{ moduleId: string; name: string; status: string; version: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchServicesRegistry()
      setServices(data.services as typeof services)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cloud API not configured — sign in as platform admin')
      setServices([])
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Live Services</Heading>
      <Text variant="caption">Self-registering modules with health, routes, and capabilities</Text>

      <div className="admin-page__actions">
        <Button variant="primary" onClick={() => void refresh()} disabled={loading}>Refresh</Button>
        <Link to="/admin/connections"><Button variant="secondary">Connection Orchestrator</Button></Link>
      </div>

      {loading && <Text variant="muted">Loading service registry…</Text>}
      {error && (
        <div className="admin-banner" role="status">
          <Text variant="caption">{error}. <Link to="/admin/setup">Open Setup Wizard</Link></Text>
        </div>
      )}

      {services.length > 0 ? (
        <table className="admin-table">
          <thead><tr><th>Module</th><th>Name</th><th>Status</th><th>Version</th></tr></thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.moduleId}><td>{s.moduleId}</td><td>{s.name}</td><td>{s.status}</td><td>{s.version}</td></tr>
            ))}
          </tbody>
        </table>
      ) : !loading && !error ? (
        <Text variant="muted">No services registered yet.</Text>
      ) : null}
    </GlassPanel>
  )
}
