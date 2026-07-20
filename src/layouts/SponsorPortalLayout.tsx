import PortalLayout from './PortalLayout'
import { sponsorPortalNav } from '../config/portals'
import { routes } from '../config'

export default function SponsorPortalLayout() {
  return (
    <PortalLayout
      title="Sponsor Portal"
      description="Partnership status, tiers, and roadmap access."
      path={routes.sponsorPortal.path}
      portalId="sponsor"
      navigation={sponsorPortalNav}
    />
  )
}
