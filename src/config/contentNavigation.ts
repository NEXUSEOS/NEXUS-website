import { websiteRoutes } from './websiteRoutes'

export interface ContentNavItem {
  label: string
  path: string
  description: string
  category: 'documentation' | 'engineering' | 'sdk'
}

/** Documentation hub navigation. */
export const documentationNav: ContentNavItem[] = [
  {
    label: 'Overview',
    path: websiteRoutes.docs.path,
    description: 'Documentation home and platform index.',
    category: 'documentation',
  },
  {
    label: 'SDK',
    path: websiteRoutes.docsSdk.path,
    description: 'SDK installation, authentication, and package APIs.',
    category: 'sdk',
  },
  {
    label: 'Architecture',
    path: websiteRoutes.docsArchitecture.path,
    description: 'Behavior package, marketplace, SDK CLI, Digital Twin specifications.',
    category: 'documentation',
  },
  {
    label: 'API Reference',
    path: websiteRoutes.docsApi.path,
    description: 'REST and cloud API endpoints.',
    category: 'documentation',
  },
  {
    label: 'Tutorials',
    path: websiteRoutes.docsTutorials.path,
    description: 'Hands-on learning paths.',
    category: 'documentation',
  },
  {
    label: 'Guides',
    path: websiteRoutes.docsGuides.path,
    description: 'Production deployment and operations guides.',
    category: 'documentation',
  },
  {
    label: 'Examples',
    path: websiteRoutes.docsExamples.path,
    description: 'Reference implementations and samples.',
    category: 'documentation',
  },
]

/** Engineering content navigation. */
export const engineeringContentNav: ContentNavItem[] = [
  {
    label: 'Blog',
    path: websiteRoutes.blog.path,
    description: 'Engineering updates and ecosystem news.',
    category: 'engineering',
  },
  {
    label: 'Release Notes',
    path: websiteRoutes.releases.path,
    description: 'Product release summaries.',
    category: 'engineering',
  },
  {
    label: 'Changelog',
    path: websiteRoutes.changelog.path,
    description: 'Detailed version history.',
    category: 'engineering',
  },
]

export const contentNavigation = [...documentationNav, ...engineeringContentNav]
