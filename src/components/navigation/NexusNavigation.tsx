import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UniversalNavigation } from '@nexus/navigation'
import type { NavLinkItem } from '@nexus/navigation'
import { useAuth } from '@nexus/auth'
import { company, routes, mainNavLinks, sponsorNavLink } from '../../config'
import { fetchPublishedNavigation } from '../../services/cms/cmsContentService'
import AuthActions from './AuthActions'
import NavSearch from './NavSearch'
import { ThemeToggle } from '../ux'
import '@nexus/navigation/styles.css'
import './Navigation.css'

export default function Navigation() {
  const { user, profile } = useAuth()
  const [cmsLinks, setCmsLinks] = useState<NavLinkItem[]>([])

  useEffect(() => {
    fetchPublishedNavigation('website')
      .then((items) =>
        setCmsLinks(
          items
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => ({ label: item.label, path: item.href })),
        ),
      )
      .catch(() => setCmsLinks([]))
  }, [])

  const links = cmsLinks.length > 0 ? cmsLinks : mainNavLinks

  return (
    <div className="navigation-wrapper">
      <UniversalNavigation
        brandLabel={company.name}
        brandPath={routes.home.path}
        links={links}
        context={{
          appId: 'website',
          organizationName: profile?.organization?.name ?? undefined,
          userDisplayName: profile?.full_name ?? user?.email ?? undefined,
        }}
        ctaLink={sponsorNavLink}
        profileMenuItems={[
          { label: 'Account', path: routes.account.path },
          { label: 'Downloads', path: routes.downloadCenter.path },
        ]}
        renderLink={(item, className) =>
          className.includes('cta') ? (
            <Link key={item.path} to={item.path} className={className}>
              {item.label}
            </Link>
          ) : (
            <NavLink key={item.path} to={item.path} className={className}>
              {item.label}
            </NavLink>
          )
        }
      />
      <div className="navigation__tools">
        <NavSearch />
        <ThemeToggle />
      </div>
      <div className="navigation__auth">
        <AuthActions />
      </div>
    </div>
  )
}
