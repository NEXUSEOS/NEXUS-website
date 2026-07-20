import { useEffect, useState } from 'react'
import { Button, GlassPanel, Heading, Text } from '@nexus/ui'
import { evaluateProductionAlerts, fetchProductionMonitoring } from '../../services/platform/productionOpsService'

export default function AdminMonitoring() {
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void fetchProductionMonitoring().then((d) => setDashboard(d.dashboard)).catch(() => {})
  }, [])

  const alerts = dashboard?.alerts as { triggered?: Array<{ message: string; severity: string }> } | undefined

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Monitoring Center</Heading>
      <Text variant="caption">Prometheus metrics, alert rules, traces, and incident signals</Text>
      {message && <Text variant="muted">{message}</Text>}
      <Text variant="caption">Traces (24h): {String(dashboard?.traces24h ?? '—')}</Text>
      <Text variant="caption">Open alerts: {String(dashboard?.openAlerts ?? '—')}</Text>
      <Text variant="caption">Open incidents: {String(dashboard?.openIncidents ?? '—')}</Text>
      <Heading as="h3" level="title">Recent Alert Evaluations</Heading>
      <ul>
        {(alerts?.triggered ?? []).slice(0, 10).map((a, i) => (
          <li key={i}><Text variant="muted">{a.severity}: {a.message}</Text></li>
        ))}
      </ul>
      <Button variant="primary" onClick={() => void evaluateProductionAlerts().then(() => setMessage('Alerts evaluated')).catch((e: Error) => setMessage(e.message))}>
        Evaluate Alert Rules
      </Button>
    </GlassPanel>
  )
}
