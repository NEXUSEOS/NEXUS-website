import { useEffect, useState } from 'react'
import { Button, GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchProductionOperations, fetchReliabilityRuns, triggerRestoreVerification } from '../../services/platform/productionOpsService'

export default function AdminRecovery() {
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [runs, setRuns] = useState<unknown[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void Promise.all([
      fetchProductionOperations(),
      fetchReliabilityRuns('restore_verify'),
    ]).then(([ops, r]) => {
      setDashboard(ops.dashboard)
      setRuns(r.runs)
    }).catch(() => {})
  }, [])

  const backups = Array.isArray(dashboard?.backups) ? dashboard.backups : []
  const restoreTests = Array.isArray(dashboard?.restoreTests) ? dashboard.restoreTests : []

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Recovery Center</Heading>
      <Text variant="caption">Backup snapshots, restore verification, and disaster recovery status</Text>
      {message && <Text variant="muted">{message}</Text>}
      <Heading as="h3" level="title">Recent Backups</Heading>
      <ul>
        {backups.slice(0, 5).map((b, i) => (
          <li key={i}><Text variant="muted">{JSON.stringify(b)}</Text></li>
        ))}
      </ul>
      <Heading as="h3" level="title">Restore Tests</Heading>
      <ul>
        {restoreTests.slice(0, 5).map((t, i) => (
          <li key={i}><Text variant="muted">{JSON.stringify(t)}</Text></li>
        ))}
      </ul>
      <Heading as="h3" level="title">Reliability Runs</Heading>
      <ul>
        {runs.slice(0, 5).map((r, i) => (
          <li key={i}><Text variant="muted">{JSON.stringify(r)}</Text></li>
        ))}
      </ul>
      <Button variant="primary" onClick={() => void triggerRestoreVerification().then(() => setMessage('Restore verification complete')).catch((e: Error) => setMessage(e.message))}>
        Run Restore Verification
      </Button>
    </GlassPanel>
  )
}
