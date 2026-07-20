import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { fetchRoadmapItems, voteRoadmapItem } from '../../services/publicBeta/publicBetaService'

const milestones = [
  { quarter: 'Q3 2026', title: 'Platform Integration', status: 'Complete', items: ['Unified login', 'Cloud sync', 'Update center'] },
  { quarter: 'Q4 2026', title: 'Public Beta & Atlas Alpha', status: 'In progress', items: ['Public beta hub', 'Atlas Alpha RC', 'Community platform'] },
  { quarter: 'Q1 2027', title: 'Marketplace GA', status: 'Planned', items: ['Public listings', 'Package validation', 'Revenue share'] },
  { quarter: 'Q2 2027', title: 'Robot Runtime GA', status: 'Planned', items: ['OTA updates', 'Fleet management', 'On-device AI'] },
]

export default function Roadmap() {
  const [items, setItems] = useState<Array<{ id: string; title: string; description: string; voteCount: number; status: string }>>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void fetchRoadmapItems().then((d) => setItems(d.items)).catch(() => {})
  }, [])

  async function vote(itemId: string) {
    try {
      const result = await voteRoadmapItem(itemId)
      if (result.voted) {
        setMessage('Vote recorded')
        void fetchRoadmapItems().then((d) => setItems(d.items))
      } else {
        setMessage('Already voted')
      }
    } catch {
      setMessage('Sign in to vote')
    }
  }

  return (
    <PageShell route={routes.roadmap}>
      <Text variant="muted">Public roadmap — vote on upcoming platform priorities.</Text>
      {message && <Text variant="caption">{message}</Text>}

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Community Voting</Heading>
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: 'var(--spacing-4)' }}>
              <Heading as="h3" level="title">{item.title}</Heading>
              <Text variant="muted">{item.description} · {item.status} · {item.voteCount} votes</Text>
              <Button variant="secondary" onClick={() => void vote(item.id)}>Vote</Button>
            </li>
          ))}
        </ul>
      </section>

      <div role="list" aria-label="Platform roadmap milestones" style={{ marginTop: 'var(--spacing-8)' }}>
        {milestones.map((milestone) => (
          <article key={milestone.quarter} role="listitem" style={{ marginBottom: 'var(--spacing-6)' }}>
            <Heading as="h2" level="title">{milestone.quarter} — {milestone.title}</Heading>
            <Text>Status: {milestone.status}</Text>
            <ul>
              {milestone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Link to={routes.sponsorPortalRoadmap.path}>
        <Button variant="secondary">Sponsor Roadmap Access</Button>
      </Link>
    </PageShell>
  )
}
