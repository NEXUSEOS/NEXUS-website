import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text, Button } from '@nexus/ui'
import { completeCustomerOnboardingStep, fetchCustomerOnboarding } from '../../services/publicBeta/publicBetaService'

const STEPS = [
  { key: 'account', label: 'Create account', href: '/signup' },
  { key: 'plan', label: 'Choose a plan', href: '/pricing' },
  { key: 'checkout', label: 'Complete checkout', href: '/pricing' },
  { key: 'support', label: 'Visit support center', href: '/support' },
  { key: 'community', label: 'Join the community', href: '/community' },
]

export default function CustomerOnboarding() {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchCustomerOnboarding()
      .then((d) => {
        setProgress(d.onboarding.progressPercent)
        setCompleted(new Set(d.onboarding.steps.filter((s) => s.completed).map((s) => s.stepKey)))
      })
      .catch(() => setError('Sign in to track customer onboarding progress'))
  }, [])

  async function markComplete(stepKey: string) {
    try {
      await completeCustomerOnboardingStep(stepKey)
      setCompleted((prev) => new Set([...prev, stepKey]))
      setProgress(Math.round(((completed.size + 1) / STEPS.length) * 100))
    } catch {
      setError('Could not save progress — sign in required')
    }
  }

  return (
    <GlassPanel className="admin-page" style={{ maxWidth: 720, margin: '2rem auto' }}>
      <Heading as="h1" level="title">Customer Onboarding</Heading>
      <Text variant="caption">Get started with NEXUS — plan, checkout, support, and community</Text>
      <Text variant="muted">Progress: {progress}%</Text>
      {error && <Text variant="muted">{error}</Text>}
      <ol>
        {STEPS.map((step, i) => (
          <li key={step.key} style={{ marginBottom: '1rem' }}>
            <Heading as="h3" level="title">{i + 1}. {step.label}</Heading>
            {completed.has(step.key) ? (
              <Text variant="caption">Completed</Text>
            ) : (
              <>
                <Link to={step.href}><Button variant="secondary">Go</Button></Link>
                <Button variant="ghost" onClick={() => void markComplete(step.key)}>Mark complete</Button>
              </>
            )}
          </li>
        ))}
      </ol>
    </GlassPanel>
  )
}
