import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PortalMetricCard } from '../../components/portal'
import { developerPlatformSections } from '../../config/developerPlatform'
import { routes } from '../../config'
import { getDashboardMetrics, type DashboardMetrics } from '../../services/analytics/analyticsService'
import { fetchDeveloperDashboard, listOrganizations } from '../../services/developer/developerPortalService'
import { useAuth } from '../../hooks'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

const defaultMetrics: DashboardMetrics = {
  totalDownloads: 0,
  portalVisits: 0,
  lastDownloadAt: null,
  recentEvents: [],
}

export default function DeveloperDashboard() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics)
  const [cloudPackages, setCloudPackages] = useState(0)

  useEffect(() => {
    if (!user?.id) return

    getDashboardMetrics(user.id)
      .then(setMetrics)
      .catch(() => setMetrics(defaultMetrics))

    void listOrganizations()
      .then((orgs) => (orgs[0] ? fetchDeveloperDashboard(orgs[0].id) : null))
      .then((data) => {
        if (data) setCloudPackages(Number((data as { dashboard: { packageCount?: number } }).dashboard.packageCount ?? 0))
      })
      .catch(() => undefined)
  }, [user?.id])

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Developer Dashboard
        </Heading>
        <Text variant="muted">Production gateway for NEXUS developers — SDK, behaviors, and cloud integration.</Text>
      </div>

      <div className="portal-metrics" aria-label="Dashboard metrics">
        <PortalMetricCard label="Total Downloads" value={metrics.totalDownloads} />
        <PortalMetricCard label="Portal Visits" value={metrics.portalVisits} />
        <PortalMetricCard
          label="Last Download"
          value={metrics.lastDownloadAt ? new Date(metrics.lastDownloadAt).toLocaleDateString() : '—'}
        />
        <PortalMetricCard label="Recent Events" value={metrics.recentEvents.length} />
        <PortalMetricCard label="Cloud Packages" value={cloudPackages} />
      </div>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Platform Sections
      </Heading>
      <div className="download-grid">
        {developerPlatformSections.map((section) => (
          <GlassPanel key={section.id} className="download-card">
            <Heading as="h3" level="title">
              {section.title}
            </Heading>
            <Text variant="muted">{section.description}</Text>
            <Text variant="caption">Status: {section.status}</Text>
            <Link to={section.path} className="button button--secondary">
              Open
            </Link>
          </GlassPanel>
        ))}
      </div>

      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-8)' }}>
        <Link to={routes.docs.path} className="button button--primary">
          Documentation
        </Link>
        <Link to={routes.developerPortalBehaviors.path} className="button button--secondary">
          Behavior Library
        </Link>
        <Link to={routes.downloadCenter.path} className="button button--ghost">
          Download Center
        </Link>
      </div>
    </div>
  )
}
