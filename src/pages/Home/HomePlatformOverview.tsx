import { Link } from 'react-router-dom'
import { routes, websiteRoutes } from '../../config'
import { LivingGlassCard } from '../../components/living-glass'
import { Container, Heading, Section, Text } from '../../components/ui'
import { homePlatformPillars } from '../../content/productPages'
import './HomePlatformOverview.css'

export default function HomePlatformOverview() {
  return (
    <Section className="home-platform">
      <Container>
        <div className="home-platform__intro lg-materialize">
          <Heading as="h2" level="heading">The NEXUS Platform</Heading>
          <Text variant="muted">
            One design language, one SDK, one cloud — from simulation to fleet operations.
          </Text>
        </div>
        <div className="home-platform__grid lg-materialize-stagger">
          {homePlatformPillars.map((pillar) => (
            <LivingGlassCard key={pillar.title} className="home-platform__card">
              <Heading as="h3" level="title">{pillar.title}</Heading>
              <Text variant="muted">{pillar.description}</Text>
              {pillar.path ? (
                <Link
                  to={pillar.path}
                  className="button living-glass-button living-glass-button--secondary home-platform__link"
                >
                  Learn more
                </Link>
              ) : null}
            </LivingGlassCard>
          ))}
        </div>
        <div className="home-platform__actions lg-materialize">
          <Link to={websiteRoutes.docs.path} className="button living-glass-button living-glass-button--primary">
            Documentation
          </Link>
          <Link to={routes.marketplace.path} className="button living-glass-button living-glass-button--secondary">
            Marketplace
          </Link>
          <Link to={websiteRoutes.pricing.path} className="button living-glass-button living-glass-button--ghost">
            Pricing
          </Link>
        </div>
      </Container>
    </Section>
  )
}
