import { useEffect, useState } from 'react'
import { Button, GlassPanel, Heading, Text } from '../../components/ui'
import {
  createApiKey,
  listApiKeys,
  listOrganizations,
  revokeApiKey,
} from '../../services/developer/developerPortalService'
import '../../layouts/PortalLayout.css'

interface ApiKeyRow {
  id: string
  name: string
  keyPrefix: string
  scopes: string[]
  environment: string
  createdAt: string
}

export default function DeveloperApiKeys() {
  const [organizations, setOrganizations] = useState<Array<{ id: string; name: string }>>([])
  const [organizationId, setOrganizationId] = useState('')
  const [keys, setKeys] = useState<ApiKeyRow[]>([])
  const [newKeyName, setNewKeyName] = useState('Production Key')
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listOrganizations()
      .then((orgs) => {
        setOrganizations(orgs)
        if (orgs[0]) {
          setOrganizationId(orgs[0].id)
          localStorage.setItem('nexus-organization-id', orgs[0].id)
        }
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!organizationId) return
    listApiKeys(organizationId)
      .then(setKeys)
      .catch((e: Error) => setError(e.message))
  }, [organizationId])

  async function handleCreate() {
    if (!organizationId) return
    setError(null)
    setCreatedSecret(null)
    try {
      const created = await createApiKey(organizationId, newKeyName)
      setCreatedSecret(created.secret)
      setKeys(await listApiKeys(organizationId))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create API key')
    }
  }

  async function handleRevoke(id: string) {
    if (!organizationId) return
    await revokeApiKey(organizationId, id)
    setKeys(await listApiKeys(organizationId))
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          API Keys
        </Heading>
        <Text variant="muted">Manage programmatic access to the NEXUS platform via Cloud API keys.</Text>
      </div>

      {loading && <Text variant="muted">Loading…</Text>}
      {error && <Text variant="muted" role="alert">{error}</Text>}

      {organizations.length > 0 && (
        <GlassPanel className="download-card" style={{ marginBottom: 'var(--spacing-4)' }}>
          <label htmlFor="org-select" className="auth-form__label">
            Organization
          </label>
          <select
            id="org-select"
            className="auth-form__input"
            value={organizationId}
            onChange={(e) => {
              setOrganizationId(e.target.value)
              localStorage.setItem('nexus-organization-id', e.target.value)
            }}
          >
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </GlassPanel>
      )}

      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Create API Key
        </Heading>
        <input
          className="auth-form__input"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          aria-label="Key name"
        />
        <Button variant="primary" onClick={() => void handleCreate()} aria-label="Create API key">
          Generate Key
        </Button>
        {createdSecret && (
          <Text variant="body" role="status">
            Copy this secret now — it will not be shown again: <code>{createdSecret}</code>
          </Text>
        )}
      </GlassPanel>

      <GlassPanel className="download-card" style={{ marginTop: 'var(--spacing-4)' }}>
        <Heading as="h2" level="title">
          Active Keys
        </Heading>
        <ul className="tier-card__benefits" role="list">
          {keys.map((key) => (
            <li key={key.id}>
              {key.name} ({key.keyPrefix}…) — {key.environment}
              <Button variant="secondary" onClick={() => void handleRevoke(key.id)} aria-label={`Revoke ${key.name}`}>
                Revoke
              </Button>
            </li>
          ))}
          {keys.length === 0 && <li>No API keys yet</li>}
        </ul>
      </GlassPanel>
    </div>
  )
}
