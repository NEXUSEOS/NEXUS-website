import { Link } from 'react-router-dom'
import { PermissionGuard } from '../../components/auth'
import { Permission } from '../../config/permissions'
import { routes } from '../../config'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function SponsorRoadmapAccess() {
  return (
    <PermissionGuard permission={Permission.ROADMAP_SPONSOR} resourceName="Sponsor Roadmap">
      <div>
        <div className="portal-layout__header">
          <Heading as="h1" level="heading">
            Sponsor Roadmap Access
          </Heading>
          <Text variant="muted">Exclusive roadmap visibility for NEXUS sponsors.</Text>
        </div>
        <GlassPanel className="download-card">
          <Text variant="body">
            As a NEXUS sponsor, you receive early visibility into platform milestones,
            beta programs, and partnership opportunities before public release.
          </Text>
          <ul className="tier-card__benefits">
            <li>Q3 2026 — Aether Engine formation sequences</li>
            <li>Q4 2026 — NEXUS Studio public beta</li>
            <li>Q1 2027 — Marketplace launch</li>
            <li>Q2 2027 — Cloud fleet management</li>
          </ul>
          <Link to={routes.roadmap.path} className="button button--secondary">
            View Public Roadmap
          </Link>
        </GlassPanel>
      </div>
    </PermissionGuard>
  )
}
