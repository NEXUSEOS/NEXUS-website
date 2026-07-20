import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import { fetchDeveloperActivity, listOrganizations } from '../../services/developer/developerPortalService'
import { Heading, Text } from '../../components/ui'

export default function DeveloperActivityFeed() {
  const { user } = useAuth()
  const [activity, setActivity] = useState<Array<{ id: string; eventType: string; summary: string; resource: string; createdAt: string }>>([])

  useEffect(() => {
    if (!user) return
    void listOrganizations()
      .then((orgs) => (orgs[0] ? fetchDeveloperActivity(orgs[0].id) : null))
      .then((data) => {
        if (data) setActivity(data.activity)
      })
      .catch(() => setActivity([]))
  }, [user])

  return (
    <PageShell route={routes.developerPortalActivity}>
      <Heading as="h1" level="heading">Developer Activity Feed</Heading>
      <Text variant="muted">Workflow events, publishes, validations, and portal actions.</Text>
      <ul style={{ marginTop: 'var(--spacing-8)' }}>
        {activity.length === 0 ? (
          <li>No activity yet — validate or publish a package to get started.</li>
        ) : (
          activity.map((item) => (
            <li key={item.id} style={{ marginBottom: 'var(--spacing-3)' }}>
              <strong>{item.eventType}</strong> — {item.summary}
              <Text variant="muted"> {new Date(item.createdAt).toLocaleString()}</Text>
            </li>
          ))
        )}
      </ul>
    </PageShell>
  )
}
