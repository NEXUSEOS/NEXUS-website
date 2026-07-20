import { Link } from 'react-router-dom'
import { routes, websiteRoutes } from '../../config'
import { Container, GlassPanel, Heading, Section, Text } from '../../components/ui'
import { homePlatformPillars } from '../../content/productPages'
import './HomePlatformOverview.css'

export default function HomePlatformOverview() {
  return (
    <Section className="home-platform">
      <Container>
        <div className="home-platform__intro">
          <Heading as="h2" level="heading">The NEXUS Platform</Heading>
          <Text variant="muted">
            One design language, one SDK, one cloud — from simulation to fleet operations.
          </Text>
        </div>
        <div className="home-platform__grid">
          {homePlatformPillars.map((pillar) => (
            <GlassPanel key={pillar.title} className="home-platform__card">
              <Heading as="h3" level="title">{pillar.title}</Heading>
              <Text variant="muted">{pillar.description}</Text>
              {pillar.path ? (
                <Link to={pillar.path} className="button button--secondary home-platform__link">
                  Learn more
                </Link>
              ) : null}
            </GlassPanel>
          ))}
        </div>
        <div className="home-platform__actions">
          <Link to={websiteRoutes.docs.path} className="button button--primary">Documentation</Link>
          <Link to={routes.marketplace.path} className="button button--secondary">Marketplace</Link>
          <Link to={websiteRoutes.pricing.path} className="button button--ghost">Pricing</Link>
        </div>
      </Container>
    </Section>
  )
}
