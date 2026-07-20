import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { fetchOpenApiSpec } from '../../services/developer/developerPortalService'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

function getAccessToken(): string | undefined {
  try {
    const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
    if (!key) return undefined
    return (JSON.parse(localStorage.getItem(key) ?? '{}') as { access_token?: string }).access_token
  } catch {
    return undefined
  }
}

export default function DeveloperApiExplorer() {
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null)
  const [path, setPath] = useState('/v1/developer/examples')
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [body, setBody] = useState('{}')
  const [response, setResponse] = useState<string>('')
  const CLOUD = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

  useEffect(() => {
    void fetchOpenApiSpec().then(setSpec).catch(() => setSpec(null))
  }, [])

  async function tryRequest() {
    try {
      const token = getAccessToken()
      const orgId = localStorage.getItem('nexus-organization-id')
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `Bearer ${token}`
      if (orgId) headers['X-Organization-Id'] = orgId
      const res = await fetch(`${CLOUD.replace(/\/$/, '')}${path}`, {
        method,
        headers,
        body: method === 'GET' || method === 'DELETE' ? undefined : body,
      })
      const text = await res.text()
      setResponse(`${res.status} ${res.statusText}\n${text}`)
    } catch (e) {
      setResponse(e instanceof Error ? e.message : 'Request failed')
    }
  }

  const paths = spec?.paths ? Object.keys(spec.paths as Record<string, unknown>) : []
  const developerPaths = [
    '/v1/developer/examples',
    '/v1/developer/achievements',
    '/v1/developer/templates',
    '/v1/organizations/{id}/developer/ai/chat',
    '/v1/organizations/{id}/developer/reputation',
  ]

  return (
    <section aria-labelledby="api-explorer-title">
      <Heading as="h1" level="heading" id="api-explorer-title">API Explorer</Heading>
      <Text variant="muted">Interactive REST explorer with auth, org context, and OpenAPI path hints.</Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <label>
          Method
          <select value={method} onChange={(e) => setMethod(e.target.value as HttpMethod)} aria-label="HTTP method">
            {(['GET', 'POST', 'PUT', 'DELETE'] as const).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label style={{ flex: 1, minWidth: 280 }}>
          Endpoint path
          <input list="api-paths" value={path} onChange={(e) => setPath(e.target.value)} aria-label="API path" />
          <datalist id="api-paths">
            {[...developerPaths, ...paths.slice(0, 40)].map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>
      </div>
      {(method === 'POST' || method === 'PUT') && (
        <label style={{ display: 'block', marginTop: 'var(--spacing-3)' }}>
          Request body (JSON)
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} aria-label="Request body" />
        </label>
      )}
      <button type="button" className="button button--primary" onClick={() => void tryRequest()}>Send request</button>
      {response && <pre aria-label="Response" style={{ marginTop: 'var(--spacing-4)' }}>{response}</pre>}
    </section>
  )
}
