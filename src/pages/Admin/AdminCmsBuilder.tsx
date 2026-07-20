import { useCallback, useEffect, useState } from 'react'
import { GlassPanel, Button, Heading, Text } from '@nexus/ui'
import { CmsPageRenderer, CmsThemeProvider } from '@nexus/cms-renderer'
import { CMS_COMPONENT_PALETTE, createDefaultLayout, type CmsComponentType } from '@nexus/sdk-cms'
import { createWebsiteCmsClient } from '../../services/cms/cmsContentService'

const PORTALS = ['website', 'developer', 'sponsor', 'marketplace', 'documentation'] as const

export default function AdminCmsBuilder() {
  const [portal, setPortal] = useState<(typeof PORTALS)[number]>('website')
  const [pages, setPages] = useState<Array<{ id: string; title: string; slug: string; status: string }>>([])
  const [pageId, setPageId] = useState<string | null>(null)
  const [layout, setLayout] = useState(createDefaultLayout())
  const [breakpoint, setBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const client = createWebsiteCmsClient()

  const refreshPages = useCallback(async () => {
    setLoading(true)
    try {
      const list = await client.listPages(portal)
      setPages(list.map((p) => ({ id: p.id, title: p.title, slug: p.slug, status: p.status })))
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load pages')
    } finally {
      setLoading(false)
    }
  }, [portal])

  useEffect(() => {
    void refreshPages()
  }, [refreshPages])

  async function loadPage(id: string) {
    setLoading(true)
    try {
      const data = await client.getPageLayout(id)
      setPageId(id)
      setLayout(data.sections?.length ? data : createDefaultLayout())
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  function addComponent(type: CmsComponentType) {
    const section = layout.sections[0]
    if (!section) return
    section.components.push({
      componentType: type,
      props: CMS_COMPONENT_PALETTE.find((p) => p.type === type)?.defaultProps ?? {},
      sortOrder: section.components.length,
    })
    setLayout({ ...layout, sections: [...layout.sections] })
  }

  function onDropComponent(type: string) {
    addComponent(type as CmsComponentType)
  }

  async function saveLayout() {
    if (!pageId) return
    setLoading(true)
    try {
      await client.savePageLayout(pageId, layout)
      setMessage('Layout saved')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  async function publishPage() {
    if (!pageId) return
    setLoading(true)
    try {
      await client.publishPage(pageId)
      setMessage('Page published')
      await refreshPages()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Publish failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassPanel className="admin-page admin-cms">
      <Heading as="h2" level="title">Visual CMS Builder</Heading>
      <Text variant="caption">Drag components, preview responsive layouts, publish to live site</Text>

      <div className="admin-cms__toolbar">
        <label>
          Portal
          <select value={portal} onChange={(e) => setPortal(e.target.value as typeof portal)}>
            {PORTALS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label>
          Page
          <select value={pageId ?? ''} onChange={(e) => void loadPage(e.target.value)}>
            <option value="">Select page…</option>
            {pages.map((p) => <option key={p.id} value={p.id}>{p.title} ({p.status})</option>)}
          </select>
        </label>
        {(['desktop', 'tablet', 'mobile'] as const).map((bp) => (
          <Button key={bp} variant={breakpoint === bp ? 'primary' : 'secondary'} onClick={() => setBreakpoint(bp)}>{bp}</Button>
        ))}
        <Button variant="primary" disabled={!pageId || loading} onClick={() => void saveLayout()}>Save</Button>
        <Button variant="secondary" disabled={!pageId || loading} onClick={() => void publishPage()}>Publish</Button>
      </div>

      {message && <Text variant="caption">{message}</Text>}

      <div className="admin-cms__workspace">
        <aside
          className="admin-cms__palette"
          onDragOver={(e) => e.preventDefault()}
        >
          <Text variant="caption">Components — drag to canvas</Text>
          {CMS_COMPONENT_PALETTE.map((item) => (
            <button
              key={item.type}
              type="button"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('componentType', item.type)}
              onClick={() => addComponent(item.type as CmsComponentType)}
              className="admin-cms__palette-item"
            >
              {item.label}
            </button>
          ))}
        </aside>
        <div
          className={`admin-cms__canvas admin-cms__canvas--${breakpoint}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const type = e.dataTransfer.getData('componentType')
            if (type) onDropComponent(type)
          }}
        >
          <CmsThemeProvider theme={null} mode="dark">
            <CmsPageRenderer layout={layout} />
          </CmsThemeProvider>
        </div>
      </div>
    </GlassPanel>
  )
}
