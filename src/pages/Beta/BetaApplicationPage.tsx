import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { BetaApplication } from '@nexus/integration'
import { Button, Heading, Text } from '../../components/ui'

export default function BetaApplicationPage() {
  const { user, session } = useAuth()
  const [application, setApplication] = useState<BetaApplication | null>(null)
  const [organizationName, setOrganizationName] = useState('')
  const [useCase, setUseCase] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    const client = getBetaClient(session?.access_token)
    client
      .getBetaApplication(user.id)
      .then(setApplication)
      .catch(() => setApplication(null))
  }, [user?.id, session?.access_token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const client = getBetaClient(session?.access_token)
    try {
      const app = await client.submitBetaApplication({
        email: user?.email ?? '',
        organizationName,
        useCase,
      })
      setApplication(app)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  return (
    <PageShell route={routes.betaApply}>
      {!user ? (
        <Text>
          <Link to={routes.login.path}>Sign in</Link> to apply for the NEXUS Beta Program.
        </Text>
      ) : application ? (
        <div aria-live="polite">
          <Heading as="h2" level="title">
            Application Status: {application.status}
          </Heading>
          <Text variant="muted">Submitted {new Date(application.createdAt).toLocaleDateString()}</Text>
          <Text>Organization: {application.organizationName}</Text>
          <Text>Use case: {application.useCase}</Text>
        </div>
      ) : (
        <form onSubmit={(e) => void handleSubmit(e)} aria-label="Beta program application">
          <label className="field">
            <span>Organization name</span>
            <input
              type="text"
              required
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              aria-required="true"
            />
          </label>
          <label className="field">
            <span>How will you use NEXUS?</span>
            <textarea
              required
              rows={4}
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              aria-required="true"
            />
          </label>
          {error ? (
            <Text role="alert" variant="muted">
              {error}
            </Text>
          ) : null}
          <Button type="submit" variant="primary">
            Submit Application
          </Button>
          {submitted ? <Text aria-live="polite">Application received.</Text> : null}
        </form>
      )}
    </PageShell>
  )
}
