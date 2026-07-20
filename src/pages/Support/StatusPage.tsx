import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Heading, Text } from '../../components/ui'
import { fetchPublicStatus } from '../../services/launch/launchService'

export default function StatusPage() {
  const [status, setStatus] = useState<{ overall: string; components: Array<{ name: string; status: string; description: string }>; activeIncidents: Array<{ title: string; message: string; status: string }> } | null>(null)

  useEffect(() => {
    void fetchPublicStatus().then((d) =>
      setStatus({
        ...d.status,
        activeIncidents: d.status.activeIncidents as Array<{ title: string; message: string; status: string }>,
      }),
    )
  }, [])

  return (
    <PageShell route={routes.status}>
      <Text variant="muted">Current operational status for NEXUS Cloud and related services.</Text>
      {!status ? (
        <Text>Loading status…</Text>
      ) : (
        <>
          <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>
            Overall: {status.overall.replace(/_/g, ' ')}
          </Heading>
          <ul role="list" style={{ marginTop: 'var(--spacing-4)' }}>
            {status.components.map((c) => (
              <li key={c.name}>
                {c.name} — {c.status.replace(/_/g, ' ')} — {c.description}
              </li>
            ))}
          </ul>
          {status.activeIncidents.length > 0 && (
            <section style={{ marginTop: 'var(--spacing-8)' }}>
              <Heading as="h2" level="title">Active incidents</Heading>
              <ul>
                {status.activeIncidents.map((inc, i) => (
                  <li key={i}>
                    <strong>{inc.title}</strong> ({inc.status}) — {inc.message}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </PageShell>
  )
}
