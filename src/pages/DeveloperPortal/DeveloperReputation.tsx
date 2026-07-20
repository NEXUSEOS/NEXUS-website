import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import {
  fetchAchievementCatalog,
  fetchDeveloperReputation,
  fetchReputationLeaderboard,
  fetchUserAchievements,
} from '../../services/developer/developerOpsService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function DeveloperReputation() {
  const [reputation, setReputation] = useState<{ score: number; tier: string; certifications: number; downloads: number } | null>(null)
  const [earned, setEarned] = useState<Array<{ achievement: { title: string; points: number }; earnedAt: string }>>([])
  const [catalog, setCatalog] = useState<Array<{ title: string; description: string; points: number }>>([])
  const [leaderboard, setLeaderboard] = useState<Array<{ organizationId: string; score: number; tier: string }>>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = orgId()
    void fetchAchievementCatalog()
      .then((d) => setCatalog(d.achievements))
      .catch(() => undefined)
    void fetchReputationLeaderboard()
      .then((d) => setLeaderboard(d.leaderboard))
      .catch(() => undefined)
    if (!id) return
    void Promise.all([fetchDeveloperReputation(id), fetchUserAchievements(id)])
      .then(([rep, ach]) => {
        setReputation(rep.reputation)
        setEarned(ach.achievements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load reputation'))
  }, [])

  return (
    <section aria-labelledby="reputation-title">
      <Heading as="h1" level="heading" id="reputation-title">Developer Reputation</Heading>
      <Text variant="muted">Achievements, leaderboards, and certification-driven reputation tiers.</Text>
      {error && <p role="alert">{error}</p>}
      {reputation && (
        <ul role="list" style={{ marginTop: 'var(--spacing-4)' }}>
          <li>Score: {reputation.score}</li>
          <li>Tier: {reputation.tier}</li>
          <li>Certifications: {reputation.certifications}</li>
          <li>Downloads: {reputation.downloads}</li>
        </ul>
      )}

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Your achievements</Heading>
      <ul role="list">
        {earned.map((e) => (
          <li key={e.earnedAt}>{e.achievement.title} (+{e.achievement.points} pts)</li>
        ))}
        {earned.length === 0 && <li>No achievements earned yet</li>}
      </ul>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Achievement catalog</Heading>
      <ul role="list">
        {catalog.map((a) => (
          <li key={a.title}>{a.title} — {a.description} ({a.points} pts)</li>
        ))}
      </ul>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Leaderboard</Heading>
      <ol>
        {leaderboard.slice(0, 15).map((row, i) => (
          <li key={row.organizationId}>#{i + 1} {row.organizationId.slice(0, 8)}… — {row.score} ({row.tier})</li>
        ))}
      </ol>
    </section>
  )
}
