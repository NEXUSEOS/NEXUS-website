import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import WelcomeTour from '../../components/launch/WelcomeTour'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { completeOnboardingStep, fetchOnboarding } from '../../services/launch/launchService'

const stepMeta: Record<string, { title: string; description: string; link: string; linkLabel: string }> = {
  account: {
    title: 'Create your account',
    description: 'Sign up with NEXUS auth for unified login across Website, Studio, and Cloud.',
    link: routes.signUp.path,
    linkLabel: 'Sign up',
  },
  tiers: {
    title: 'Review sponsor tiers',
    description: 'Understand partnership levels and benefits before applying.',
    link: '/sponsors/tiers',
    linkLabel: 'Sponsor Tiers',
  },
  apply: {
    title: 'Submit sponsor application',
    description: 'Tell us about your organization and partnership goals.',
    link: '/sponsors/portal/apply',
    linkLabel: 'Apply',
  },
  portal: {
    title: 'Open the Sponsor Portal',
    description: 'Track application status, organization details, and roadmap access.',
    link: '/sponsors/portal',
    linkLabel: 'Sponsor Portal',
  },
  roadmap: {
    title: 'Explore roadmap access',
    description: 'Review upcoming platform milestones available to partners.',
    link: '/sponsors/portal/roadmap',
    linkLabel: 'Roadmap',
  },
}

export default function SponsorOnboarding() {
  const [progress, setProgress] = useState(0)
  const [steps, setSteps] = useState<Array<{ stepKey: string; step: number; completed: boolean }>>([])

  useEffect(() => {
    void fetchOnboarding('sponsor')
      .then((data) => {
        setSteps(data.onboarding.steps)
        setProgress(data.onboarding.progressPercent)
      })
      .catch(() => {
        setSteps(Object.keys(stepMeta).map((stepKey, i) => ({ stepKey, step: i + 1, completed: false })))
      })
  }, [])

  async function markComplete(stepKey: string) {
    try {
      await completeOnboardingStep('sponsor', stepKey)
      const data = await fetchOnboarding('sponsor')
      setSteps(data.onboarding.steps)
      setProgress(data.onboarding.progressPercent)
    } catch {
      /* sign-in required */
    }
  }

  return (
    <PageShell route={routes.sponsorOnboarding}>
      <WelcomeTour portal="sponsor" />
      <Text variant="muted">
        Sponsor onboarding guides external partners from account creation through portal access and roadmap visibility.
      </Text>
      {progress > 0 && <Text variant="caption">Progress: {progress}%</Text>}

      <ol aria-label="Sponsor onboarding steps" style={{ marginTop: 'var(--spacing-8)' }}>
        {steps.map((item) => {
          const meta = stepMeta[item.stepKey]
          if (!meta) return null
          return (
            <li key={item.stepKey} style={{ marginBottom: 'var(--spacing-6)' }}>
              <Heading as="h2" level="title">
                Step {item.step}: {meta.title} {item.completed ? '✓' : ''}
              </Heading>
              <Text variant="muted">{meta.description}</Text>
              <div className="download-card__actions">
                <Link to={meta.link}>
                  <Button variant="secondary">{meta.linkLabel}</Button>
                </Link>
                {!item.completed && (
                  <Button variant="ghost" onClick={() => void markComplete(item.stepKey)}>
                    Mark complete
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </PageShell>
  )
}
