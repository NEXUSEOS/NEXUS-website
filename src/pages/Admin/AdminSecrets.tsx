import { useCallback, useState } from 'react'
import { GlassPanel, Button, Heading, Text } from '@nexus/ui'
import { useAsyncMount } from '../../hooks'
import { fetchSecretsRegistry, syncSecretsRegistry } from '../../services/platform/platformAdminService'

export default function AdminSecrets() {
  const [secrets, setSecrets] = useState<Array<{ secretKey: string; status: string; description: string }>>([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchSecretsRegistry()
      setSecrets(data.secrets as typeof secrets)
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Secrets Vault</Heading>
      <Text variant="caption">Environment secret inventory — references only, never stores values</Text>
      <Button variant="secondary" disabled={loading} onClick={() => void syncSecretsRegistry().then(refresh)}>Sync from Orchestrator</Button>
      <table className="admin-table">
        <thead><tr><th>Key</th><th>Status</th><th>Description</th></tr></thead>
        <tbody>
          {secrets.map((s) => (
            <tr key={s.secretKey}><td>{s.secretKey}</td><td>{s.status}</td><td>{s.description}</td></tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  )
}
