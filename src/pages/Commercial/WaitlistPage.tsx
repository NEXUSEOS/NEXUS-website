import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { joinWaitlist } from '../../services/commercial/commercialService'
import { Button, Heading, Text } from '../../components/ui'

export default function WaitlistPage() {
  const [waitlistType, setWaitlistType] = useState<'developer' | 'sponsor'>('developer')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const { entry } = await joinWaitlist({ email, waitlistType, name, company })
      setPosition(entry.position)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Waitlist signup failed')
    }
  }

  return (
    <PageShell route={{ path: '/waitlist', title: 'Waitlist', description: 'Join the NEXUS developer or sponsor waitlist.' }}>
      <Heading as="h1" level="heading">NEXUS Launch Waitlist</Heading>
      <Text variant="muted">Reserve your spot for public beta access — developers and sponsors welcome.</Text>

      {submitted ? (
        <div aria-live="polite" style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title">You&apos;re on the list!</Heading>
          <Text>Position #{position ?? '—'} in the {waitlistType} waitlist.</Text>
          <Text variant="muted">
            <Link to={routes.developerOnboarding.path}>Developer onboarding</Link> ·{' '}
            <Link to={routes.sponsorOnboarding.path}>Sponsor onboarding</Link>
          </Text>
        </div>
      ) : (
        <form onSubmit={(e) => void handleSubmit(e)} aria-label="Waitlist signup" style={{ marginTop: 'var(--spacing-8)', maxWidth: 480 }}>
          <fieldset style={{ border: 'none', padding: 0, marginBottom: 'var(--spacing-4)' }}>
            <legend>Waitlist type</legend>
            <label>
              <input type="radio" name="type" checked={waitlistType === 'developer'} onChange={() => setWaitlistType('developer')} />
              {' '}Developer
            </label>
            {' '}
            <label>
              <input type="radio" name="type" checked={waitlistType === 'sponsor'} onChange={() => setWaitlistType('sponsor')} />
              {' '}Sponsor
            </label>
          </fieldset>
          <label className="field">
            <span>Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="field">
            <span>Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span>Company (optional)</span>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          {error && <p role="alert">{error}</p>}
          <Button type="submit" variant="primary">Join waitlist</Button>
        </form>
      )}
    </PageShell>
  )
}
