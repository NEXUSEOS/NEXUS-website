export interface MdxDocument {
  slug: string
  title: string
  description: string
  section: 'guides' | 'tutorials' | 'examples'
  path: string
}

export const mdxDocuments: MdxDocument[] = [
  {
    slug: 'platform-overview',
    title: 'Platform Overview',
    description: 'NEXUS repository model and dependency direction.',
    section: 'guides',
    path: '/docs/guides/platform-overview',
  },
  {
    slug: 'behavior-workspace',
    title: 'Behavior Workspace',
    description: 'Create, version, and publish behavior metadata.',
    section: 'guides',
    path: '/docs/guides/behavior-workspace',
  },
  {
    slug: 'sdk-quick-start',
    title: 'SDK Quick Start',
    description: 'Install SDK packages and authenticate.',
    section: 'tutorials',
    path: '/docs/tutorials/sdk-quick-start',
  },
]

export const mdxModules = {
  'platform-overview': () => import('./guides/platform-overview.mdx'),
  'behavior-workspace': () => import('./guides/behavior-workspace.mdx'),
  'sdk-quick-start': () => import('./guides/sdk-quick-start.mdx'),
} as const

export type MdxSlug = keyof typeof mdxModules

export function getMdxDocument(slug: string): MdxDocument | undefined {
  return mdxDocuments.find((doc) => doc.slug === slug)
}

export function getMdxModule(slug: string) {
  return mdxModules[slug as MdxSlug]
}
