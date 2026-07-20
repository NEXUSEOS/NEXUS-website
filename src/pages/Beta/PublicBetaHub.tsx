import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { fetchChallenges, fetchPublicBetaHub } from '../../services/publicBeta/publicBetaService'

export default function PublicBetaHub() {
  const [hub, setHub] = useState<Record<string, unknown> | null>(null)
  const [challenges, setChallenges] = useState<Array<{ slug: string; title: string; description: string }>>([])

  useEffect(() => {
    void Promise.all([fetchPublicBetaHub(), fetchChallenges()])
      .then(([h, c]) => {
        setHub(h.hub)
        setChallenges(c.challenges)
      })
      .catch(() => {})
  }, [])

  return (
    <PageShell route={{ path: '/beta', title: 'Public Beta', description: 'Join the NEXUS public beta program.' }}>
      <Text variant="muted">NEXUS is entering public beta — onboard as a developer, sponsor, or customer and explore Atlas Alpha.</Text>
      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Get Started</Heading>
        <div className="download-card__actions">
          <Link to={routes.developerOnboarding.path}><Button variant="primary">Developer Onboarding</Button></Link>
          <Link to={routes.sponsorOnboarding.path}><Button variant="secondary">Sponsor Onboarding</Button></Link>
          <Link to="/customers/onboarding"><Button variant="secondary">Customer Onboarding</Button></Link>
          <Link to="/beta/apply"><Button variant="ghost">Apply for Beta</Button></Link>
        </div>
      </section>
      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Program Stats</Heading>
        <Text variant="caption">Beta applications: {String(hub?.betaApplications ?? '—')}</Text>
        <Text variant="caption">Demo environments: {Array.isArray(hub?.demoEnvironments) ? hub.demoEnvironments.length : '—'}</Text>
      </section>
      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Developer Challenges</Heading>
        <ul>
          {challenges.map((c) => (
            <li key={c.slug}><Link to={`/community/challenges/${c.slug}`}>{c.title}</Link> — <Text variant="muted">{c.description}</Text></li>
          ))}
        </ul>
      </section>
      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Link to="/learning"><Button variant="ghost">Learning Center</Button></Link>
        <Link to="/demos"><Button variant="ghost">Demo Projects</Button></Link>
        <Link to="/atlas"><Button variant="ghost">Atlas Alpha</Button></Link>
      </section>
    </PageShell>
  )
}
