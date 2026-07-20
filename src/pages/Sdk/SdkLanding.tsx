import { MarketingPage } from '../../components/marketing'
import { websiteRoutes } from '../../config'

export default function SdkLanding() {
  return (
    <MarketingPage
      route={websiteRoutes.sdkLanding}
      eyebrow="Developer Platform"
      headline="NEXUS SDK"
      subheadline="Behavior runtime, simulation, ROS bridge, vision, planning, and cloud APIs — one toolkit for production robotics."
      primaryCta={{ label: 'SDK documentation', path: websiteRoutes.docsSdk.path }}
      secondaryCta={{ label: 'Developer onboarding', path: websiteRoutes.developerOnboarding.path }}
      features={[
        { title: 'Behavior packages', description: 'Validate, sign, and publish to the marketplace.' },
        { title: 'Simulation & twin', description: 'Run jobs locally or in the cloud digital twin.' },
        { title: 'CLI workflow', description: 'init, validate, package, publish, and connect validate.' },
      ]}
      relatedLinks={[
        { label: 'API reference', path: websiteRoutes.docsApi.path },
        { label: 'Marketplace', path: websiteRoutes.docs.path },
      ]}
    />
  )
}
