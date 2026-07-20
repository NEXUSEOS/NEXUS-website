export type CmsComponentType =
  | 'hero'
  | 'content_block'
  | 'button'
  | 'form'
  | 'image'
  | 'video'
  | 'navigation'
  | 'footer'
  | 'cards'
  | 'faq'
  | 'testimonials'
  | 'gallery'
  | 'table'
  | 'code'
  | 'markdown'
  | 'rich_text'

export interface CmsLayoutComponent {
  id?: string
  componentType: CmsComponentType
  props: Record<string, unknown>
  sortOrder: number
}

export interface CmsLayoutSection {
  id?: string
  sectionKey: string
  title?: string
  sortOrder: number
  components: CmsLayoutComponent[]
}

export interface CmsPageLayout {
  sections: CmsLayoutSection[]
}

export interface CmsThemeTokens {
  colors?: Record<string, string>
  typography?: Record<string, string>
  spacing?: Record<string, string>
  radius?: Record<string, string>
  motion?: Record<string, string>
  glass?: Record<string, string>
}

export interface CmsTheme {
  id: string
  portal: string
  name: string
  isDefault: boolean
  lightTokens: CmsThemeTokens
  darkTokens: CmsThemeTokens
}

export interface CmsClientConfig {
  cloudBaseUrl: string
  accessToken?: string
}

export interface CmsPageSummary {
  id: string
  portal: string
  slug: string
  title: string
  status: string
  publishedAt?: string | null
  scheduledPublishAt?: string | null
  updatedAt: string
}

export interface CmsClient {
  listPublishedPages(portal: string): Promise<CmsPageSummary[]>
  getPublishedPage(portal: string, slug: string): Promise<unknown>
  getPublishedTheme(portal: string): Promise<CmsTheme | null>
  listPublishedNavigation(portal: string): Promise<Array<{ id: string; label: string; href: string; sortOrder: number }>>
  getPublishedFooter(portal: string): Promise<unknown>
  submitForm(formId: string, payload: Record<string, unknown>): Promise<unknown>
  listPages(portal?: string, status?: string): Promise<CmsPageSummary[]>
  getPageLayout(pageId: string): Promise<CmsPageLayout>
  savePageLayout(pageId: string, layout: CmsPageLayout, changeSummary?: string): Promise<CmsPageLayout>
  publishPage(id: string): Promise<CmsPageSummary>
  listThemes(portal: string): Promise<CmsTheme[]>
  upsertTheme(input: Partial<CmsTheme> & { portal: string; name: string }): Promise<CmsTheme>
  listActiveAnnouncements(portal: string): Promise<Array<{ id: string; title: string; body: string; severity: string }>>
  trackAnalyticsEvent(input: {
    portal: string
    eventType: string
    pageId?: string
    sessionId?: string
    payload?: Record<string, unknown>
  }): Promise<unknown>
}

export type FullCmsClient = CmsClient

export const CMS_COMPONENT_PALETTE: Array<{
  type: CmsComponentType
  label: string
  category: 'layout' | 'content' | 'media' | 'interactive'
  defaultProps: Record<string, unknown>
}> = [
  {
    type: 'hero',
    label: 'Hero',
    category: 'layout',
    defaultProps: { title: 'Hero title', subtitle: 'Supporting copy', cta: [], align: 'center' },
  },
  {
    type: 'rich_text',
    label: 'Rich Text',
    category: 'content',
    defaultProps: { html: '<p>Edit this content in the page builder.</p>' },
  },
  {
    type: 'button',
    label: 'Button',
    category: 'interactive',
    defaultProps: { label: 'Click me', href: '#', variant: 'primary' },
  },
]

export function createDefaultLayout(): CmsPageLayout {
  return {
    sections: [
      {
        sectionKey: 'main',
        title: 'Main',
        sortOrder: 0,
        components: [
          {
            componentType: 'hero',
            sortOrder: 0,
            props: CMS_COMPONENT_PALETTE.find((entry) => entry.type === 'hero')!.defaultProps,
          },
        ],
      },
    ],
  }
}

function createEmptyCmsClient(): FullCmsClient {
  return {
    async listPublishedPages() {
      return []
    },
    async getPublishedPage() {
      return { page: { id: '', title: '' }, layout: createDefaultLayout() }
    },
    async getPublishedTheme() {
      return null
    },
    async listPublishedNavigation() {
      return []
    },
    async getPublishedFooter() {
      return null
    },
    async submitForm() {
      return null
    },
    async listPages() {
      return []
    },
    async getPageLayout() {
      return createDefaultLayout()
    },
    async savePageLayout(_pageId, layout) {
      return layout
    },
    async publishPage(id) {
      return {
        id,
        portal: 'website',
        slug: '',
        title: '',
        status: 'published',
        updatedAt: new Date().toISOString(),
      }
    },
    async listThemes() {
      return []
    },
    async upsertTheme(input) {
      return {
        id: input.id ?? 'theme-default',
        portal: input.portal,
        name: input.name,
        isDefault: input.isDefault ?? true,
        lightTokens: input.lightTokens ?? {},
        darkTokens: input.darkTokens ?? {},
      }
    },
    async listActiveAnnouncements() {
      return []
    },
    async trackAnalyticsEvent() {
      return null
    },
  }
}

export function createCmsClient(_config: CmsClientConfig): FullCmsClient {
  return createEmptyCmsClient()
}
