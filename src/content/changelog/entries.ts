import type { ChangelogEntry } from '../types'

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '0.2.0',
    date: '2026-07-10',
    changes: [
      { type: 'added', description: 'Production navigation with mobile menu, search, and breadcrumbs' },
      { type: 'added', description: 'Content platform — docs hub, blog, releases, changelog' },
      { type: 'added', description: 'Extended developer platform architecture (11 sections)' },
      { type: 'added', description: 'Behavior Workspace — create, version, clone, publish, archive (architecture only)' },
      { type: 'added', description: 'SDK documentation architecture and @nexus/sdk-* package roadmap' },
      { type: 'added', description: 'SEO — expanded sitemap, structured metadata, robots.txt' },
      { type: 'changed', description: 'Website maturity bumped to Beta (v0.2.0)' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-07-10',
    changes: [
      { type: 'added', description: 'Initial NEXUS website incubation release' },
      { type: 'added', description: 'Auth, developer/sponsor portals, download center' },
      { type: 'added', description: 'Seven @nexus shared packages extracted' },
    ],
  },
]
