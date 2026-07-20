import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { createWebsiteCmsClient } from '../../services/cms/cmsContentService'

/** Records marketing page views for CMS experience analytics. */
export default function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    const sessionId =
      sessionStorage.getItem('nexus-cms-session') ??
      (() => {
        const id = crypto.randomUUID()
        sessionStorage.setItem('nexus-cms-session', id)
        return id
      })()

    void createWebsiteCmsClient()
      .trackAnalyticsEvent({
        portal: 'website',
        eventType: 'page_view',
        sessionId,
        payload: { path: location.pathname },
      })
      .catch(() => undefined)
  }, [location.pathname])

  return null
}
