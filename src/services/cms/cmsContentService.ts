import { createCmsClient, type CmsPageSummary, type FullCmsClient } from '@nexus/sdk-cms'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

function getAccessToken(): string | undefined {
  try {
    const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
    if (!key) return undefined
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as { access_token?: string }
    return parsed.access_token
  } catch {
    return undefined
  }
}

export function createWebsiteCmsClient(): FullCmsClient {
  return createCmsClient({
    cloudBaseUrl: CLOUD_URL,
    accessToken: getAccessToken(),
  })
}

export async function fetchPublishedBlogPosts(): Promise<
  Array<{ slug: string; title: string; excerpt: string; publishedAt: string; author: string; tags: string[]; category: string }>
> {
  const client = createWebsiteCmsClient()
  const pages = await client.listPublishedPages('website')
  const blogPages = pages.filter((p) => p.slug.startsWith('blog/'))

  const posts = await Promise.all(
    blogPages.map(async (page) => {
      try {
        const content = (await client.getPublishedPage('website', page.slug)) as {
          page: CmsPageSummary
          version?: { body?: Record<string, unknown> }
        }
        const body = content.version?.body ?? {}
        return {
          slug: page.slug.replace(/^blog\//, ''),
          title: page.title,
          excerpt: String(body.excerpt ?? ''),
          publishedAt: page.publishedAt ?? page.updatedAt,
          author: String(body.author ?? 'NEXUS'),
          tags: Array.isArray(body.tags) ? (body.tags as string[]) : [],
          category: String(body.category ?? 'General'),
        }
      } catch {
        return {
          slug: page.slug,
          title: page.title,
          excerpt: '',
          publishedAt: page.publishedAt ?? page.updatedAt,
          author: 'NEXUS',
          tags: [],
          category: 'General',
        }
      }
    }),
  )

  return posts.filter((p) => p.title)
}

export async function fetchPublishedBlogPost(slug: string) {
  const client = createWebsiteCmsClient()
  const content = (await client.getPublishedPage('website', `blog/${slug}`)) as {
    page: CmsPageSummary
    version?: { body?: Record<string, unknown>; mdxSource?: string }
    blocks?: Array<{ content: Record<string, unknown> }>
  }
  const body = content.version?.body ?? {}
  return {
    slug,
    title: content.page.title,
    excerpt: String(body.excerpt ?? ''),
    publishedAt: content.page.publishedAt ?? content.page.updatedAt,
    author: String(body.author ?? 'NEXUS'),
    tags: Array.isArray(body.tags) ? (body.tags as string[]) : [],
    category: String(body.category ?? 'General'),
    mdxSource: content.version?.mdxSource,
    blocks: content.blocks ?? [],
  }
}

export async function fetchPublishedNavigation(portal = 'website') {
  const client = createWebsiteCmsClient()
  return client.listPublishedNavigation(portal)
}

export async function fetchPublishedFooter(portal = 'website') {
  const client = createWebsiteCmsClient()
  return client.getPublishedFooter(portal)
}

export async function fetchPublishedTheme(portal = 'website') {
  const client = createWebsiteCmsClient()
  return client.getPublishedTheme(portal)
}

export async function fetchPublishedCmsPage(portal: string, slug: string) {
  const client = createWebsiteCmsClient()
  return client.getPublishedPage(portal, slug)
}
