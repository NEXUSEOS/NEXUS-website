import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchConfigRegistry } from '../../services/platform/platformAdminService'

export default function AdminConfig() {
  const [data, setData] = useState<{ configs: Array<{ configKey: string; configValue: unknown }>; recentVersions: unknown[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchConfigRegistry().then((data) => {
      setData({
        configs: data.configs as Array<{ configKey: string; configValue: unknown }>,
        recentVersions: data.recentVersions,
      })
    }).catch((err) => setError(err instanceof Error ? err.message : 'Failed'))
  }, [])

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Configuration Registry</Heading>
      <Text variant="caption">Versioned platform configuration — no manual config files</Text>
      {error && <p role="alert">{error}</p>}
      <table className="admin-table">
        <thead><tr><th>Key</th><th>Value</th></tr></thead>
        <tbody>
          {data?.configs.map((c) => (
            <tr key={c.configKey}><td>{c.configKey}</td><td><code>{JSON.stringify(c.configValue).slice(0, 120)}</code></td></tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  )
}
