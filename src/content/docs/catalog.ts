import { websiteRoutes } from '../../config/websiteRoutes'
import type { DocArticle } from '../types'

export const documentationSections = [
  {
    id: 'overview',
    title: 'Platform Overview',
    description: 'Architecture, repositories, and ecosystem map.',
    path: websiteRoutes.docs.path,
    category: 'documentation' as const,
  },
  {
    id: 'sdk',
    title: 'SDK',
    description: 'Client libraries, CLI, and package APIs.',
    path: websiteRoutes.docsSdk.path,
    category: 'sdk' as const,
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Cloud, fleet, and robot REST APIs.',
    path: websiteRoutes.docsApi.path,
    category: 'documentation' as const,
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Guided learning for new NEXUS developers.',
    path: websiteRoutes.docsTutorials.path,
    category: 'documentation' as const,
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Production patterns and best practices.',
    path: websiteRoutes.docsGuides.path,
    category: 'documentation' as const,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Behavior packages, marketplace, SDK CLI, Digital Twin specs.',
    path: websiteRoutes.docsArchitecture.path,
    category: 'documentation' as const,
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Sample projects and reference code.',
    path: websiteRoutes.docsExamples.path,
    category: 'documentation' as const,
  },
]

export const documentationArticles: DocArticle[] = [
  {
    id: 'platform-overview',
    title: 'NEXUS Platform Overview',
    description: 'Repository ownership model and dependency direction.',
    path: websiteRoutes.docs.path,
    sectionId: 'overview',
    tags: ['architecture', 'platform'],
  },
  {
    id: 'sdk-getting-started',
    title: 'SDK Getting Started',
    description: 'Install packages and authenticate with NEXUS cloud.',
    path: `${websiteRoutes.docsSdk.path}/getting-started`,
    sectionId: 'sdk',
    tags: ['sdk', 'installation'],
  },
  {
    id: 'api-authentication',
    title: 'API Authentication',
    description: 'OAuth, API keys, and service credentials.',
    path: `${websiteRoutes.docsApi.path}/authentication`,
    sectionId: 'api',
    tags: ['api', 'auth'],
  },
  {
    id: 'tutorial-first-robot',
    title: 'Your First Robot Integration',
    description: 'Connect a robot to the NEXUS cloud registry.',
    path: `${websiteRoutes.docsTutorials.path}/first-robot`,
    sectionId: 'tutorials',
    tags: ['tutorial', 'robots'],
  },
  {
    id: 'guide-behavior-lifecycle',
    title: 'Behavior Lifecycle Guide',
    description: 'Draft, version, publish, and archive behaviors.',
    path: `${websiteRoutes.docsGuides.path}/behavior-lifecycle`,
    sectionId: 'guides',
    tags: ['behaviors', 'guide'],
  },
  {
    id: 'architecture-hub',
    title: 'Architecture Specifications',
    description: 'Cross-repository behavior, SDK, and marketplace architecture.',
    path: websiteRoutes.docsArchitecture.path,
    sectionId: 'architecture',
    tags: ['architecture', 'sdk', 'marketplace'],
  },
  {
    id: 'example-behavior-template',
    title: 'Behavior Template Example',
    description: 'Starter behavior metadata and versioning pattern.',
    path: `${websiteRoutes.docsExamples.path}/behavior-template`,
    sectionId: 'examples',
    tags: ['behaviors', 'example'],
  },
]
