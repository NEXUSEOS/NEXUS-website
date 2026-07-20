import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageMeta, StructuredData } from '../../components/seo'
import { routes, websiteRoutes, getSiteUrl } from '../../config'
import { releaseNotes } from '../../content/releases/catalog'
import { fetchPublishedBlogPosts } from '../../services/cms/cmsContentService'
import { Container, GlassPanel, Heading, Section, Text } from '../../components/ui'

export default function News() {
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof fetchPublishedBlogPosts>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPublishedBlogPosts()
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageMeta title={websiteRoutes.news.title} description={websiteRoutes.news.description} path={websiteRoutes.news.path} />
      <StructuredData
        type="WebSite"
        name="NEXUS News"
        description={websiteRoutes.news.description}
        url={`${getSiteUrl()}${websiteRoutes.news.path}`}
      />
      <Section>
        <Container>
          <div className="page-shell">
            <Heading as="h1" level="heading">Platform News</Heading>
            <Text variant="muted">{websiteRoutes.news.description}</Text>

            <section aria-labelledby="news-releases" style={{ marginTop: 'var(--spacing-8)' }}>
              <Heading as="h2" level="title" id="news-releases">Release Highlights</Heading>
              <div className="download-grid">
                {releaseNotes.map((release) => (
                  <GlassPanel key={release.version} className="download-card">
                    <Text variant="caption">v{release.version} · {release.date}</Text>
                    <Heading as="h3" level="title">{release.title}</Heading>
                    <Text variant="muted">{release.summary}</Text>
                    <Link to={websiteRoutes.releases.path} className="button button--secondary">
                      Release notes
                    </Link>
                  </GlassPanel>
                ))}
              </div>
            </section>

            <section aria-labelledby="news-blog" style={{ marginTop: 'var(--spacing-8)' }}>
              <Heading as="h2" level="title" id="news-blog">Engineering Blog</Heading>
              {loading && <Text variant="muted">Loading posts…</Text>}
              {error && <Text variant="muted">Unable to load blog posts: {error}</Text>}
              {!loading && !error && posts.length === 0 && (
                <Text variant="muted">No published blog posts yet. Content is managed in Command Center CMS.</Text>
              )}
              <div className="download-grid" style={{ marginTop: 'var(--spacing-4)' }}>
                {posts.map((post) => (
                  <GlassPanel key={post.slug} className="download-card">
                    <Text variant="caption">{post.category} · {post.publishedAt.slice(0, 10)}</Text>
                    <Heading as="h3" level="title">{post.title}</Heading>
                    <Text variant="muted">{post.excerpt}</Text>
                    <Link to={`${routes.blog.path}/${post.slug}`} className="button button--secondary">
                      Read post
                    </Link>
                  </GlassPanel>
                ))}
              </div>
              <Link to={routes.blog.path} className="button button--ghost" style={{ marginTop: 'var(--spacing-4)' }}>
                View all blog posts
              </Link>
            </section>
          </div>
        </Container>
      </Section>
    </>
  )
}
