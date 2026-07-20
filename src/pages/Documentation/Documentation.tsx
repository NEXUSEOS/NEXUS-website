import { MarketingPage } from '../../components/marketing'
import { routes, websiteRoutes } from '../../config'

export default function Documentation() {
  return (
    <MarketingPage
      route={routes.documentation}
      headline="Documentation"
      subheadline="SDK references, tutorials, architecture specs, and API guides for the NEXUS platform."
      primaryCta={{ label: 'Open docs hub', path: websiteRoutes.docs.path }}
      secondaryCta={{ label: 'SDK documentation', path: websiteRoutes.docsSdk.path }}
      features={[
        { title: 'SDK', description: 'Install, authenticate, and publish behavior packages.' },
        { title: 'API', description: 'Cloud REST endpoints for developers and integrators.' },
        { title: 'Architecture', description: 'Behavior packages, marketplace pipeline, and digital twin.' },
      ]}
      relatedLinks={[
        { label: 'Tutorials', path: websiteRoutes.docsTutorials.path },
        { label: 'Guides', path: websiteRoutes.docsGuides.path },
        { label: 'Examples', path: websiteRoutes.docsExamples.path },
      ]}
    />
  )
}
