#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the merged route registry.
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const siteUrl = process.env.VITE_SITE_URL ?? 'https://nexuseos.github.io/nexus-website'
const base = siteUrl.replace(/\/$/, '')

const staticPaths = [
  '/',
  '/atlas',
  '/nova',
  '/sentinel',
  '/studio',
  '/robots',
  '/marketplace',
  '/developers',
  '/sdk',
  '/sponsors',
  '/sponsors/tiers',
  '/documentation',
  '/docs',
  '/docs/sdk',
  '/docs/api',
  '/docs/tutorials',
  '/docs/guides',
  '/docs/guides/platform-overview',
  '/docs/guides/behavior-workspace',
  '/docs/tutorials/sdk-quick-start',
  '/docs/examples',
  '/blog',
  '/releases',
  '/changelog',
  '/docs/architecture',
  '/docs/architecture/behavior-package',
  '/docs/architecture/marketplace-pipeline',
  '/docs/architecture/sdk-cli',
  '/docs/architecture/digital-twin',
  '/roadmap',
  '/contact',
  '/company',
  '/about',
  '/mission',
  '/vision',
  '/news',
  '/technology',
  '/investors',
  '/careers',
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/download',
  '/community',
  '/learning',
  '/pricing',
  '/beta',
  '/support',
  '/status',
  '/copilot',
  '/visual-dev',
  '/atlas-engineering',
  '/auth/login',
  '/auth/sign-up',
]

const urls = staticPaths
  .map(
    (path) => `  <url>\n    <loc>${base}${path === '/' ? '/' : path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`Generated sitemap with ${staticPaths.length} URLs`)
