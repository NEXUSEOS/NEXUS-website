import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { listOrgBehaviorVersions, requestCertification } from '../../services/developer/developerPortalService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function DeveloperCertificationDashboard() {
  const [versions, setVersions] = useState<Array<{ id: string; version: string; status: string }>>([])
  const [selected, setSelected] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = orgId()
    if (!id) return
    void listOrgBehaviorVersions(id)
      .then((v) => {
        setVersions(v)
        if (v[0]) setSelected(v[0].id)
      })
      .catch(() => setVersions([]))
  }, [])

  async function submit() {
    const id = orgId()
    if (!id || !selected) return
    setError(null)
    try {
      await requestCertification(id, selected)
      setMessage('Certification request submitted — pending review in Command Center')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed')
    }
  }

  return (
    <section aria-labelledby="cert-dashboard-title">
      <Heading as="h1" level="heading" id="cert-dashboard-title">Certification Dashboard</Heading>
      <Text variant="muted">Submit behavior packages for NEXUS certification and marketplace trust badges.</Text>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Package version
        <select value={selected} onChange={(e) => setSelected(e.target.value)} aria-label="Package version">
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{v.version} ({v.status})</option>
          ))}
        </select>
      </label>
      <button type="button" className="button button--primary" onClick={() => void submit()} disabled={!selected}>
        Request certification
      </button>
      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Certification levels</Heading>
      <ul role="list">
        <li>Validated — graph schema and safety checks pass</li>
        <li>Certified — human review + simulation evidence</li>
        <li>Marketplace — published listing with certification badge</li>
      </ul>
    </section>
  )
}
