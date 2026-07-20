import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PortalMetricCard } from '../../components/portal'
import { routes } from '../../config'
import { sponsorshipTiers } from '../../config/portals'
import { getBetaClient } from '../../services/platform/betaService'
import { useAuth } from '../../hooks'
import type { SponsorDashboardSummary } from '@nexus/integration'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function SponsorPartnershipStatus() {
  const { profile, session } = useAuth()
  const orgId = profile?.organization_id ?? 'org-local'
  const [summary, setSummary] = useState<SponsorDashboardSummary | null>(null)
  const tier = sponsorshipTiers[0]

  useEffect(() => {
    const client = getBetaClient(session?.access_token, orgId)
    client
      .getSponsorDashboard(orgId)
      .then(setSummary)
      .catch(() => setSummary(null))
  }, [orgId, session?.access_token])

  const benefits = summary?.benefits ?? tier.benefits

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Sponsor Dashboard
        </Heading>
        <Text variant="muted">Your NEXUS sponsor partnership overview.</Text>
      </div>

      <div className="portal-metrics" aria-label="Sponsor dashboard metrics">
        <PortalMetricCard label="Status" value={summary?.status ?? 'Active Partner'} />
        <PortalMetricCard label="Tier" value={summary?.tier ?? tier.name} />
        <PortalMetricCard label="Organization" value={profile?.organization?.name ?? 'Pending'} />
        <PortalMetricCard label="Pending Applications" value={summary?.pendingApplications ?? 0} />
      </div>

      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Partnership Benefits
        </Heading>
        <ul className="tier-card__benefits" aria-label="Partnership benefits">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <div className="download-card__actions">
          <Link to={routes.sponsorPortalRoadmap.path} className="button button--primary">
            View Roadmap
          </Link>
          <Link to={routes.sponsorPortalApply.path} className="button button--secondary">
            Update Application
          </Link>
          <Link to={routes.sponsorPortalOrganization.path} className="button button--ghost">
            Organization Profile
          </Link>
        </div>
      </GlassPanel>
    </div>
  )
}
