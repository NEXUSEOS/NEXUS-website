import type { ReactNode } from 'react'
import type { RouteConfig } from '../../config'
import { PageMeta } from '../seo'
import { Container, Heading, Section, Text } from '../ui'
import './PageShell.css'

interface PageShellProps {
  route: RouteConfig
  children?: ReactNode
}

/**
 * PageShell — Shared layout wrapper for standard content pages.
 */
export default function PageShell({ route, children }: PageShellProps) {
  return (
    <>
      <PageMeta title={route.title} description={route.description} path={route.path} />
      <Section>
        <Container>
          <div className="page-shell">
            <div className="page-shell__inner">
              <Heading as="h1" level="heading">
                {route.title}
              </Heading>
              <Text variant="muted" className="page-shell__description">
                {route.description}
              </Text>
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
