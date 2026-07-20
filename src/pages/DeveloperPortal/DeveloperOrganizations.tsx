import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { createSandboxOrganization, listOrganizations, listSandboxOrganizations } from '../../services/developer/developerPortalService'
import { inviteTeamMember, listTeamInvites } from '../../services/developer/developerOpsService'

export default function DeveloperOrganizations() {
  const [orgs, setOrgs] = useState<Array<{ id: string; name: string; slug: string }>>([])
  const [sandboxes, setSandboxes] = useState<Array<{ organizations: { id: string; name: string; slug: string } }>>([])
  const [invites, setInvites] = useState<Array<{ id: string; email: string; role: string; status: string }>>([])
  const [activeOrg, setActiveOrg] = useState(localStorage.getItem('nexus-organization-id') ?? '')
  const [name, setName] = useState('my-sandbox')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('developer')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void Promise.all([listOrganizations(), listSandboxOrganizations()])
      .then(([o, s]) => {
        setOrgs(o)
        setSandboxes(s)
        if (!activeOrg && o[0]) {
          setActiveOrg(o[0].id)
          localStorage.setItem('nexus-organization-id', o[0].id)
        }
      })
      .catch(() => undefined)
  }, [activeOrg])

  useEffect(() => {
    if (!activeOrg) return
    void listTeamInvites(activeOrg).then((d) => setInvites(d.invites)).catch(() => setInvites([]))
  }, [activeOrg])

  async function createSandbox() {
    const org = await createSandboxOrganization(name)
    setMessage(`Sandbox created: ${org.name}`)
    const s = await listSandboxOrganizations()
    setSandboxes(s)
  }

  function selectOrg(id: string) {
    setActiveOrg(id)
    localStorage.setItem('nexus-organization-id', id)
    setMessage(`Active organization set`)
  }

  async function sendInvite() {
    if (!activeOrg || !inviteEmail) return
    await inviteTeamMember(activeOrg, inviteEmail, inviteRole)
    setMessage(`Invite sent to ${inviteEmail}`)
    const d = await listTeamInvites(activeOrg)
    setInvites(d.invites)
    setInviteEmail('')
  }

  return (
    <section aria-labelledby="dev-orgs-title">
      <Heading as="h1" level="heading" id="dev-orgs-title">Organizations & Teams</Heading>
      <Text variant="muted">Team workspaces, sandbox organizations, and developer team invites.</Text>
      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Your organizations</Heading>
      <ul role="list">
        {orgs.map((o) => (
          <li key={o.id}>
            {o.name} — <code>{o.slug}</code>
            <button type="button" className="button button--secondary" style={{ marginLeft: 8 }} onClick={() => selectOrg(o.id)}>
              {activeOrg === o.id ? 'Active' : 'Set active'}
            </button>
          </li>
        ))}
      </ul>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Team invites</Heading>
      <label>
        Email
        <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} aria-label="Invite email" />
      </label>
      <label>
        Role
        <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} aria-label="Invite role">
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </label>
      <button type="button" className="button button--primary" onClick={() => void sendInvite()} disabled={!activeOrg}>
        Send invite
      </button>
      <ul role="list" style={{ marginTop: 'var(--spacing-4)' }}>
        {invites.map((i) => (
          <li key={i.id}>{i.email} — {i.role} ({i.status})</li>
        ))}
      </ul>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Sandbox organizations</Heading>
      <label>
        Sandbox name
        <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Sandbox name" />
      </label>
      <button type="button" className="button button--primary" onClick={() => void createSandbox()}>Create sandbox</button>
      {message && <p role="status">{message}</p>}
      <ul role="list" style={{ marginTop: 'var(--spacing-4)' }}>
        {sandboxes.map((s) => (
          <li key={s.organizations.id}>{s.organizations.name} (sandbox)</li>
        ))}
      </ul>
    </section>
  )
}
