import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PortalMetricCard } from '../../components/portal'
import { routes } from '../../config'
import { developerPlatformNav } from '../../config/developerPlatform'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { BetaDashboardSummary } from '@nexus/integration'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

const defaultSummary: BetaDashboardSummary = {
  pendingInvitations: 0,
  openBugReports: 0,
  crashCount24h: 0,
  feedbackCount: 0,
  preferredChannel: 'beta',
}

export default function BetaDashboard() {
  const { user, session, profile } = useAuth()
  const [summary, setSummary] = useState<BetaDashboardSummary>(defaultSummary)
  const orgId = profile?.organization_id ?? undefined

  useEffect(() => {
    if (!user?.id) return
    const client = getBetaClient(session?.access_token, orgId)
    client
      .getBetaDashboard(orgId ?? 'org-local')
      .then(setSummary)
      .catch(() => setSummary(defaultSummary))
  }, [user?.id, orgId, session?.access_token])

  const betaNav = developerPlatformNav.filter((item) =>
    ['Beta Program', 'Invitations', 'Feedback', 'Bug Reports', 'Crash Analytics'].includes(item.label),
  )

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Beta Dashboard
        </Heading>
        <Text variant="muted">
          NEXUS Beta Program overview — applications, feedback, bugs, and release channels.
        </Text>
      </div>

      <div className="portal-metrics" aria-label="Beta program metrics">
        <PortalMetricCard label="Application" value={summary.applicationStatus ?? 'Not applied'} />
        <PortalMetricCard label="Pending Invites" value={summary.pendingInvitations} />
        <PortalMetricCard label="Open Bugs" value={summary.openBugReports} />
        <PortalMetricCard label="Crashes (24h)" value={summary.crashCount24h} />
        <PortalMetricCard label="Feedback" value={summary.feedbackCount} />
        <PortalMetricCard label="Channel" value={summary.preferredChannel} />
      </div>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Beta Tools
      </Heading>
      <div className="download-grid" role="list" aria-label="Beta program tools">
        {betaNav.map((item) => (
          <GlassPanel key={item.path} className="download-card" role="listitem">
            <Heading as="h3" level="title">
              {item.label}
            </Heading>
            <Link to={item.path} className="button button--secondary" aria-label={`Open ${item.label}`}>
              Open
            </Link>
          </GlassPanel>
        ))}
      </div>

      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-8)' }}>
        <Link to={routes.betaApply.path} className="button button--primary">
          Apply for Beta
        </Link>
        <Link to={routes.releaseChannels.path} className="button button--secondary">
          Release Channels
        </Link>
        <Link to={routes.developerOnboarding.path} className="button button--ghost">
          Developer Onboarding
        </Link>
      </div>
    </div>
  )
}
