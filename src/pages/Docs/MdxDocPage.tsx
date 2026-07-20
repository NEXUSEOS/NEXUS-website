import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { documentationNav } from '../../config/contentNavigation'
import { routes } from '../../config/routes'
import { getMdxDocument, mdxModules, type MdxSlug } from '../../content/mdx'
import { PageMeta } from '../../components/seo'
import { Container, Section } from '../../components/ui'
import LoadingFallback from '../../router/LoadingFallback'
import NotFound from '../NotFound/NotFound'
import '../../content/mdx/mdx.css'

const mdxLazyComponents = Object.fromEntries(
  (Object.keys(mdxModules) as MdxSlug[]).map((slug) => [slug, lazy(mdxModules[slug])]),
) as Record<MdxSlug, LazyExoticComponent<ComponentType>>

export default function MdxDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const expectedSection = location.pathname.includes('/docs/tutorials/')
    ? 'tutorials'
    : 'guides'
  const document = slug ? getMdxDocument(slug) : undefined
  const LazyContent =
    slug && slug in mdxLazyComponents ? mdxLazyComponents[slug as MdxSlug] : null

  if (!document || !LazyContent || document.section !== expectedSection) {
    return <NotFound />
  }

  return (
    <>
      <PageMeta title={document.title} description={document.description} path={document.path} />
      <Section>
        <Container>
          <ContentLayout
            title="Documentation"
            description="MDX-powered guides and tutorials."
            path={document.path}
            navigation={documentationNav.map((item) => ({
              label: item.label,
              path: item.path,
              end: item.path === routes.docs.path,
            }))}
          >
            <Suspense fallback={<LoadingFallback />}>
              <LazyContent />
            </Suspense>
          </ContentLayout>
        </Container>
      </Section>
    </>
  )
}
