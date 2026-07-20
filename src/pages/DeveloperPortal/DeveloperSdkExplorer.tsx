import { useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { listOrganizations } from '../../services/developer/developerPortalService'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export default function DeveloperSdkExplorer() {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function listOrgs() {
    setLoading(true)
    try {
      const orgs = await listOrganizations()
      setOutput(JSON.stringify(orgs, null, 2))
    } catch (e) {
      setOutput(e instanceof Error ? e.message : 'Failed')
    } finally {
      setLoading(false)
    }
  }

  async function fetchCatalog() {
    setLoading(true)
    try {
      const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/developer/catalog`)
      setOutput(await res.text())
    } catch (e) {
      setOutput(e instanceof Error ? e.message : 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="sdk-explorer-title">
      <Heading as="h1" level="heading" id="sdk-explorer-title">SDK Explorer</Heading>
      <Text variant="muted">Try SDK client methods against your NEXUS Cloud organization.</Text>
      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-4)' }}>
        <button type="button" className="button button--primary" disabled={loading} onClick={() => void listOrgs()}>List organizations</button>
        <button type="button" className="button button--secondary" disabled={loading} onClick={() => void fetchCatalog()}>Package catalog</button>
      </div>
      {output && <pre aria-label="SDK output" style={{ marginTop: 'var(--spacing-4)' }}>{output}</pre>}
    </section>
  )
}
