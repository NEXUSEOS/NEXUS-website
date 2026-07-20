import { routes } from '../config/routes'
import { websiteRoutes } from '../config/websiteRoutes'
import { contentNavigation } from '../config/contentNavigation'
import { documentationArticles } from './docs/catalog'
import { blogPosts } from './blog/posts'
import { mdxDocuments } from './mdx'

export interface SearchResult {
  label: string
  path: string
  description: string
  category: string
}

/** Unified search index — navigation, content, and platform routes. */
export function buildSearchIndex(): SearchResult[] {
  const routeResults: SearchResult[] = Object.values(routes).map((route) => ({
    label: route.title,
    path: route.path,
    description: route.description,
    category: 'Page',
  }))

  const contentResults: SearchResult[] = contentNavigation.map((item) => ({
    label: item.label,
    path: item.path,
    description: item.description,
    category: 'Content',
  }))

  const docResults: SearchResult[] = documentationArticles.map((article) => ({
    label: article.title,
    path: article.path,
    description: article.description,
    category: 'Documentation',
  }))

  const blogResults: SearchResult[] = blogPosts.map((post) => ({
    label: post.title,
    path: `${websiteRoutes.blog.path}/${post.slug}`,
    description: post.excerpt,
    category: 'Blog',
  }))

  const mdxResults: SearchResult[] = mdxDocuments.map((doc) => ({
    label: doc.title,
    path: doc.path,
    description: doc.description,
    category: 'MDX Documentation',
  }))

  const seen = new Set<string>()
  return [...routeResults, ...contentResults, ...docResults, ...blogResults, ...mdxResults].filter((item) => {
    if (seen.has(item.path)) return false
    seen.add(item.path)
    return true
  })
}

export function searchContent(query: string, limit = 8): SearchResult[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return buildSearchIndex()
    .filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.path.toLowerCase().includes(normalized),
    )
    .slice(0, limit)
}
