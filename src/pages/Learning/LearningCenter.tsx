import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { Heading, Text } from '../../components/ui'
import { fetchLearningCenter } from '../../services/publicBeta/publicBetaService'

export default function LearningCenter() {
  const [items, setItems] = useState<Array<{ title: string; slug: string; summary: string; url: string; itemType: string; durationMinutes?: number }>>([])

  useEffect(() => {
    void fetchLearningCenter().then((d) => setItems(d.items)).catch(() => {})
  }, [])

  return (
    <PageShell route={{ path: '/learning', title: 'Learning Center', description: 'Guides, videos, and tutorials for NEXUS.' }}>
      <Text variant="muted">Interactive tours, product walkthroughs, and training resources.</Text>
      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Resources</Heading>
        <ul>
          {items.map((item) => (
            <li key={item.slug} style={{ marginBottom: 'var(--spacing-4)' }}>
              <Link to={item.url.startsWith('/') ? item.url : `/docs/guides/${item.slug}`}>{item.title}</Link>
              <Text variant="muted">{item.itemType} · {item.summary}{item.durationMinutes ? ` · ${item.durationMinutes} min` : ''}</Text>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  )
}
