import { Link } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { documentationNav } from '../../config/contentNavigation'
import { routes } from '../../config/routes'
import { documentationSections } from '../../content'
import { GlassPanel, Heading, Text } from '../../components/ui'
import { StructuredData } from '../../components/seo'
import { getSiteUrl } from '../../config'

export default function DocsHub() {
  return (
    <>
      <StructuredData
        type="WebSite"
        name="NEXUS Documentation"
        description={routes.docs.description}
        url={`${getSiteUrl()}${routes.docs.path}`}
      />
      <ContentLayout
        title="Documentation"
        description="SDK, API reference, tutorials, guides, and examples."
        path={routes.docs.path}
        navigation={documentationNav.map((item) => ({
          label: item.label,
          path: item.path,
          end: item.path === routes.docs.path,
        }))}
      >
        <Heading as="h1" level="heading">
          NEXUS Documentation
        </Heading>
        <Text variant="muted">
          Official documentation for the NEXUS Robotics platform. All sections connect to the
          production architecture — no placeholder dead links.
        </Text>

        <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
          {documentationSections.map((section) => (
            <GlassPanel key={section.id} className="download-card">
              <Heading as="h2" level="title">
                {section.title}
              </Heading>
              <Text variant="muted">{section.description}</Text>
              <Link to={section.path} className="button button--secondary">
                Open {section.title}
              </Link>
            </GlassPanel>
          ))}
        </div>
      </ContentLayout>
    </>
  )
}
