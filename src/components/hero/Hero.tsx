import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import { PageMeta } from '../seo'
import { Container, Heading, Section, Text } from '../ui'
import './Hero.css'

const AetherBackground = lazy(() => import('../aether/AetherBackground'))

export default function Hero() {
  const { user } = useAuth()

  return (
    <>
      <PageMeta
        title={routes.home.title}
        description={routes.home.description}
        path={routes.home.path}
      />
      <Section variant="flush" className="hero">
        <div className="hero__aether" aria-hidden="true">
          <Suspense fallback={null}>
            <AetherBackground />
          </Suspense>
        </div>

        <Container>
          <div className="hero__content">
            <Heading as="h1" level="display">
              NEXUS
            </Heading>

            <Text variant="muted" className="hero__subtitle">
              One Ecosystem.
              <br />
              One Experience.
            </Text>

            <div className="hero__actions">
              <Link
                to={routes.downloadMarketing?.path ?? '/download'}
                className="button button--primary"
              >
                Download Studio
              </Link>
              <Link
                to={user ? routes.sponsors.path : routes.signUp.path}
                className="button button--secondary"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
