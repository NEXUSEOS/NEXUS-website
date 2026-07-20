import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import {
  fetchDeveloperCenterDashboard,
  fetchVisualDevTemplates,
  listGraphDrafts,
  listSimulationJobs,
  runSimulationJob,
} from '../../services/visualDev/visualDevService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function VisualDevHubPage() {
  const [templates, setTemplates] = useState<Array<{ id: string; name: string; kind: string }>>([])
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [drafts, setDrafts] = useState<Array<{ name: string; graphId: string }>>([])
  const [jobs, setJobs] = useState<Array<{ id: string; status: string }>>([])
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchVisualDevTemplates().then((d) => setTemplates(d.templates)).catch(() => setTemplates([]))
  }, [])

  useEffect(() => {
    const id = orgId()
    if (!id) return
    void fetchDeveloperCenterDashboard(id).then((d) => setDashboard(d.dashboard)).catch(() => setDashboard(null))
    void listGraphDrafts(id).then((d) => setDrafts(d.drafts)).catch(() => setDrafts([]))
    void listSimulationJobs(id).then((d) => setJobs(d.jobs)).catch(() => setJobs([]))
  }, [])

  async function simulate() {
    const id = orgId()
    if (!id) {
      setError('Set nexus-organization-id in localStorage')
      return
    }
    setError(null)
    try {
      const data = await runSimulationJob(id, undefined, { ticks: 120, target: 'twin' })
      setMessage(`Simulation job ${data.job.id}: ${data.job.status}`)
      const refreshed = await listSimulationJobs(id)
      setJobs(refreshed.jobs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed')
    }
  }

  const visualDev = dashboard?.visualDev as { graphDrafts?: number; simulationJobs?: number } | undefined

  return (
    <section aria-labelledby="visual-dev-hub-title">
      <Heading as="h1" level="heading" id="visual-dev-hub-title">Visual Robot Development</Heading>
      <Text variant="body">Build behaviors, missions, and simulations visually — open NEXUS Studio for the full editor.</Text>
      <ul>
        <li>Templates: {templates.length}</li>
        <li>Cloud drafts: {visualDev?.graphDrafts ?? drafts.length}</li>
        <li>Simulation jobs: {visualDev?.simulationJobs ?? jobs.length}</li>
        <li>Registry packages: {String(dashboard?.registryCount ?? '—')}</li>
      </ul>
      <button type="button" onClick={() => void simulate()}>Run cloud simulation</button>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      <Heading as="h2" level="title">Templates</Heading>
      <ul>
        {templates.map((t) => (
          <li key={t.id}>{t.name} ({t.kind})</li>
        ))}
      </ul>
      <Heading as="h2" level="title">Recent simulation jobs</Heading>
      <ul>
        {jobs.slice(0, 8).map((j) => (
          <li key={j.id}>{j.id.slice(0, 8)} — {j.status}</li>
        ))}
      </ul>
    </section>
  )
}
