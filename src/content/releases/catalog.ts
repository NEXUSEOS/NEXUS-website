import type { ReleaseNote } from '../types'

export const releaseNotes: ReleaseNote[] = [
  {
    version: '0.2.0',
    date: '2026-07-10',
    title: 'Production Website Beta',
    summary: 'Official production gateway with documentation platform, developer dashboard architecture, and SDK foundation.',
    highlights: [
      'Responsive navigation with search and breadcrumbs',
      'Documentation, blog, release notes, and changelog architecture',
      'Developer platform sections and Behavior Workspace foundation',
      'SDK documentation architecture and package roadmap',
    ],
    products: ['nexus-website', '@nexus/platform packages'],
  },
  {
    version: '0.1.0',
    date: '2026-07-10',
    title: 'Platform Incubation Release',
    summary: 'Initial incubation release with auth, portals, downloads, and Aether engine integration.',
    highlights: [
      'Supabase authentication and role-based portals',
      'Download center with permission gating',
      'Aether visual engine on Hero',
      'Shared package extraction to nexus-platform',
    ],
    products: ['nexus-website', 'nexus-platform'],
  },
]
