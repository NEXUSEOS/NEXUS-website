export const company = {
  name: 'NEXUS Robotics',
  shortName: 'NEXUS',
  tagline: 'One Ecosystem. One Experience.',
  copyright: '© 2026 NEXUS Robotics. All rights reserved.',
  productionUrl: 'https://nexuseos.github.io/nexus-website/',
  locale: 'en_US',
} as const

export const defaultSeo = {
  title: company.shortName,
  description: `${company.name} — ${company.tagline}`,
  ogType: 'website',
  ogImage: '/favicon.svg',
  twitterCard: 'summary_large_image',
} as const

export const imageConfig = {
  formats: ['webp', 'avif', 'png'] as const,
  lazyLoadRootMargin: '200px',
  placeholder: 'blur' as const,
} as const

export interface FooterLinkConfig {
  label: string
  path: string
}

export interface FooterColumnConfig {
  title: string
  links: FooterLinkConfig[]
}

export const footerColumns = null as unknown as FooterColumnConfig[]

export interface NavLinkConfig {
  label: string
  path: string
}

export const mainNavLinks = null as unknown as NavLinkConfig[]
export const sponsorNavLink = null as unknown as NavLinkConfig

export const Permission = {
  DEVELOPER_PORTAL_ACCESS: 'developer.portal.access',
  SPONSOR_PORTAL_ACCESS: 'sponsor.portal.access',
  DOWNLOAD_STUDIO: 'download.studio',
  DOWNLOAD_SDK: 'download.sdk',
  DOWNLOAD_DOCS: 'download.docs',
  DOWNLOAD_RELEASE_NOTES: 'download.release-notes',
  DOWNLOAD_FIRMWARE: 'download.firmware',
  API_KEYS_VIEW: 'api.keys.view',
  ROADMAP_SPONSOR: 'roadmap.sponsor',
  ADMIN_ALL: 'admin.all',
} as const

export type PermissionKey = (typeof Permission)[keyof typeof Permission]

export type ConfigRoleName = 'visitor' | 'developer' | 'sponsor' | 'administrator'

export const rolePermissions = null as unknown as Record<ConfigRoleName, PermissionKey[]>
export const roleHasPermission = null as unknown as (
  role: ConfigRoleName,
  permission: PermissionKey,
) => boolean
export const developerPortalRoles = null as unknown as readonly ConfigRoleName[]
export const sponsorPortalRoles = null as unknown as readonly ConfigRoleName[]
export const platformAdminRoles = ['administrator'] as const satisfies readonly ConfigRoleName[]
export const commandCenterRoles = ['administrator'] as const satisfies readonly ConfigRoleName[]

export type DownloadCategory = 'studio' | 'sdk' | 'docs' | 'release-notes' | 'firmware'

export interface DownloadMetadata {
  id: string
  name: string
  description: string
  version: string
  category: DownloadCategory
  permission: PermissionKey
  productSlug: string
  placeholder: boolean
  fileLabel?: string
}

export const downloadCatalog = null as unknown as DownloadMetadata[]

export interface PortalNavItem {
  label: string
  path: string
  end?: boolean
}

export const developerPortalNav = null as unknown as PortalNavItem[]
export const sponsorPortalNav = null as unknown as PortalNavItem[]

export interface SponsorshipTier {
  id: string
  name: string
  price: string
  benefits: string[]
}

export const sponsorshipTiers = null as unknown as SponsorshipTier[]

export interface RouteConfig {
  path: string
  title: string
  description: string
}

export const routes = {
  home: { path: '/', title: 'Home', description: '' },
  atlas: { path: '/atlas', title: 'Atlas', description: '' },
  nova: { path: '/nova', title: 'Nova', description: '' },
  sentinel: { path: '/sentinel', title: 'Sentinel', description: '' },
  studio: { path: '/studio', title: 'Studio', description: '' },
  marketplace: { path: '/marketplace', title: 'Marketplace', description: '' },
  developers: { path: '/developers', title: 'Developers', description: '' },
  sponsors: { path: '/sponsors', title: 'Sponsors', description: '' },
  documentation: { path: '/documentation', title: 'Documentation', description: '' },
  roadmap: { path: '/roadmap', title: 'Roadmap', description: '' },
  contact: { path: '/contact', title: 'Contact', description: '' },
  login: { path: '/auth/login', title: 'Login', description: '' },
  signUp: { path: '/auth/sign-up', title: 'Sign Up', description: '' },
  forgotPassword: { path: '/auth/forgot-password', title: 'Reset Password', description: '' },
  resetPassword: { path: '/auth/reset-password', title: 'Set New Password', description: '' },
  verifyEmail: { path: '/auth/verify-email', title: 'Verify Email', description: '' },
  account: { path: '/account', title: 'Account Settings', description: '' },
  downloadStudio: { path: '/download/studio', title: 'Download Studio', description: '' },
  downloadCenter: { path: '/downloads', title: 'Download Center', description: '' },
  developerPortal: { path: '/developers/portal', title: 'Developer Portal', description: '' },
  developerPortalSdk: { path: '/developers/portal/sdk', title: 'SDK Downloads', description: '' },
  developerPortalDocs: { path: '/developers/portal/docs', title: 'Developer Documentation', description: '' },
  developerPortalApiKeys: { path: '/developers/portal/api-keys', title: 'API Keys', description: '' },
  developerPortalProjects: { path: '/developers/portal/projects', title: 'Projects', description: '' },
  developerPortalAnnouncements: {
    path: '/developers/portal/announcements',
    title: 'Announcements',
    description: '',
  },
  sponsorPortal: { path: '/sponsors/portal', title: 'Sponsor Portal', description: '' },
  sponsorPortalApply: { path: '/sponsors/portal/apply', title: 'Sponsor Application', description: '' },
  sponsorPortalOrganization: {
    path: '/sponsors/portal/organization',
    title: 'Organization Profile',
    description: '',
  },
  sponsorPortalTiers: { path: '/sponsors/portal/tiers', title: 'Sponsorship Tiers', description: '' },
  sponsorPortalRoadmap: { path: '/sponsors/portal/roadmap', title: 'Sponsor Roadmap', description: '' },
  sponsorTiers: { path: '/sponsors/tiers', title: 'Sponsorship Tiers', description: '' },
  notFound: { path: '/404', title: 'Page Not Found', description: '' },
} as const

export type RouteKey = keyof typeof routes
export const routeList = null as unknown as RouteConfig[]
export const basePath = null as unknown as string
export const getSiteUrl = null as unknown as () => string
export const deployment = null as unknown as Record<string, unknown>

export interface SocialLinkConfig {
  label: string
  href: string
  icon?: string
}

export const socialLinks = null as unknown as SocialLinkConfig[]
