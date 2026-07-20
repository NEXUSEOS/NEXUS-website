import { useCallback, useState } from 'react'
import { Button, Heading, Text } from '@nexus/ui'
import { useAsyncMount } from '../../hooks'
import { fetchCiBuildHealth } from '../../services/platform/missionControlService'

type CiHealthOverview = {
  lastBuild?: string | null
  lastDeployment?: string | null
  lintStatus?: string
  typescriptStatus?: string
  buildStatus?: string
  githubActionsStatus?: string
  githubActionsConclusion?: string | null
  pagesStatus?: string
  pagesLive?: boolean
  deploymentUrl?: string | null
  productionUrl?: string | null
}

function statusLabel(value?: string): string {
  if (!value) return '—'
  return value
}

/** EPIC 70 — CI build health summary for website admin Mission Control. */
export default function AdminCiHealthWidget({ overview }: { overview?: CiHealthOverview | null }) {
  const [health, setHealth] = useState<CiHealthOverview | null>(overview ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const payload = await fetchCiBuildHealth()
      setHealth(payload.health as CiHealthOverview)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load CI health')
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(refresh)

  const data = health ?? overview

  return (
    <section>
      <Heading as="h3" level="title">CI Build Health</Heading>
      <Text variant="caption">Lint, TypeScript, GitHub Actions, and Pages status</Text>
      <div className="admin-page__actions">
        <Button variant="secondary" onClick={() => void refresh()} disabled={loading}>Refresh CI Health</Button>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="admin-stats">
        <div className="admin-stat"><Text variant="caption">Lint</Text><strong>{statusLabel(data?.lintStatus)}</strong></div>
        <div className="admin-stat"><Text variant="caption">TypeScript</Text><strong>{statusLabel(data?.typescriptStatus)}</strong></div>
        <div className="admin-stat"><Text variant="caption">Build</Text><strong>{statusLabel(data?.buildStatus)}</strong></div>
        <div className="admin-stat"><Text variant="caption">GitHub Actions</Text><strong>{statusLabel(data?.githubActionsStatus)}{data?.githubActionsConclusion ? ` (${data.githubActionsConclusion})` : ''}</strong></div>
        <div className="admin-stat"><Text variant="caption">Pages</Text><strong>{data?.pagesLive ? 'live' : statusLabel(data?.pagesStatus)}</strong></div>
        <div className="admin-stat"><Text variant="caption">Last Build</Text><strong>{data?.lastBuild ? new Date(data.lastBuild).toLocaleString() : '—'}</strong></div>
        <div className="admin-stat"><Text variant="caption">Last Deployment</Text><strong>{data?.lastDeployment ? new Date(data.lastDeployment).toLocaleString() : '—'}</strong></div>
        <div className="admin-stat"><Text variant="caption">Deployment URL</Text><strong>{data?.deploymentUrl ?? '—'}</strong></div>
      </div>
    </section>
  )
}
