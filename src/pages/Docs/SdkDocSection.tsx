import { Link, useParams } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { routes } from '../../config/routes'
import { getSdkDocSection, sdkDocSections } from '../../sdk'
import { GlassPanel, Heading, Text } from '../../components/ui'
import NotFound from '../NotFound/NotFound'

export default function SdkDocSection() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const section = sectionId ? getSdkDocSection(sectionId) : undefined

  if (!section) return <NotFound />

  return (
    <ContentLayout
      title={section.title}
      description={section.description}
      path={section.path}
      navigation={[
        { label: 'SDK Home', path: routes.docsSdk.path, end: true },
        ...sdkDocSections.map((item) => ({
          label: item.title,
          path: `${routes.docsSdk.path}/${item.id}`,
          end: item.id === sectionId,
        })),
      ]}
    >
      <Heading as="h1" level="heading">
        {section.title}
      </Heading>
      <Text variant="muted">{section.description}</Text>

      <GlassPanel className="download-card" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">
          Architecture Reference
        </Heading>
        <Text variant="body">
          This section documents the public SDK contract for {section.title}. Implementation
          ships from the nexus-sdk repository. Connect authentication via the Developer Portal
          API Keys section before calling cloud APIs.
        </Text>
        <div className="download-card__actions">
          <Link to={routes.developerPortalApiKeys.path} className="button button--primary">
            API Keys
          </Link>
          <Link to={routes.developerPortalSdk.path} className="button button--secondary">
            SDK Downloads
          </Link>
          <Link to={routes.docsSdk.path} className="button button--ghost">
            SDK Home
          </Link>
        </div>
      </GlassPanel>
    </ContentLayout>
  )
}
