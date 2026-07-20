import { useEffect, useState, type FormEvent } from 'react'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { DeveloperInvitation } from '@nexus/integration'
import { Button, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function DeveloperInvitations() {
  const { session, profile } = useAuth()
  const orgId = profile?.organization_id
  const [invitations, setInvitations] = useState<DeveloperInvitation[]>([])
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!orgId) return
    const client = getBetaClient(session?.access_token, orgId)
    client
      .listInvitations(orgId)
      .then(setInvitations)
      .catch(() => setInvitations([]))
  }, [orgId, session?.access_token])

  async function handleInvite(e: FormEvent) {
    e.preventDefault()
    if (!orgId) return
    const client = getBetaClient(session?.access_token, orgId)
    try {
      const invitation = await client.createInvitation({
        organizationId: orgId,
        email,
        role: 'developer',
      })
      setInvitations((prev) => [invitation, ...prev])
      setEmail('')
      setMessage(`Invitation sent to ${invitation.email}`)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to send invitation')
    }
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Developer Invitations
        </Heading>
        <Text variant="muted">Invite external developers to your NEXUS organization.</Text>
      </div>

      <form onSubmit={(e) => void handleInvite(e)} aria-label="Send developer invitation" className="download-card">
        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
          />
        </label>
        <Button type="submit" variant="primary">
          Send Invitation
        </Button>
        {message ? (
          <Text role="status" aria-live="polite">
            {message}
          </Text>
        ) : null}
      </form>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Pending Invitations
      </Heading>
      <ul aria-label="Pending invitations">
        {invitations.map((inv) => (
          <li key={inv.id}>
            <Text>
              {inv.email} — {inv.status} (expires {new Date(inv.expiresAt).toLocaleDateString()})
            </Text>
          </li>
        ))}
        {invitations.length === 0 ? <Text variant="muted">No invitations yet.</Text> : null}
      </ul>
    </div>
  )
}
