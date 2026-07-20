import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PageMeta } from '../../components/seo'
import { routes } from '../../config/routes'
import { releaseNotes } from '../../content'
import { fetchCloudReleases } from '../../services/launch/launchService'
import { Container, GlassPanel, Heading, Section, Text } from '../../components/ui'

export default function Releases() {
  const [cloudReleases, setCloudReleases] = useState<Array<{ product: string; version: string; channel: string; releaseNotes: string; publishedAt: string }>>([])

  useEffect(() => {
    void fetchCloudReleases().then((d) => setCloudReleases(d.releases)).catch(() => setCloudReleases([]))
  }, [])

  return (
    <>
      <PageMeta title={routes.releases.title} description={routes.releases.description} path={routes.releases.path} />
      <Section>
        <Container>
          <div className="page-shell">
            <Heading as="h1" level="heading">
              Release Notes
            </Heading>
            <Text variant="muted">{routes.releases.description}</Text>

            <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
              {releaseNotes.map((release) => (
                <GlassPanel key={release.version} className="download-card">
                  <Text variant="caption">
                    v{release.version} · {release.date}
                  </Text>
                  <Heading as="h2" level="title">
                    {release.title}
                  </Heading>
                  <Text variant="muted">{release.summary}</Text>
                  <ul className="tier-card__benefits">
                    {release.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <Text variant="caption">Products: {release.products.join(', ')}</Text>
                </GlassPanel>
              ))}
            </div>

            {cloudReleases.length > 0 && (
              <section style={{ marginTop: 'var(--spacing-8)' }}>
                <Heading as="h2" level="title">Platform updates (Cloud)</Heading>
                <ul>
                  {cloudReleases.map((r) => (
                    <li key={`${r.product}-${r.version}`}>
                      {r.product} v{r.version} ({r.channel}) — {r.releaseNotes || 'See changelog'}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link to={routes.changelog.path} className="button button--secondary" style={{ marginTop: 'var(--spacing-8)' }}>
              View full changelog
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
