#!/usr/bin/env node
/**
 * Generates public/blog.rss.xml from the engineering blog catalog.
 * Keep in sync with src/content/blog/posts.ts
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const siteUrl = process.env.VITE_SITE_URL ?? 'https://nexuseos.github.io/nexus-website'
const base = siteUrl.replace(/\/$/, '')

const blogPosts = [
  {
    slug: 'nexus-v0-2-production-gateway',
    title: 'NEXUS v0.2 — Production Gateway Launch',
    excerpt:
      'The NEXUS website becomes the official production entry point for developers, sponsors, and future robot owners.',
    publishedAt: '2026-07-10',
    author: 'NEXUS Platform Engineering',
  },
  {
    slug: 'behavior-workspace-architecture',
    title: 'Introducing the Behavior Workspace Architecture',
    excerpt:
      'First look at behavior metadata, versioning, and publishing — architecture preview without on-robot execution.',
    publishedAt: '2026-07-10',
    author: 'NEXUS SDK Team',
  },
  {
    slug: 'shared-platform-extraction',
    title: 'Shared Platform Extraction Complete',
    excerpt:
      'Seven @nexus packages now power the website and prepare Studio, Cloud, and Marketplace applications.',
    publishedAt: '2026-07-10',
    author: 'NEXUS Platform Engineering',
  },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const items = blogPosts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${base}/blog/${post.slug}</link>
      <guid isPermaLink="true">${base}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NEXUS Engineering Blog</title>
    <link>${base}/blog</link>
    <description>NEXUS platform engineering updates, SDK news, and ecosystem announcements.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/blog.rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

writeFileSync(join(root, 'public/blog.rss.xml'), xml)
console.log(`Generated RSS feed with ${blogPosts.length} posts`)
