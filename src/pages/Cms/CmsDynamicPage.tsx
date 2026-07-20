import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading } from '@nexus/ui'
import type { CmsPageLayout, CmsTheme } from '@nexus/sdk-cms'
import { CmsPageRenderer, CmsThemeProvider } from '@nexus/cms-renderer'
import { createWebsiteCmsClient } from '../../services/cms/cmsContentService'
import { trackCmsPageView, trackCmsHeatmapClick } from '../../services/cms/cmsExperienceService'
import PageMeta from '../../components/seo/PageMeta'
import LoadingFallback from '../../router/LoadingFallback'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export default function CmsDynamicPage() {
  const { slug = '' } = useParams()
  const [layout, setLayout] = useState<CmsPageLayout | null>(null)
  const [theme, setTheme] = useState<CmsTheme | null>(null)
  const [title, setTitle] = useState('')
  const [seo, setSeo] = useState<{
    metaTitle?: string | null
    metaDescription?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImage?: string | null
    canonicalUrl?: string | null
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const client = createWebsiteCmsClient()
        const [content, portalTheme] = await Promise.all([
          client.getPublishedPage('website', slug) as Promise<{
            page: { id: string; title: string }
            layout?: CmsPageLayout
            seo?: {
              metaTitle?: string | null
              metaDescription?: string | null
              ogTitle?: string | null
              ogDescription?: string | null
              ogImage?: string | null
              canonicalUrl?: string | null
            } | null
          }>,
          client.getPublishedTheme('website'),
        ])
        if (cancelled) return
        setTitle(content.page.title)
        setLayout(content.layout ?? { sections: [] })
        setTheme(portalTheme)
        setSeo(content.seo ?? null)
        trackCmsPageView(content.page.id)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Page not found')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (error) {
    return (
      <section aria-labelledby="cms-error">
        <Heading as="h1" level="title" id="cms-error">Page not found</Heading>
        <p>{error}</p>
      </section>
    )
  }

  if (!layout) return <LoadingFallback />

  const metaTitle = seo?.metaTitle ?? seo?.ogTitle ?? title
  const metaDescription = seo?.metaDescription ?? seo?.ogDescription ?? title

  return (
    <>
      <PageMeta title={metaTitle} description={metaDescription} />
      {seo?.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
      {seo?.canonicalUrl ? <link rel="canonical" href={seo.canonicalUrl} /> : null}
      <CmsThemeProvider theme={theme} mode="dark">
        <div
          onClick={(e) => {
            if (layout.sections.length) trackCmsHeatmapClick(e.clientX, e.clientY)
          }}
        >
          <CmsPageRenderer
            layout={layout}
            breakpoint="desktop"
            cloudBaseUrl={CLOUD_URL}
            onFormSubmit={(formId, payload) => createWebsiteCmsClient().submitForm(formId, payload).then(() => undefined)}
          />
        </div>
      </CmsThemeProvider>
    </>
  )
}
