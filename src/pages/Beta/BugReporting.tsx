import { useEffect, useState, type FormEvent } from 'react'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { BugReport } from '@nexus/integration'
import { Button, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function BugReporting() {
  const { session, profile } = useAuth()
  const orgId = profile?.organization_id ?? undefined
  const [reports, setReports] = useState<BugReport[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState<BugReport['severity']>('medium')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const client = getBetaClient(session?.access_token, orgId)
    client
      .listBugReports(orgId)
      .then(setReports)
      .catch(() => setReports([]))
  }, [orgId, session?.access_token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const client = getBetaClient(session?.access_token, orgId)
    try {
      const report = await client.submitBugReport({
        source: 'website',
        title,
        description,
        severity,
      })
      setReports((prev) => [report, ...prev])
      setTitle('')
      setDescription('')
      setStatus('Bug report filed.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Bug Reporting
        </Heading>
        <Text variant="muted">Report defects found during the NEXUS Beta Program.</Text>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} aria-label="Submit bug report" className="download-card">
        <label className="field">
          <span>Title</span>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="field">
          <span>Severity</span>
          <select value={severity} onChange={(e) => setSeverity(e.target.value as BugReport['severity'])}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label className="field">
          <span>Description</span>
          <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <Button type="submit" variant="primary">
          Submit Bug Report
        </Button>
        {status ? (
          <Text role="status" aria-live="polite">
            {status}
          </Text>
        ) : null}
      </form>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Open Reports
      </Heading>
      <ul aria-label="Bug reports">
        {reports
          .filter((r) => r.status === 'open' || r.status === 'triaged')
          .map((report) => (
            <li key={report.id}>
              <Text>
                [{report.severity}] {report.title} — {report.status}
              </Text>
            </li>
          ))}
      </ul>
    </div>
  )
}
