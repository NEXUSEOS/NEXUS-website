import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageMeta, StructuredData } from '../../components/seo'
import { routes } from '../../config/routes'
import { fetchPublishedBlogPost } from '../../services/cms/cmsContentService'
import { getSiteUrl } from '../../config'
import { Container, Heading, Section, Text } from '../../components/ui'
import NotFound from '../NotFound/NotFound'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Awaited<ReturnType<typeof fetchPublishedBlogPost>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }
    fetchPublishedBlogPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <Section>
        <Container>
          <Text variant="muted">Loading…</Text>
        </Container>
      </Section>
    )
  }

  if (notFound || !post) return <NotFound />

  const path = `${routes.blog.path}/${post.slug}`

  return (
    <>
      <PageMeta title={post.title} description={post.excerpt} path={path} />
      <StructuredData
        type="Article"
        name={post.title}
        description={post.excerpt}
        url={`${getSiteUrl()}${path}`}
        datePublished={post.publishedAt}
        author={post.author}
      />
      <Section>
        <Container>
          <article className="page-shell">
            <Text variant="caption">
              {post.category} · {post.publishedAt.slice(0, 10)} · {post.author}
            </Text>
            <Heading as="h1" level="heading">
              {post.title}
            </Heading>
            <Text variant="body">{post.excerpt}</Text>
            {post.mdxSource && (
              <pre className="cms-content-body" style={{ whiteSpace: 'pre-wrap', marginTop: 'var(--spacing-6)' }}>
                {post.mdxSource}
              </pre>
            )}
            {post.blocks.map((block, i) => (
              <Text key={i} variant="body" style={{ marginTop: 'var(--spacing-4)' }}>
                {String(block.content.text ?? JSON.stringify(block.content))}
              </Text>
            ))}
            <Text variant="muted" style={{ marginTop: 'var(--spacing-6)' }}>
              Tags: {post.tags.join(', ') || 'none'}
            </Text>
            <Link to={routes.blog.path} className="button button--ghost" style={{ marginTop: 'var(--spacing-8)' }}>
              Back to Blog
            </Link>
          </article>
        </Container>
      </Section>
    </>
  )
}
