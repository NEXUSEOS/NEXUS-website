import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'
import { fetchKnowledgeArticle, fetchKnowledgeArticles } from '../../services/launch/launchService'

export default function KnowledgeBase() {
  const { slug } = useParams()
  const [articles, setArticles] = useState<Array<{ slug: string; title: string; summary: string; category: string }>>([])
  const [article, setArticle] = useState<{ title: string; body: string; summary: string } | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (slug) {
      void fetchKnowledgeArticle(slug).then((d) => setArticle(d.article))
      return
    }
    void fetchKnowledgeArticles().then((d) => setArticles(d.articles))
  }, [slug])

  async function search() {
    const data = await fetchKnowledgeArticles(query || undefined)
    setArticles(data.articles)
  }

  if (slug && article) {
    return (
      <PageShell route={routes.knowledgeBase}>
        <Link to={routes.knowledgeBase.path}>← Back to Knowledge Base</Link>
        <Heading as="h1" level="heading">{article.title}</Heading>
        <Text variant="muted">{article.summary}</Text>
        <Text style={{ marginTop: 'var(--spacing-6)', whiteSpace: 'pre-wrap' }}>{article.body}</Text>
      </PageShell>
    )
  }

  return (
    <PageShell route={routes.knowledgeBase}>
      <Text variant="muted">Search help articles for onboarding, API keys, beta access, and support.</Text>
      <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-2)' }}>
        <input className="cc-tools__input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" aria-label="Search knowledge base" />
        <Button variant="primary" onClick={() => void search()}>Search</Button>
      </div>
      <ul style={{ marginTop: 'var(--spacing-8)' }}>
        {articles.map((a) => (
          <li key={a.slug} style={{ marginBottom: 'var(--spacing-4)' }}>
            <Link to={`${routes.knowledgeBase.path}/${a.slug}`}>
              <Heading as="h2" level="title">{a.title}</Heading>
            </Link>
            <Text variant="caption">{a.category}</Text>
            <Text variant="muted">{a.summary}</Text>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
