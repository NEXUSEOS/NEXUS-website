import { Link } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { documentationNav } from '../../config/contentNavigation'
import { routes } from '../../config/routes'
import { documentationArticles } from '../../content'
import { mdxDocuments } from '../../content/mdx'
import { GlassPanel, Heading, Text } from '../../components/ui'

interface DocsSectionPageProps {
  sectionId: 'api' | 'tutorials' | 'guides' | 'examples'
}

const sectionRoutes = {
  api: routes.docsApi,
  tutorials: routes.docsTutorials,
  guides: routes.docsGuides,
  examples: routes.docsExamples,
} as const

export default function DocsSectionPage({ sectionId }: DocsSectionPageProps) {
  const route = sectionRoutes[sectionId]
  const articles = documentationArticles.filter((article) => article.sectionId === sectionId)
  const mdxArticles =
    sectionId === 'guides' || sectionId === 'tutorials'
      ? mdxDocuments.filter((doc) => doc.section === sectionId)
      : []

  return (
    <ContentLayout
      title={route.title}
      description={route.description}
      path={route.path}
      navigation={documentationNav.map((item) => ({
        label: item.label,
        path: item.path,
        end: item.path === route.path,
      }))}
    >
      <Heading as="h1" level="heading">
        {route.title}
      </Heading>
      <Text variant="muted">{route.description}</Text>

      <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
        {mdxArticles.map((doc) => (
          <GlassPanel key={doc.slug} className="download-card">
            <Heading as="h2" level="title">
              {doc.title}
            </Heading>
            <Text variant="muted">{doc.description}</Text>
            <Text variant="caption">Format: MDX</Text>
            <Link to={doc.path} className="button button--ghost">
              Read guide
            </Link>
          </GlassPanel>
        ))}
        {articles.map((article) => (
          <GlassPanel key={article.id} className="download-card">
            <Heading as="h2" level="title">
              {article.title}
            </Heading>
            <Text variant="muted">{article.description}</Text>
            <Text variant="caption">Tags: {article.tags.join(', ')}</Text>
            <Link to={article.path} className="button button--ghost">
              Read article
            </Link>
          </GlassPanel>
        ))}
      </div>
    </ContentLayout>
  )
}
