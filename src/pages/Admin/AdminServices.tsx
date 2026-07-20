import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchServicesRegistry } from '../../services/platform/platformAdminService'

export default function AdminServices() {
  const [services, setServices] = useState<Array<{ moduleId: string; name: string; status: string; version: string }>>([])

  useEffect(() => {
    void fetchServicesRegistry().then((d) => setServices(d.services as typeof services))
  }, [])

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Service Registry</Heading>
      <Text variant="caption">Self-registering modules with health, routes, and capabilities</Text>
      <table className="admin-table">
        <thead><tr><th>Module</th><th>Name</th><th>Status</th><th>Version</th></tr></thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.moduleId}><td>{s.moduleId}</td><td>{s.name}</td><td>{s.status}</td><td>{s.version}</td></tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  )
}
