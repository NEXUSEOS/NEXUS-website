import { Link } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { documentationNav } from '../../config/contentNavigation'
import { routes } from '../../config/routes'
import { sdkDocSections, sdkPackages } from '../../sdk'
import { GlassPanel, Heading, Text } from '../../components/ui'

export default function SdkDocsHub() {
  return (
    <ContentLayout
      title="SDK Documentation"
      description={routes.docsSdk.description}
      path={routes.docsSdk.path}
      navigation={documentationNav.map((item) => ({
        label: item.label,
        path: item.path,
        end: item.path === routes.docsSdk.path,
      }))}
    >
      <Heading as="h1" level="heading">
        NEXUS SDK
      </Heading>
      <Text variant="muted">
        SDK documentation architecture for packages owned by nexus-sdk. Execution APIs connect
        when cloud and robot services are available.
      </Text>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Package Roadmap
      </Heading>
      <div className="download-grid">
        {sdkPackages.map((pkg) => (
          <GlassPanel key={pkg.name} className="download-card">
            <Heading as="h3" level="title">
              {pkg.name}
            </Heading>
            <Text variant="muted">{pkg.description}</Text>
            <Text variant="caption">
              Status: {pkg.status} · Repository: {pkg.repository}
            </Text>
          </GlassPanel>
        ))}
      </div>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-8)' }}>
        Documentation Sections
      </Heading>
      <div className="download-grid">
        {sdkDocSections.map((section) => (
          <GlassPanel key={section.id} className="download-card">
            <Heading as="h3" level="title">
              {section.title}
            </Heading>
            <Text variant="muted">{section.description}</Text>
            <Link to={`${routes.docsSdk.path}/${section.id}`} className="button button--secondary">
              Open section
            </Link>
          </GlassPanel>
        ))}
      </div>
    </ContentLayout>
  )
}
