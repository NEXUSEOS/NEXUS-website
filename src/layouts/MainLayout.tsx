import { Outlet } from 'react-router-dom'
import { Footer, SkipLink } from '../components/layout'
import { Breadcrumbs, Navigation } from '../components/navigation'
import CmsAnnouncementsBanner from '../components/cms/CmsAnnouncementsBanner'
import PageViewTracker from '../components/analytics/PageViewTracker'
import { ErrorBoundary } from '../components/error'
import { CommandPalette } from '../components/ux'
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <SkipLink />
      <PageViewTracker />
      <CommandPalette />
      <CmsAnnouncementsBanner />
      <Navigation />
      <Breadcrumbs />
      <main id="main-content" className="main-layout__content" tabIndex={-1}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
