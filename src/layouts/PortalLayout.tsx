import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import type { PortalNavItem } from '../config/portals'
import { PageMeta } from '../components/seo'
import { Container, Heading, Section, Text } from '../components/ui'
import { trackPortalVisit } from '../services/analytics/analyticsService'
import { useAuth } from '../hooks'
import './PortalLayout.css'

interface PortalLayoutProps {
  title: string
  description: string
  path: string
  portalId: string
  navigation: PortalNavItem[]
}

export default function PortalLayout({
  title,
  description,
  path,
  portalId,
  navigation,
}: PortalLayoutProps) {
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) {
      void trackPortalVisit(user.id, portalId)
    }
  }, [user?.id, portalId])

  return (
    <>
      <PageMeta title={title} description={description} path={path} />
      <Section>
        <Container>
          <div className="portal-layout">
            <aside className="portal-layout__sidebar" aria-label={`${title} navigation`}>
              <div className="portal-layout__header">
                <Heading as="h2" level="title">
                  {title}
                </Heading>
                <Text variant="caption">{description}</Text>
              </div>
              <nav>
                <ul className="portal-layout__nav">
                  {navigation.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                          `portal-layout__nav-link${isActive ? ' portal-layout__nav-link--active' : ''}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <div className="portal-layout__content">
              <Outlet />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
