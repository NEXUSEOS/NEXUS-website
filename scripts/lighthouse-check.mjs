#!/usr/bin/env node
/**
 * SEO artifact validation — pre-Lighthouse quality gate.
 * Full Lighthouse audit: npm run preview && npx lighthouse http://localhost:4173 --view
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

const requiredFiles = ['robots.txt', 'sitemap.xml', 'blog.rss.xml']
const indexHtml = join(root, 'index.html')

let failed = false

for (const file of requiredFiles) {
  const path = join(publicDir, file)
  if (!existsSync(path)) {
    console.error(`Missing SEO artifact: public/${file}`)
    failed = true
  }
}

const html = readFileSync(indexHtml, 'utf8')
const seoChecks = [
  { label: 'viewport meta', pattern: /name="viewport"/ },
  { label: 'description meta', pattern: /name="description"/ },
  { label: 'og:title', pattern: /property="og:title"/ },
  { label: 'RSS alternate link', pattern: /type="application\/rss\+xml"/ },
]

for (const check of seoChecks) {
  if (!check.pattern.test(html)) {
    console.error(`Missing ${check.label} in index.html`)
    failed = true
  }
}

if (failed) {
  process.exit(1)
}

const sitemap = readFileSync(join(publicDir, 'sitemap.xml'), 'utf8')
const requiredPaths = ['/company', '/about', '/legal/privacy', '/download', '/community', '/pricing']
for (const path of requiredPaths) {
  if (!sitemap.includes(path)) {
    console.error(`Sitemap missing path: ${path}`)
    failed = true
  }
}

if (failed) {
  process.exit(1)
}

console.log('Lighthouse pre-check passed — SEO artifacts and metadata present.')
console.log('Run full audit: npm run preview && npx lighthouse http://localhost:4173 --view')
