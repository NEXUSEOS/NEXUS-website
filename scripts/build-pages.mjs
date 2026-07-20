#!/usr/bin/env node
/**
 * GitHub Pages production build — resolves base path from GITHUB_REPOSITORY or defaults to NEXUSEOS/NEXUS-website.
 */
import { execSync } from 'node:child_process'
import { cpSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'NEXUSEOS/NEXUS-website').split('/')
const basePath = process.env.VITE_BASE_PATH ?? `/${repo}/`
const siteUrl =
  process.env.VITE_SITE_URL ?? `https://${owner.toLowerCase()}.github.io/${repo}`

const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  GITHUB_REPOSITORY: `${owner}/${repo}`,
  VITE_BASE_PATH: basePath,
  VITE_SITE_URL: siteUrl,
}

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', env })
}

run('node scripts/generate-sitemap.mjs')
run('node scripts/generate-rss.mjs')
run('tsc -b')
run('vite build')
cpSync(join('dist', 'index.html'), join('dist', '404.html'))
if (existsSync('public/.nojekyll')) {
  cpSync('public/.nojekyll', join('dist', '.nojekyll'))
}

console.log(`GitHub Pages build complete — base: ${basePath}, site: ${siteUrl}`)
