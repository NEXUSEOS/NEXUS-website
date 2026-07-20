import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { socialLinks } from '@nexus/config'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { fetchForumIntegrations } from '../../services/launch/launchService'
import { fetchCommunityForums, fetchCommunityLeaderboard } from '../../services/community/communityService'
import { fetchChallenges } from '../../services/publicBeta/publicBetaService'

export default function Community() {
  const [forums, setForums] = useState<Array<{ label: string; url: string; description: string }>>([])
  const [nativeForums, setNativeForums] = useState<Array<{ id: string; name: string; description: string }>>([])
  const [leaderboard, setLeaderboard] = useState<Array<{ displayName: string; points: number }>>([])
  const [challenges, setChallenges] = useState<Array<{ title: string; slug: string }>>([])

  useEffect(() => {
    void Promise.all([
      fetchForumIntegrations().then((d) => setForums(d.forums)).catch(() => {}),
      fetchCommunityForums().then((d) => setNativeForums(d.forums)).catch(() => {}),
      fetchCommunityLeaderboard().then((d) => setLeaderboard(d.leaderboard.slice(0, 5))).catch(() => {}),
      fetchChallenges().then((d) => setChallenges(d.challenges)).catch(() => {}),
    ])
  }, [])

  return (
    <PageShell route={routes.community}>
      <Text variant="muted">Join the NEXUS community — forums, reputation, hackathons, and programs.</Text>

      <section aria-labelledby="native-forums" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="native-forums">Platform Forums</Heading>
        <ul>
          {nativeForums.map((forum) => (
            <li key={forum.id}><Text>{forum.name}</Text> — <Text variant="muted">{forum.description}</Text></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="community-leaderboard" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="community-leaderboard">Reputation Leaderboard</Heading>
        <ol>
          {leaderboard.map((entry, i) => (
            <li key={i}>{entry.displayName} — {entry.points} pts</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="community-challenges" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="community-challenges">Hackathons & Challenges</Heading>
        <ul>
          {challenges.map((c) => (
            <li key={c.slug}><Link to={`/community/challenges/${c.slug}`}>{c.title}</Link></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="community-forums" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="community-forums">External Forums</Heading>
        <ul aria-label="Forum integrations">
          {forums.map((forum) => (
            <li key={forum.label} style={{ marginBottom: 'var(--spacing-4)' }}>
              {forum.url.startsWith('http') ? (
                <a href={forum.url} target="_blank" rel="noopener noreferrer">{forum.label}</a>
              ) : (
                <Link to={forum.url}>{forum.label}</Link>
              )}
              <Text variant="muted">{forum.description}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="community-links" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="community-links">Connect</Heading>
        <ul>
          {socialLinks.map((link) => (
            <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="community-programs" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="community-programs">Programs</Heading>
        <div className="download-card__actions">
          <Link to="/beta"><Button variant="primary">Public Beta Hub</Button></Link>
          <Link to={routes.betaApply.path}><Button variant="secondary">Apply for Beta</Button></Link>
          <Link to={routes.developerOnboarding.path}><Button variant="ghost">Developer Onboarding</Button></Link>
        </div>
      </section>
    </PageShell>
  )
}
