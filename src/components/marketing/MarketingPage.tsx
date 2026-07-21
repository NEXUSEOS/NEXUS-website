import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { RouteConfig } from '../../config'
import type { CinematicMode } from '../../experience'
import { VolumetricLayer } from '../../experience'
import { PageMeta } from '../seo'
import { LivingGlassCard } from '../living-glass'
import { Container, Heading, Section, Text } from '../ui'
import './MarketingPage.css'

export interface MarketingFeature {
  title: string
  description: string
}

export interface MarketingCta {
  label: string
  path: string
  variant?: 'primary' | 'secondary'
}

export interface MarketingPageProps {
  route: RouteConfig
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: MarketingCta
  secondaryCta?: MarketingCta
  features?: MarketingFeature[]
  relatedLinks?: MarketingCta[]
  children?: ReactNode
  cinematicMode?: CinematicMode
}

export default function MarketingPage({
  route,
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  features = [],
  relatedLinks = [],
  children,
  cinematicMode,
}: MarketingPageProps) {
  const title = headline ?? route.title
  const description = subheadline ?? route.description
  const surfaceClass = cinematicMode ? `cx-surface cx-surface--${cinematicMode}` : 'cx-surface'

  return (
    <>
      <PageMeta title={title} description={description} path={route.path} />
      <Section className={`marketing-page ${surfaceClass}`}>
        <VolumetricLayer variant="spotlight" intensity="subtle" />
        <Container>
          <div className="marketing-page__hero lg-materialize">
            {eyebrow ? (
              <Text variant="caption" className="marketing-page__eyebrow">{eyebrow}</Text>
            ) : null}
            <Heading as="h1" level="display" className="marketing-page__headline">
              {title}
            </Heading>
            <Text variant="muted" className="marketing-page__subheadline">{description}</Text>
            {(primaryCta || secondaryCta) && (
              <div className="marketing-page__actions">
                {primaryCta ? (
                  <Link
                    to={primaryCta.path}
                    className={`button living-glass-button living-glass-button--${primaryCta.variant ?? 'primary'}`}
                  >
                    {primaryCta.label}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    to={secondaryCta.path}
                    className={`button living-glass-button living-glass-button--${secondaryCta.variant ?? 'secondary'}`}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>

          {features.length > 0 ? (
            <div className="marketing-page__grid lg-materialize-stagger">
              {features.map((feature) => (
                <LivingGlassCard key={feature.title} className="marketing-page__card">
                  <Heading as="h2" level="title">{feature.title}</Heading>
                  <Text variant="muted">{feature.description}</Text>
                </LivingGlassCard>
              ))}
            </div>
          ) : null}

          {children ? <div className="lg-materialize">{children}</div> : null}

          {relatedLinks.length > 0 ? (
            <div className="marketing-page__related lg-materialize">
              <Heading as="h2" level="title">Explore further</Heading>
              <div className="marketing-page__actions">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="button living-glass-button living-glass-button--secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
