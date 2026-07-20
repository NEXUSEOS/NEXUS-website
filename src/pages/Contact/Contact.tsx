import { useState } from 'react'
import { MarketingPage } from '../../components/marketing'
import { Button, GlassPanel, Text } from '../../components/ui'
import { routes } from '../../config'
import { createWebsiteCmsClient } from '../../services/cms/cmsContentService'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      path: window.location.pathname,
    }
    try {
      await createWebsiteCmsClient().trackAnalyticsEvent({
        portal: 'website',
        eventType: 'contact_submission',
        payload,
      })
      setSubmitted(true)
    } catch {
      setError('Unable to send right now. Please email partnerships@nexus.local directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MarketingPage
      route={routes.contact}
      headline="Contact NEXUS"
      subheadline="Partnerships, support, press, and careers — we read every message."
      features={[
        { title: 'Developers', description: 'SDK, portal access, and beta program questions.' },
        { title: 'Sponsors & investors', description: 'Partnership tiers and funding conversations.' },
        { title: 'Enterprise', description: 'Deployment, security reviews, and custom agreements.' },
      ]}
    >
      <GlassPanel className="marketing-page__card" style={{ maxWidth: 560, margin: '0 auto' }}>
        {submitted ? (
          <Text variant="muted" role="status">Thank you — your message has been recorded. Our team will respond shortly.</Text>
        ) : (
          <form className="contact-form" onSubmit={(e) => void handleSubmit(e)}>
            <label>
              Name
              <input name="name" required aria-label="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required aria-label="Your email" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required aria-label="Your message" />
            </label>
            {error ? <Text variant="muted" role="alert">{error}</Text> : null}
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        )}
      </GlassPanel>
    </MarketingPage>
  )
}

