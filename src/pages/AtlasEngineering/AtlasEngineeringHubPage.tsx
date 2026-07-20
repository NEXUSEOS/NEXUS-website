import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import {
  fetchEngineeringCenterDashboard,
  fetchManufacturingReadiness,
  listHardwareComponents,
  listPrototypes,
  seedBomCatalog,
} from '../../services/atlasHardware/atlasHardwareService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function AtlasEngineeringHubPage() {
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [components, setComponents] = useState<Array<{ partNumber: string; name: string; componentType: string }>>([])
  const [prototypes, setPrototypes] = useState<unknown[]>([])
  const [readiness, setReadiness] = useState<Record<string, unknown> | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = orgId()
    if (!id) return
    void fetchEngineeringCenterDashboard(id).then((d) => setDashboard(d.dashboard)).catch(() => setDashboard(null))
    void listHardwareComponents(id).then((d) => setComponents(d.components)).catch(() => setComponents([]))
    void listPrototypes(id).then((d) => setPrototypes(d.prototypes)).catch(() => setPrototypes([]))
    void fetchManufacturingReadiness(id).then((d) => setReadiness(d.assessment)).catch(() => setReadiness(null))
  }, [])

  async function handleSeed() {
    const id = orgId()
    if (!id) {
      setError('Set nexus-organization-id in localStorage')
      return
    }
    setError(null)
    try {
      const data = await seedBomCatalog(id)
      setMessage(`BOM catalog: ${data.result.seeded ? 'seeded' : 'existing'} (${data.result.count} components)`)
      const refreshed = await listHardwareComponents(id)
      setComponents(refreshed.components)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Seed failed')
    }
  }

  const analytics = dashboard?.analytics as { components?: number; prototypes?: number; validations?: number } | undefined

  return (
    <section aria-labelledby="atlas-engineering-hub-title">
      <Heading as="h1" level="heading" id="atlas-engineering-hub-title">Atlas Hardware Engineering</Heading>
      <Text variant="body">
        Engineering platform for future Atlas robot design, validation, and manufacturing — no physical hardware is claimed to exist.
      </Text>
      <ul>
        <li>Registered robots: {Array.isArray(dashboard?.robots) ? dashboard.robots.length : '—'}</li>
        <li>Components: {String(dashboard?.componentCount ?? analytics?.components ?? components.length)}</li>
        <li>Prototypes: {prototypes.length}</li>
        <li>Manufacturing readiness: {String(readiness?.readinessScore ?? '—')}% ({String(readiness?.status ?? '—')})</li>
        <li>Validations: {analytics?.validations ?? '—'}</li>
      </ul>
      <button type="button" onClick={() => void handleSeed()}>Seed Atlas Alpha BOM</button>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      <Heading as="h2" level="title">Component catalog</Heading>
      <ul>
        {components.slice(0, 12).map((c) => (
          <li key={c.partNumber}>{c.partNumber} — {c.name} ({c.componentType})</li>
        ))}
      </ul>
    </section>
  )
}
