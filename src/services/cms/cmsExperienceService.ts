import { useEffect, useState } from 'react'
import { createWebsiteCmsClient } from './cmsContentService'

export function useCmsAnnouncements(portal = 'website') {
  const [announcements, setAnnouncements] = useState<
    Array<{ id: string; title: string; body: string; severity: string }>
  >([])

  useEffect(() => {
    void createWebsiteCmsClient()
      .listActiveAnnouncements(portal)
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
  }, [portal])

  return announcements
}

export function trackCmsPageView(pageId: string, portal = 'website') {
  const sessionId =
    sessionStorage.getItem('nexus-cms-session') ??
    (() => {
      const id = crypto.randomUUID()
      sessionStorage.setItem('nexus-cms-session', id)
      return id
    })()
  void createWebsiteCmsClient()
    .trackAnalyticsEvent({
      portal,
      eventType: 'page_view',
      pageId,
      sessionId,
      payload: { path: window.location.pathname },
    })
    .catch(() => undefined)
}

export function trackCmsHeatmapClick(x: number, y: number, pageId?: string) {
  void createWebsiteCmsClient()
    .trackAnalyticsEvent({
      portal: 'website',
      eventType: 'heatmap_click',
      pageId,
      payload: { x, y, path: window.location.pathname },
    })
    .catch(() => undefined)
}
