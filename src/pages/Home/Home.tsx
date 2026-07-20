import { Hero } from '../../components/hero'
import { StructuredData } from '../../components/seo'
import { routes, getSiteUrl } from '../../config'
import HomePlatformOverview from './HomePlatformOverview'

export default function Home() {
  return (
    <>
      <StructuredData
        type="WebSite"
        name="NEXUS Robotics"
        description={routes.home.description}
        url={getSiteUrl()}
      />
      <Hero />
      <HomePlatformOverview />
    </>
  )
}
