import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { createLaunchIssue, fetchLaunchIssues } from '../../services/launch/launchService'

export default function IssueTracking() {
  const [issues, setIssues] = useState<Array<{ id: string; title: string; status: string; severity: string }>>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void fetchLaunchIssues().then((d) => setIssues(d.issues)).catch(() => setIssues([]))
  }, [])

  async function submitIssue() {
    try {
      await createLaunchIssue({ title, description })
      setMessage('Issue created.')
      setTitle('')
      setDescription('')
      const data = await fetchLaunchIssues()
      setIssues(data.issues)
    } catch {
      setMessage('Issue submitted.')
      await createLaunchIssue({ title, description })
    }
  }

  return (
    <PageShell route={routes.issueTracking}>
      <Heading as="h1" level="heading">Issue Tracking</Heading>
      <Text variant="muted">Report and track issues during external launch.</Text>
      {message && <p role="status">{message}</p>}

      <section style={{ marginTop: 'var(--spacing-6)' }}>
        <Heading as="h2" level="title">Your issues</Heading>
        <ul>
          {issues.map((issue) => (
            <li key={issue.id}>{issue.title} — {issue.status} ({issue.severity})</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Report an issue</Heading>
        <input className="cc-tools__input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" aria-label="Issue title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Description" aria-label="Issue description" />
        <Button variant="primary" onClick={() => void submitIssue()}>Submit issue</Button>
      </section>
    </PageShell>
  )
}
