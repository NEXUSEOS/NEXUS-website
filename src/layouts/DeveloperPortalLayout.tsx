import PortalLayout from './PortalLayout'
import { developerPortalNav } from '../config/portals'
import { routes } from '../config'

export default function DeveloperPortalLayout() {
  return (
    <PortalLayout
      title="Developer Portal"
      description="SDK, projects, and platform tools."
      path={routes.developerPortal.path}
      portalId="developer"
      navigation={developerPortalNav}
    />
  )
}
