import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { listSimulationJobs, runSimulationJob } from '../../services/visualDev/visualDevService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function DeveloperSimulation() {
  const [graphId, setGraphId] = useState('')
  const [jobs, setJobs] = useState<Array<{ id: string; status: string; result?: unknown }>>([])
  const [result, setResult] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = orgId()
    if (!id) return
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
      const data = await runSimulationJob(id, graphId || undefined, { ticks: 120, target: 'twin' })
      setResult(`Job ${data.job.id}: ${data.job.status}`)
      const refreshed = await listSimulationJobs(id)
      setJobs(refreshed.jobs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed')
    }
  }

  return (
    <section aria-labelledby="simulation-title">
      <Heading as="h1" level="heading" id="simulation-title">Simulation Jobs</Heading>
      <Text variant="muted">Cloud-backed simulation via the visual development platform. Use NEXUS Studio for full digital twin simulation.</Text>
      <label>
        Graph ID (optional)
        <input value={graphId} onChange={(e) => setGraphId(e.target.value)} aria-label="Graph ID" />
      </label>
      <button type="button" className="button button--primary" onClick={() => void simulate()}>Run cloud simulation</button>
      {result && <p role="status">{result}</p>}
      {error && <p role="alert">{error}</p>}
      <Heading as="h2" level="title">Recent jobs</Heading>
      <ul>
        {jobs.map((j) => (
          <li key={j.id}>{j.id.slice(0, 8)} — {j.status}</li>
        ))}
      </ul>
    </section>
  )
}
