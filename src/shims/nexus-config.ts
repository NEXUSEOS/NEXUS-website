export const company = {
  name: 'NEXUS Robotics',
  shortName: 'NEXUS',
  tagline: 'One Ecosystem. One Experience.',
  copyright: '© 2026 NEXUS Robotics. All rights reserved.',
  productionUrl: 'https://nexuseos.github.io/NEXUS-website/',
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

export const footerColumns: FooterColumnConfig[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Atlas', path: '/atlas' },
      { label: 'Nova', path: '/nova' },
      { label: 'Sentinel', path: '/sentinel' },
      { label: 'Studio', path: '/studio' },
      { label: 'Marketplace', path: '/marketplace' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Developers', path: '/developers' },
      { label: 'SDK', path: '/sdk' },
      { label: 'Documentation', path: '/documentation' },
      { label: 'API Reference', path: '/docs/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Mission', path: '/mission' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
  },
]

export interface NavLinkConfig {
  label: string
  path: string
}

export const mainNavLinks: NavLinkConfig[] = [
  { label: 'Home', path: '/' },
  { label: 'Atlas', path: '/atlas' },
  { label: 'Nova', path: '/nova' },
  { label: 'Sentinel', path: '/sentinel' },
  { label: 'Studio', path: '/studio' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Developers', path: '/developers' },
  { label: 'Documentation', path: '/documentation' },
  { label: 'Roadmap', path: '/roadmap' },
  { label: 'Community', path: '/community' },
  { label: 'Contact', path: '/contact' },
]

export const sponsorNavLink: NavLinkConfig = {
  label: 'Sponsor',
  path: '/sponsors',
}

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
  CMS_VIEW: 'cms.view',
  CMS_EDIT: 'cms.edit',
  CMS_PUBLISH: 'cms.publish',
  COMMAND_CENTER_ACCESS: 'command.center.access',
  ADMIN_ALL: 'admin.all',
} as const

export type PermissionKey = (typeof Permission)[keyof typeof Permission]

export type ConfigRoleName =
  | 'visitor'
  | 'viewer'
  | 'developer'
  | 'sponsor'
  | 'editor'
  | 'moderator'
  | 'administrator'
  | 'super_administrator'

export const rolePermissions: Record<ConfigRoleName, PermissionKey[]> = {
  visitor: [Permission.DOWNLOAD_STUDIO, Permission.DOWNLOAD_DOCS, Permission.DOWNLOAD_RELEASE_NOTES],
  viewer: [Permission.DOWNLOAD_STUDIO, Permission.DOWNLOAD_DOCS, Permission.DOWNLOAD_RELEASE_NOTES, Permission.CMS_VIEW],
  developer: [
    Permission.DEVELOPER_PORTAL_ACCESS,
    Permission.DOWNLOAD_STUDIO,
    Permission.DOWNLOAD_SDK,
    Permission.DOWNLOAD_DOCS,
    Permission.DOWNLOAD_RELEASE_NOTES,
    Permission.DOWNLOAD_FIRMWARE,
    Permission.API_KEYS_VIEW,
  ],
  sponsor: [
    Permission.SPONSOR_PORTAL_ACCESS,
    Permission.DOWNLOAD_STUDIO,
    Permission.DOWNLOAD_DOCS,
    Permission.DOWNLOAD_RELEASE_NOTES,
    Permission.ROADMAP_SPONSOR,
  ],
  editor: [Permission.CMS_VIEW, Permission.CMS_EDIT, Permission.DOWNLOAD_DOCS],
  moderator: [Permission.CMS_VIEW, Permission.CMS_EDIT, Permission.DEVELOPER_PORTAL_ACCESS],
  administrator: [Permission.ADMIN_ALL],
  super_administrator: [Permission.ADMIN_ALL, Permission.COMMAND_CENTER_ACCESS],
}

export function roleHasPermission(role: ConfigRoleName, permission: PermissionKey): boolean {
  if (role === 'administrator' || role === 'super_administrator') return true
  return rolePermissions[role]?.includes(permission) ?? false
}

export const developerPortalRoles = ['developer', 'administrator', 'super_administrator'] as const
export const sponsorPortalRoles = ['sponsor', 'administrator', 'super_administrator'] as const
export const platformAdminRoles = ['editor', 'moderator', 'administrator', 'super_administrator'] as const
export const commandCenterRoles = ['editor', 'moderator', 'administrator', 'super_administrator'] as const

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

export const downloadCatalog: DownloadMetadata[] = [
  {
    id: 'nexus-studio',
    name: 'NEXUS Studio',
    description: 'Design, simulate, and deploy robots in the unified NEXUS environment.',
    version: '0.1.0-beta',
    category: 'studio',
    permission: Permission.DOWNLOAD_STUDIO,
    productSlug: 'nexus-studio',
    placeholder: true,
    fileLabel: 'NEXUS-Studio-0.1.0-beta.dmg',
  },
  {
    id: 'nexus-sdk',
    name: 'NEXUS SDK',
    description: 'Build integrations and automations on the NEXUS platform.',
    version: '0.1.0-beta',
    category: 'sdk',
    permission: Permission.DOWNLOAD_SDK,
    productSlug: 'nexus-sdk',
    placeholder: true,
    fileLabel: 'nexus-sdk-0.1.0-beta.tar.gz',
  },
]

export interface PortalNavItem {
  label: string
  path: string
  end?: boolean
}

export const developerPortalNav: PortalNavItem[] = [
  { label: 'Dashboard', path: '/developers/portal', end: true },
  { label: 'SDK Downloads', path: '/developers/portal/sdk' },
  { label: 'Documentation', path: '/developers/portal/docs' },
  { label: 'API Keys', path: '/developers/portal/api-keys' },
  { label: 'Projects', path: '/developers/portal/projects' },
  { label: 'Announcements', path: '/developers/portal/announcements' },
]

export const sponsorPortalNav: PortalNavItem[] = [
  { label: 'Partnership Status', path: '/sponsors/portal', end: true },
  { label: 'Apply', path: '/sponsors/portal/apply' },
  { label: 'Organization', path: '/sponsors/portal/organization' },
  { label: 'Sponsorship Tiers', path: '/sponsors/portal/tiers' },
  { label: 'Roadmap Access', path: '/sponsors/portal/roadmap' },
]

export interface SponsorshipTier {
  id: string
  name: string
  price: string
  benefits: string[]
}

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: 'founding',
    name: 'Founding Partner',
    price: 'Custom',
    benefits: ['Logo placement', 'Roadmap influence', 'Beta access', 'Dedicated support'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '$25,000 / year',
    benefits: ['Website recognition', 'Event presence', 'Early feature access'],
  },
]

export interface RouteConfig {
  path: string
  title: string
  description: string
}

export const routes = {
  home: { path: '/', title: 'Home', description: 'NEXUS Robotics — One Ecosystem. One Experience.' },
  atlas: { path: '/atlas', title: 'Atlas', description: 'Atlas robotics platform.' },
  nova: { path: '/nova', title: 'Nova', description: 'Nova robotics platform.' },
  sentinel: { path: '/sentinel', title: 'Sentinel', description: 'Sentinel robotics platform.' },
  studio: { path: '/studio', title: 'Studio', description: 'NEXUS Studio IDE.' },
  marketplace: { path: '/marketplace', title: 'Marketplace', description: 'NEXUS Marketplace.' },
  developers: { path: '/developers', title: 'Developers', description: 'Developer platform.' },
  sponsors: { path: '/sponsors', title: 'Sponsors', description: 'Sponsor program.' },
  documentation: { path: '/documentation', title: 'Documentation', description: 'Platform documentation.' },
  roadmap: { path: '/roadmap', title: 'Roadmap', description: 'Product roadmap.' },
  community: { path: '/community', title: 'Community', description: 'NEXUS community.' },
  contact: { path: '/contact', title: 'Contact', description: 'Contact NEXUS.' },
  login: { path: '/auth/login', title: 'Login', description: 'Sign in to NEXUS.' },
  signUp: { path: '/auth/sign-up', title: 'Sign Up', description: 'Create a NEXUS account.' },
  forgotPassword: { path: '/auth/forgot-password', title: 'Reset Password', description: 'Reset your password.' },
  resetPassword: { path: '/auth/reset-password', title: 'Set New Password', description: 'Set a new password.' },
  verifyEmail: { path: '/auth/verify-email', title: 'Verify Email', description: 'Verify your email.' },
  account: { path: '/account', title: 'Account Settings', description: 'Manage your account.' },
  downloadStudio: { path: '/download/studio', title: 'Download Studio', description: 'Download NEXUS Studio.' },
  downloadCenter: { path: '/downloads', title: 'Download Center', description: 'Download NEXUS products.' },
  developerPortal: { path: '/developers/portal', title: 'Developer Portal', description: 'Developer portal dashboard.' },
  developerPortalSdk: { path: '/developers/portal/sdk', title: 'SDK Downloads', description: 'Download the NEXUS SDK.' },
  developerPortalDocs: { path: '/developers/portal/docs', title: 'Developer Documentation', description: 'Developer docs.' },
  developerPortalApiKeys: { path: '/developers/portal/api-keys', title: 'API Keys', description: 'Manage API keys.' },
  developerPortalProjects: { path: '/developers/portal/projects', title: 'Projects', description: 'Developer projects.' },
  developerPortalAnnouncements: {
    path: '/developers/portal/announcements',
    title: 'Announcements',
    description: 'Platform announcements.',
  },
  sponsorPortal: { path: '/sponsors/portal', title: 'Sponsor Portal', description: 'Sponsor portal dashboard.' },
  sponsorPortalApply: { path: '/sponsors/portal/apply', title: 'Sponsor Application', description: 'Apply to sponsor.' },
  sponsorPortalOrganization: {
    path: '/sponsors/portal/organization',
    title: 'Organization Profile',
    description: 'Sponsor organization profile.',
  },
  sponsorPortalTiers: { path: '/sponsors/portal/tiers', title: 'Sponsorship Tiers', description: 'Sponsorship tiers.' },
  sponsorPortalRoadmap: { path: '/sponsors/portal/roadmap', title: 'Sponsor Roadmap', description: 'Sponsor roadmap access.' },
  sponsorTiers: { path: '/sponsors/tiers', title: 'Sponsorship Tiers', description: 'Public sponsorship tiers.' },
  notFound: { path: '/404', title: 'Page Not Found', description: 'Page not found.' },
} as const

export type RouteKey = keyof typeof routes
export const routeList: RouteConfig[] = Object.values(routes)

export const basePath = import.meta.env.BASE_URL

export function getSiteUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined
  if (configured) return configured.replace(/\/$/, '')
  if (typeof window !== 'undefined') {
    return window.location.origin + basePath.replace(/\/$/, '')
  }
  return 'https://nexuseos.github.io/NEXUS-website'
}

export const deployment = {
  platform: 'github-pages',
  repository: 'NEXUSEOS/NEXUS-website',
  branch: 'gh-pages',
  basePath,
} as const

export interface SocialLinkConfig {
  label: string
  href: string
  icon?: string
}

export const socialLinks: SocialLinkConfig[] = [
  { label: 'Twitter', href: 'https://twitter.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/NEXUSEOS' },
]
