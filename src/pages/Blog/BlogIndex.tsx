import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageMeta, StructuredData } from '../../components/seo'
import { routes } from '../../config/routes'
import { fetchPublishedBlogPosts } from '../../services/cms/cmsContentService'
import { getSiteUrl } from '../../config'
import { Container, GlassPanel, Heading, Section, Text } from '../../components/ui'

export default function BlogIndex() {
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
      <PageMeta title={routes.blog.title} description={routes.blog.description} path={routes.blog.path} />
      <StructuredData
        type="WebSite"
        name="NEXUS Engineering Blog"
        description={routes.blog.description}
        url={`${getSiteUrl()}${routes.blog.path}`}
      />
      <Section>
        <Container>
          <div className="page-shell">
            <Heading as="h1" level="heading">
              Engineering Blog
            </Heading>
            <Text variant="muted">{routes.blog.description}</Text>

            {loading && <Text variant="muted">Loading posts…</Text>}
            {error && <Text variant="muted">Unable to load blog posts: {error}</Text>}
            {!loading && !error && posts.length === 0 && (
              <Text variant="muted">No published blog posts yet. Content is managed in Command Center.</Text>
            )}

            <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
              {posts.map((post) => (
                <GlassPanel key={post.slug} className="download-card">
                  <Text variant="caption">
                    {post.category} · {post.publishedAt.slice(0, 10)}
                  </Text>
                  <Heading as="h2" level="title">
                    {post.title}
                  </Heading>
                  <Text variant="muted">{post.excerpt}</Text>
                  <Link to={`${routes.blog.path}/${post.slug}`} className="button button--secondary">
                    Read post
                  </Link>
                </GlassPanel>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
