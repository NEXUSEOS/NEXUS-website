import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Heading, Section, Text } from '../ui'
import { PageMeta } from '../seo'
import './ContentLayout.css'

export interface ContentNavItem {
  label: string
  path: string
  end?: boolean
}

interface ContentLayoutProps {
  title: string
  description: string
  path: string
  navigation: ContentNavItem[]
  children: ReactNode
}

export default function ContentLayout({
  title,
  description,
  path,
  navigation,
  children,
}: ContentLayoutProps) {
  return (
    <>
      <PageMeta title={title} description={description} path={path} />
      <Section>
        <Container>
          <div className="content-layout">
            <aside className="content-layout__sidebar" aria-label={`${title} navigation`}>
              <div className="portal-layout__header">
                <Heading as="h2" level="title">
                  {title}
                </Heading>
                <Text variant="caption">{description}</Text>
              </div>
              <nav>
                <ul className="content-layout__nav">
                  {navigation.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                          `content-layout__nav-link${isActive ? ' content-layout__nav-link--active' : ''}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <div className="content-layout__body">{children}</div>
          </div>
        </Container>
      </Section>
    </>
  )
}
