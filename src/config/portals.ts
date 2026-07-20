export {
  developerPortalNav as platformDeveloperPortalNav,
  downloadCatalog,
  sponsorPortalNav,
  sponsorshipTiers,
} from '@nexus/config'
export type {
  DownloadCategory,
  DownloadMetadata,
  PortalNavItem,
  SponsorshipTier,
} from '@nexus/config'

import { developerPortalNav as platformDeveloperPortalNav } from '@nexus/config'
import { developerPlatformNav } from './developerPlatform'

/** Extended developer portal navigation including platform architecture sections. */
export const developerPortalNav = [...platformDeveloperPortalNav, ...developerPlatformNav]
