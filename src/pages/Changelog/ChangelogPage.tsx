import { Link } from 'react-router-dom'
import { PageMeta } from '../../components/seo'
import { routes } from '../../config/routes'
import { changelogEntries } from '../../content'
import { Container, GlassPanel, Heading, Section, Text } from '../../components/ui'

export default function ChangelogPage() {
  return (
    <>
      <PageMeta title={routes.changelog.title} description={routes.changelog.description} path={routes.changelog.path} />
      <Section>
        <Container>
          <div className="page-shell">
            <Heading as="h1" level="heading">
              Changelog
            </Heading>
            <Text variant="muted">{routes.changelog.description}</Text>

            <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
              {changelogEntries.map((entry) => (
                <GlassPanel key={entry.version} className="download-card">
                  <Text variant="caption">
                    v{entry.version} · {entry.date}
                  </Text>
                  <ul className="tier-card__benefits">
                    {entry.changes.map((change) => (
                      <li key={`${entry.version}-${change.description}`}>
                        <strong>{change.type}</strong>: {change.description}
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              ))}
            </div>

            <Link to={routes.releases.path} className="button button--ghost" style={{ marginTop: 'var(--spacing-8)' }}>
              Release notes
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
