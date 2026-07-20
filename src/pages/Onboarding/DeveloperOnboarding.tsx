import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import WelcomeTour from '../../components/launch/WelcomeTour'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { completeOnboardingStep, fetchOnboarding } from '../../services/launch/launchService'

const stepMeta: Record<string, { title: string; description: string; link: string; linkLabel: string }> = {
  account: { title: 'Create your account', description: 'Sign up with Supabase-backed NEXUS auth.', link: routes.signUp.path, linkLabel: 'Sign up' },
  beta: { title: 'Apply for the Beta Program', description: 'Submit your organization and use case.', link: routes.betaApply.path, linkLabel: 'Apply for Beta' },
  downloads: { title: 'Download Studio & SDK', description: 'Install from the Download Center.', link: routes.downloadCenter.path, linkLabel: 'Download Center' },
  docs: { title: 'Read the documentation', description: 'SDK guides and API references.', link: routes.docsSdk.path, linkLabel: 'SDK Docs' },
  portal: { title: 'Open the Developer Portal', description: 'API keys, tutorials, and beta tools.', link: routes.developerPortal.path, linkLabel: 'Developer Portal' },
}

export default function DeveloperOnboarding() {
  const [progress, setProgress] = useState(0)
  const [steps, setSteps] = useState<Array<{ stepKey: string; step: number; completed: boolean }>>([])

  useEffect(() => {
    void fetchOnboarding('developer')
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
      await completeOnboardingStep('developer', stepKey)
      const data = await fetchOnboarding('developer')
      setSteps(data.onboarding.steps)
      setProgress(data.onboarding.progressPercent)
    } catch {
      /* sign-in required */
    }
  }

  return (
    <PageShell route={routes.developerOnboarding}>
      <WelcomeTour portal="developer" />
      <Text variant="muted">
        Welcome to NEXUS Robotics. This onboarding path takes external developers from account creation to first deployment.
      </Text>
      {progress > 0 && <Text variant="caption">Progress: {progress}%</Text>}

      <ol aria-label="Developer onboarding steps" style={{ marginTop: 'var(--spacing-8)' }}>
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
                <Link to={meta.link}><Button variant="secondary">{meta.linkLabel}</Button></Link>
                {!item.completed && (
                  <Button variant="ghost" onClick={() => void markComplete(item.stepKey)}>Mark complete</Button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </PageShell>
  )
}
