import { useEffect, useState } from 'react'
import { Button, GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchProductionOperations, triggerProductionBackup } from '../../services/platform/productionOpsService'

export default function AdminDeployment() {
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void fetchProductionOperations().then((d) => setDashboard(d.dashboard)).catch(() => {})
  }, [])

  const deploymentOverview = dashboard?.deploymentOverview as Record<string, unknown> | undefined
  const canaries = Array.isArray(dashboard?.canaries) ? dashboard.canaries : []

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Deployment & Releases</Heading>
      <Text variant="caption">Environments, releases, canary deployments, and blue/green strategy</Text>
      {message && <Text variant="muted">{message}</Text>}
      <ul>
        <li><Text variant="muted">Environments: {Array.isArray(deploymentOverview?.environments) ? deploymentOverview.environments.length : '—'}</Text></li>
        <li><Text variant="muted">Latest migration: {String(deploymentOverview?.latestMigration ?? '—')}</Text></li>
        <li><Text variant="muted">Active previews: {String(deploymentOverview?.activePreviews ?? '—')}</Text></li>
        <li><Text variant="muted">Active canaries: {canaries.filter((c) => (c as { status?: string }).status === 'active').length}</Text></li>
      </ul>
      <Button variant="primary" onClick={() => void triggerProductionBackup().then(() => setMessage('Backup triggered')).catch((e: Error) => setMessage(e.message))}>
        Trigger Backup
      </Button>
    </GlassPanel>
  )
}
