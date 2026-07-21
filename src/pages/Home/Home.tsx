import { Hero } from '../../components/hero'
import { StructuredData } from '../../components/seo'
import { routes, getSiteUrl } from '../../config'
import HomePlatformOverview from './HomePlatformOverview'

export default function Home() {
  return (
    <div className="cx-surface">
      <StructuredData
        type="WebSite"
        name="NEXUS Robotics"
        description={routes.home.description}
        url={getSiteUrl()}
      />
      <Hero />
      <HomePlatformOverview />
    </div>
  )
}
