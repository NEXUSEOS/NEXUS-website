import type { ReactNode } from 'react'

export type NavLinkItem = {
  label: string
  path: string
  icon?: string
  badge?: string
}

export type NavSection = {
  id: string
  label: string
  items: NavLinkItem[]
}

export type UniversalNavContext = {
  appId: 'website' | 'studio' | 'cloud' | 'marketplace' | 'developer' | 'sponsor' | 'admin'
  organizationName?: string
  workspaceName?: string
  userDisplayName?: string
  notifications?: number
}

export type BreadcrumbItem = { label: string; path?: string }

export interface UniversalNavigationProps {
  brandLabel?: string
  brandPath?: string
  links: NavLinkItem[]
  context: UniversalNavContext
  onSearch?: (query: string) => void
  profileMenuItems?: NavLinkItem[]
  ctaLink?: NavLinkItem
  renderLink?: (item: NavLinkItem, className: string) => ReactNode
}

export function UniversalNavigation({
  brandLabel = 'NEXUS',
  brandPath = '/',
  links,
  context,
  ctaLink,
  renderLink,
}: UniversalNavigationProps) {
  const defaultRender = (item: NavLinkItem, className: string) => (
    <a key={item.path} href={item.path} className={className}>
      {item.label}
    </a>
  )
  const linkRenderer = renderLink ?? defaultRender

  return (
    <header className="nexus-nav" data-app={context.appId}>
      <div className="nexus-nav__inner">
        <a href={brandPath} className="nexus-nav__brand">
          {brandLabel}
        </a>
        <nav className="nexus-nav__links" aria-label="Primary">
          {links.map((item) => linkRenderer(item, 'nexus-nav__link'))}
        </nav>
        {ctaLink ? linkRenderer(ctaLink, 'nexus-nav__link nexus-nav__cta') : null}
      </div>
    </header>
  )
}

export default UniversalNavigation

export const Breadcrumbs = null as unknown as import('react').ComponentType<{
  items: BreadcrumbItem[]
}>

export const ecosystemNavSections = null as unknown as NavSection[]
