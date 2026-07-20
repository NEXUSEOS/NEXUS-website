import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import {
  fetchDeveloperAnalytics,
  fetchDeveloperDashboard,
  listOrganizations,
} from '../../services/developer/developerPortalService'

export default function DeveloperAnalytics() {
  const [orgId, setOrgId] = useState<string | null>(null)
  const [summary, setSummary] = useState<Record<string, unknown> | null>(null)
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void listOrganizations()
      .then((orgs) => {
        const id = orgs[0]?.id ?? null
        setOrgId(id)
        if (!id) return
        return Promise.all([fetchDeveloperAnalytics(id), fetchDeveloperDashboard(id)])
      })
      .then((result) => {
        if (!result) return
        setSummary(result[0] as Record<string, unknown>)
        setDashboard((result[1] as { dashboard: Record<string, unknown> }).dashboard)
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load analytics'))
  }, [])

  return (
    <section aria-labelledby="dev-analytics-title">
      <Heading as="h1" level="heading" id="dev-analytics-title">Developer Analytics</Heading>
      <Text variant="muted">API usage, package uploads, validations, and publishes for your organization.</Text>
      {error && <p role="alert">{error}</p>}
      {orgId && (
        <dl className="portal-metrics" style={{ marginTop: 'var(--spacing-6)' }}>
          <div><dt>Organization</dt><dd><code>{orgId}</code></dd></div>
          {dashboard && (
            <>
              <div><dt>Packages</dt><dd>{String(dashboard.packageCount ?? 0)}</dd></div>
              <div><dt>Marketplace listings</dt><dd>{String(dashboard.listingCount ?? 0)}</dd></div>
              <div><dt>Certifications</dt><dd>{String(dashboard.certificationCount ?? 0)}</dd></div>
            </>
          )}
        </dl>
      )}
      {summary && (
        <pre style={{ marginTop: 'var(--spacing-6)', overflow: 'auto' }} aria-label="Analytics summary">
          {JSON.stringify(summary, null, 2)}
        </pre>
      )}
    </section>
  )
}
