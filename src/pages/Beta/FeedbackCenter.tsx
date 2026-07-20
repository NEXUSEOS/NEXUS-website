import { useEffect, useState, type FormEvent } from 'react'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { FeedbackItem } from '@nexus/integration'
import { Button, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function FeedbackCenter() {
  const { session, profile } = useAuth()
  const orgId = profile?.organization_id ?? undefined
  const [items, setItems] = useState<FeedbackItem[]>([])
  const [category, setCategory] = useState<FeedbackItem['category']>('general')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const client = getBetaClient(session?.access_token, orgId)
    client
      .listFeedback(orgId)
      .then(setItems)
      .catch(() => setItems([]))
  }, [orgId, session?.access_token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const client = getBetaClient(session?.access_token, orgId)
    try {
      const item = await client.submitFeedback({
        organizationId: orgId,
        category,
        message,
        rating,
      })
      setItems((prev) => [item, ...prev])
      setMessage('')
      setStatus('Feedback submitted — thank you.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Feedback Center
        </Heading>
        <Text variant="muted">Share product feedback to shape the NEXUS Beta Program.</Text>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} aria-label="Submit feedback" className="download-card">
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as FeedbackItem['category'])}>
            <option value="general">General</option>
            <option value="feature">Feature request</option>
            <option value="ux">UX / Design</option>
            <option value="docs">Documentation</option>
          </select>
        </label>
        <label className="field">
          <span>Rating (1–5)</span>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            aria-valuemin={1}
            aria-valuemax={5}
          />
        </label>
        <label className="field">
          <span>Message</span>
          <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <Button type="submit" variant="primary">
          Submit Feedback
        </Button>
        {status ? (
          <Text role="status" aria-live="polite">
            {status}
          </Text>
        ) : null}
      </form>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Recent Feedback
      </Heading>
      <ul aria-label="Recent feedback submissions">
        {items.slice(0, 10).map((item) => (
          <li key={item.id}>
            <Text>
              [{item.category}] {item.message} — {item.status}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  )
}
