import type { BlogPost } from '../types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'nexus-v0-2-production-gateway',
    title: 'NEXUS v0.2 — Production Gateway Launch',
    excerpt:
      'The NEXUS website becomes the official production entry point for developers, sponsors, and future robot owners.',
    publishedAt: '2026-07-10',
    author: 'NEXUS Platform Engineering',
    tags: ['platform', 'release', 'website'],
    category: 'Engineering',
  },
  {
    slug: 'behavior-workspace-architecture',
    title: 'Introducing the Behavior Workspace Architecture',
    excerpt:
      'First look at behavior metadata, versioning, and publishing — architecture preview without on-robot execution.',
    publishedAt: '2026-07-10',
    author: 'NEXUS SDK Team',
    tags: ['behaviors', 'sdk', 'architecture'],
    category: 'SDK',
  },
  {
    slug: 'shared-platform-extraction',
    title: 'Shared Platform Extraction Complete',
    excerpt:
      'Seven @nexus packages now power the website and prepare Studio, Cloud, and Marketplace applications.',
    publishedAt: '2026-07-10',
    author: 'NEXUS Platform Engineering',
    tags: ['platform', 'monorepo'],
    category: 'Platform',
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
