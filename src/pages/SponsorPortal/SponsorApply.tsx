import { useState } from 'react'
import type { FormEvent } from 'react'
import { trackPortalEvent } from '../../services/analytics/analyticsService'
import { submitSponsorApplication } from '../../services/developer/developerPortalService'
import { useAuth } from '../../hooks'
import { Button, GlassPanel, Heading, Text } from '../../components/ui'
import '../../components/auth/AuthForm.css'
import '../../layouts/PortalLayout.css'

export default function SponsorApply() {
  const { user } = useAuth()
  const [organization, setOrganization] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState(user?.email ?? '')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user?.id) return

    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      await submitSponsorApplication({ organizationName: organization, contactName, email, message })
      await trackPortalEvent(user.id, 'sponsor', 'application', { organization, contactName, email })
      setSuccess('Your sponsor application has been submitted. The NEXUS team will follow up shortly.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Sponsor Application
        </Heading>
        <Text variant="muted">Apply to partner with NEXUS Robotics.</Text>
      </div>

      <GlassPanel className="auth-layout__panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="organization">
              Organization
            </label>
            <input
              id="organization"
              className="auth-form__input"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="contactName">
              Contact Name
            </label>
            <input
              id="contactName"
              className="auth-form__input"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="auth-form__input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="auth-form__input"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>
          {error ? <p className="auth-form__error">{error}</p> : null}
          {success ? <p className="auth-form__success">{success}</p> : null}
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application'}
          </Button>
        </form>
      </GlassPanel>
    </div>
  )
}
