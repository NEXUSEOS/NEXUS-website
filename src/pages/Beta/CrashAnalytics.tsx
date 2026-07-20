import { useEffect, useState } from 'react'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { CrashEvent } from '@nexus/integration'
import { PortalMetricCard } from '../../components/portal'
import { Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function CrashAnalytics() {
  const { session } = useAuth()
  const [crashes, setCrashes] = useState<CrashEvent[]>([])

  useEffect(() => {
    const client = getBetaClient(session?.access_token)
    client
      .listCrashes()
      .then(setCrashes)
      .catch(() => setCrashes([]))
  }, [session?.access_token])

  const totalCount = crashes.reduce((sum, c) => sum + c.count, 0)

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Crash Analytics
        </Heading>
        <Text variant="muted">Aggregated crash fingerprints from Studio and OS runtimes.</Text>
      </div>

      <div className="portal-metrics" aria-label="Crash analytics summary">
        <PortalMetricCard label="Unique Crashes" value={crashes.length} />
        <PortalMetricCard label="Total Occurrences" value={totalCount} />
        <PortalMetricCard label="Studio" value={crashes.filter((c) => c.source === 'studio').length} />
        <PortalMetricCard label="OS" value={crashes.filter((c) => c.source === 'os').length} />
      </div>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Crash Groups
      </Heading>
      <table aria-label="Crash event groups">
        <thead>
          <tr>
            <th scope="col">Source</th>
            <th scope="col">Message</th>
            <th scope="col">Version</th>
            <th scope="col">Count</th>
            <th scope="col">Last seen</th>
          </tr>
        </thead>
        <tbody>
          {crashes.map((crash) => (
            <tr key={crash.id}>
              <td>{crash.source}</td>
              <td>{crash.message}</td>
              <td>{crash.version}</td>
              <td>{crash.count}</td>
              <td>{new Date(crash.lastSeenAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {crashes.length === 0 ? <Text variant="muted">No crashes recorded.</Text> : null}
    </div>
  )
}
