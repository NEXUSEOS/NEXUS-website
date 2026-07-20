import { useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { submitLaunchFeedback } from '../../services/launch/launchService'

export default function FeedbackPortal() {
  const [category, setCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState<string | null>(null)

  async function submit() {
    try {
      await submitLaunchFeedback({ category, message, rating })
      setStatus('Thank you — your feedback was submitted.')
      setMessage('')
    } catch {
      setStatus('Sign in required to submit feedback.')
    }
  }

  return (
    <PageShell route={routes.feedbackPortal}>
      <Heading as="h1" level="heading">Feedback Portal</Heading>
      <Text variant="muted">Share product feedback to help improve NEXUS for external developers and sponsors.</Text>
      {status && <p role="status">{status}</p>}
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Feedback category">
          <option value="general">General</option>
          <option value="sdk">SDK</option>
          <option value="studio">Studio</option>
          <option value="cloud">Cloud API</option>
          <option value="docs">Documentation</option>
        </select>
      </label>
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Rating (1–5)
        <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} aria-label="Rating" />
      </label>
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} aria-label="Feedback message" />
      </label>
      <Button variant="primary" onClick={() => void submit()} style={{ marginTop: 'var(--spacing-4)' }}>Submit feedback</Button>
    </PageShell>
  )
}
