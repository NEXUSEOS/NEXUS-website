/** Shared content platform types — owned by nexus-website. */

export interface ContentSection {
  id: string
  title: string
  description: string
  path: string
  category: 'documentation' | 'engineering' | 'sdk'
}

export interface DocArticle {
  id: string
  title: string
  description: string
  path: string
  sectionId: string
  tags: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: string
  tags: string[]
  category: string
}

export interface ReleaseNote {
  version: string
  date: string
  title: string
  summary: string
  highlights: string[]
  products: string[]
}

export interface ChangelogEntry {
  version: string
  date: string
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed'
    description: string
  }[]
}
