import { useCallback, useEffect, useState } from 'react'
import { GlassPanel, Button, Heading, Text } from '@nexus/ui'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

function getToken() {
  const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
  if (!key) return ''
  try {
    return (JSON.parse(localStorage.getItem(key) ?? '') as { access_token?: string }).access_token ?? ''
  } catch {
    return ''
  }
}

async function connFetch<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/connections${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) throw new Error(`Connections ${res.status}`)
  return res.json() as Promise<T>
}

export default function AdminConnections() {
  const [rows, setRows] = useState<Array<{ serviceId: string; service: string; status: string; latencyMs?: number | null; missingSecrets: string[] }>>([])

  const refresh = useCallback(async () => {
    const data = await connFetch<{ rows: typeof rows }>('/dashboard')
    setRows(data.rows)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Connection Orchestrator</Heading>
      <Text variant="caption">Live infrastructure connections</Text>
      <Button variant="secondary" onClick={() => void refresh()}>Refresh</Button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {rows.map((row) => (
          <GlassPanel key={row.serviceId} className="admin-connection-card">
            <Heading as="h3" level="title">{row.service}</Heading>
            <Text variant="caption">Status: {row.status}</Text>
            {row.latencyMs != null && <Text variant="muted">Latency: {row.latencyMs}ms</Text>}
            {row.missingSecrets.length > 0 && (
              <Text variant="muted">Missing: {row.missingSecrets.join(', ')}</Text>
            )}
            <Button variant="secondary" onClick={() => void connFetch(`/${row.serviceId}/validate`, { method: 'POST' }).then(refresh)}>Validate</Button>
          </GlassPanel>
        ))}
      </div>
    </GlassPanel>
  )
}
