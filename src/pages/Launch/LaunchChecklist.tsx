import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Heading, Text } from '../../components/ui'
import { fetchLaunchChecklist } from '../../services/launch/launchService'

export default function LaunchChecklist() {
  const [checks, setChecks] = useState<Array<{ id: string; passed: boolean; detail: string }>>([])
  const [score, setScore] = useState<string>('0')
  const [status, setStatus] = useState<string>('review')

  useEffect(() => {
    void fetchLaunchChecklist().then((d) => {
      if (d.run) {
        setChecks(d.run.checks as Array<{ id: string; passed: boolean; detail: string }>)
        setScore(d.run.score)
        setStatus(d.run.status)
      }
    })
  }, [])

  return (
    <PageShell route={routes.launchChecklist}>
      <Heading as="h1" level="heading">External Launch Checklist</Heading>
      <Text variant="muted">Quality gate for external user onboarding — score {score}% ({status}).</Text>

      <ul style={{ marginTop: 'var(--spacing-8)' }}>
        {checks.map((check) => (
          <li key={check.id} style={{ marginBottom: 'var(--spacing-3)' }}>
            {check.passed ? '✓' : '○'} {check.detail}
          </li>
        ))}
      </ul>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Onboarding paths</Heading>
        <ul>
          <li><Link to={routes.developerOnboarding.path}>Developer onboarding</Link></li>
          <li><Link to={routes.sponsorOnboarding.path}>Sponsor onboarding</Link></li>
          <li><Link to={routes.developerPortalInvitations.path}>Beta invitations</Link></li>
        </ul>
      </section>
    </PageShell>
  )
}
