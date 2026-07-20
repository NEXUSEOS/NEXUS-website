import { routes, websiteRoutes } from '../config'
import type { MarketingFeature, MarketingCta } from '../components/marketing'

export interface HomePlatformPillar {
  title: string
  description: string
  path?: string
}

export const homePlatformPillars: HomePlatformPillar[] = [
  { title: 'NEXUS Studio', description: 'Design behaviors, simulate in the digital twin, and operate robots from one IDE.', path: routes.studio.path },
  { title: 'NEXUS Cloud', description: 'Auth, sync, marketplace, billing, and Command Center APIs for production teams.', path: websiteRoutes.technology.path },
  { title: 'NEXUS SDK', description: 'Behavior packages, simulation, ROS bridge, vision, and cloud client libraries.', path: websiteRoutes.sdkLanding.path },
  { title: 'Marketplace', description: 'Discover, validate, and publish robotics behaviors, models, and tools.', path: routes.marketplace.path },
  { title: 'Atlas Program', description: 'Digital twin validation and alpha software for future humanoid platforms.', path: routes.atlas.path },
  { title: 'Developer Ecosystem', description: 'Portals, documentation, beta programs, and community reputation.', path: routes.developers.path },
]

export interface ProductPageContent {
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: MarketingCta
  secondaryCta?: MarketingCta
  features: MarketingFeature[]
  relatedLinks?: MarketingCta[]
}

export const productPages = {
  nova: {
    eyebrow: 'Product Line',
    headline: 'NEXUS Nova',
    subheadline: 'Compact autonomous platforms for research labs, education, and rapid prototyping.',
    primaryCta: { label: 'Explore SDK', path: websiteRoutes.docsSdk.path },
    secondaryCta: { label: 'Join Beta', path: websiteRoutes.publicBeta.path },
    features: [
      { title: 'Lightweight stack', description: 'Run behaviors and simulation on resource-constrained hardware.' },
      { title: 'Developer-first', description: 'Full SDK, visual builder, and cloud sync from day one.' },
      { title: 'Fleet-ready', description: 'Provision, monitor, and update Nova-class robots from NEXUS Cloud.' },
    ],
    relatedLinks: [
      { label: 'Robots overview', path: websiteRoutes.robots.path },
      { label: 'Documentation', path: websiteRoutes.docs.path },
    ],
  },
  sentinel: {
    eyebrow: 'Product Line',
    headline: 'NEXUS Sentinel',
    subheadline: 'Perception-forward platforms for monitoring, inspection, and security applications.',
    primaryCta: { label: 'Vision docs', path: `${websiteRoutes.docsSdk.path}/vision` },
    secondaryCta: { label: 'Marketplace', path: routes.marketplace.path },
    features: [
      { title: 'Perception pipeline', description: 'SLAM, object detection, and sensor fusion via NEXUS SDK.' },
      { title: 'Mission control', description: 'Plan patrols and monitor live telemetry from Command Center.' },
      { title: 'Trust & safety', description: 'Behavior certification and moderation before deployment.' },
    ],
    relatedLinks: [
      { label: 'Atlas platform', path: routes.atlas.path },
      { label: 'Community', path: websiteRoutes.community.path },
    ],
  },
  studio: {
    eyebrow: 'Platform',
    headline: 'NEXUS Studio',
    subheadline: 'Design behaviors, simulate in the digital twin, and operate the full robotics stack from one desktop IDE.',
    primaryCta: { label: 'Download Studio', path: websiteRoutes.downloadMarketing.path },
    secondaryCta: { label: 'Visual development', path: websiteRoutes.visualDevHub.path },
    features: [
      { title: 'Visual behavior builder', description: 'Drag-and-drop graphs with simulation and replay.' },
      { title: 'Digital twin', description: 'Validate Atlas-class systems before hardware exists.' },
      { title: 'Command Center', description: 'CMS, marketplace, engineering, and ops in one shell.' },
    ],
    relatedLinks: [
      { label: 'Developer portal', path: routes.developerPortal.path },
      { label: 'Pricing', path: websiteRoutes.pricing.path },
    ],
  },
  about: {
    headline: 'About NEXUS',
    subheadline: 'We are building the unified operating system for robotics — software, cloud, and community first.',
    features: [
      { title: 'Mission', description: 'Make robotics development as accessible as modern software engineering.' },
      { title: 'Approach', description: 'One design language, one SDK, one cloud platform, many robots.' },
      { title: 'Commitment', description: 'Open ecosystem with marketplace economics and sponsor partnerships.' },
    ],
    relatedLinks: [
      { label: 'Our mission', path: websiteRoutes.mission.path },
      { label: 'Our vision', path: websiteRoutes.vision.path },
      { label: 'Careers', path: websiteRoutes.careers.path },
    ],
  },
  mission: {
    headline: 'Our Mission',
    subheadline: 'Make robotics development as accessible, reliable, and collaborative as modern software engineering.',
    features: [
      { title: 'Developer-first', description: 'SDK, CLI, visual builder, and cloud APIs designed for daily engineering workflows.' },
      { title: 'Safety by design', description: 'Behavior certification, permission audits, and simulation before deployment.' },
      { title: 'Open ecosystem', description: 'Marketplace economics, sponsor partnerships, and community programs that reward builders.' },
    ],
    primaryCta: { label: 'Developer onboarding', path: websiteRoutes.developerOnboarding.path },
    secondaryCta: { label: 'Join public beta', path: websiteRoutes.publicBeta.path },
    relatedLinks: [
      { label: 'Vision', path: websiteRoutes.vision.path },
      { label: 'Technology', path: websiteRoutes.technology.path },
    ],
  },
  vision: {
    headline: 'Vision',
    subheadline: 'A world where every team can design, simulate, and deploy capable robots without fragmented tooling.',
    features: [
      { title: 'Unified experience', description: 'Website, Studio, SDK, and cloud share one identity and workflow.' },
      { title: 'Atlas program', description: 'Hardware planning grounded in digital twin validation — no vaporware claims.' },
      { title: 'Ecosystem growth', description: 'Developers publish behaviors; sponsors accelerate adoption.' },
    ],
  },
  technology: {
    headline: 'Technology',
    subheadline: 'Cloud-native architecture spanning behavior runtime, simulation, intelligence, and fleet operations.',
    features: [
      { title: 'NEXUS Cloud', description: 'Auth, sync, marketplace, billing, and Command Center APIs.' },
      { title: 'NEXUS OS', description: 'On-robot runtime with ROS bridge, modules, and cloud sync.' },
      { title: 'Intelligence', description: 'Copilot, RAG, and autonomous workflows with governance.' },
    ],
    primaryCta: { label: 'Architecture docs', path: websiteRoutes.docsArchitecture.path },
  },
  atlas: {
    eyebrow: 'Hardware Program',
    headline: 'NEXUS Atlas',
    subheadline: 'Humanoid robotics program grounded in digital twin validation — alpha software, engineering hubs, and manufacturing readiness.',
    primaryCta: { label: 'Atlas Alpha Guide', path: websiteRoutes.learningCenter.path },
    secondaryCta: { label: 'Public Beta', path: websiteRoutes.publicBeta.path },
    features: [
      { title: 'Digital twin first', description: 'Validate kinematics, behaviors, and safety scenarios before hardware exists.' },
      { title: 'Alpha release channel', description: 'Studio, SDK, CLI, and firmware packages with verified checksums.' },
      { title: 'Engineering hub', description: 'Hardware registry, prototype tracking, and manufacturing validation tooling.' },
    ],
    relatedLinks: [
      { label: 'Demo projects', path: websiteRoutes.demoProjects.path },
      { label: 'Atlas engineering', path: websiteRoutes.atlasEngineeringHub.path },
    ],
  },
  developers: {
    eyebrow: 'Developer Platform',
    headline: 'Developers',
    subheadline: 'Build, validate, and publish robotics software with the NEXUS SDK, developer portal, and cloud platform.',
    primaryCta: { label: 'SDK documentation', path: websiteRoutes.docsSdk.path },
    secondaryCta: { label: 'Developer onboarding', path: websiteRoutes.developerOnboarding.path },
    features: [
      { title: 'NEXUS SDK & CLI', description: 'init, validate, package, publish, and connect validate workflows.' },
      { title: 'Developer Portal', description: 'Projects, API keys, behaviors, simulation jobs, and marketplace uploads.' },
      { title: 'Beta & community', description: 'Public beta access, hackathons, reputation, and example library.' },
    ],
    relatedLinks: [
      { label: 'Documentation hub', path: websiteRoutes.docs.path },
      { label: 'Marketplace', path: routes.marketplace.path },
      { label: 'Pricing', path: websiteRoutes.pricing.path },
    ],
  },
  sponsors: {
    eyebrow: 'Partnerships',
    headline: 'Sponsors',
    subheadline: 'Accelerate robotics adoption through sponsor tiers, roadmap access, and ecosystem visibility.',
    primaryCta: { label: 'View sponsorship tiers', path: routes.sponsorTiers.path },
    secondaryCta: { label: 'Contact partnerships', path: routes.contact.path },
    features: [
      { title: 'Tiered programs', description: 'Community, growth, and strategic tiers with tailored benefits.' },
      { title: 'Sponsor Portal', description: 'Partnership status, organization settings, billing, and roadmap access.' },
      { title: 'Ecosystem visibility', description: 'Featured placement, beta access, and co-marketing opportunities.' },
    ],
    relatedLinks: [
      { label: 'Investors', path: websiteRoutes.investors.path },
      { label: 'Sponsor onboarding', path: websiteRoutes.sponsorOnboarding.path },
    ],
  },
  robots: {
    headline: 'Robots',
    subheadline: 'Explore the NEXUS product lines — from research platforms to future Atlas humanoids.',
    features: [
      { title: 'Atlas', description: 'Alpha digital twin and hardware engineering program.' },
      { title: 'Sentinel', description: 'Perception and monitoring platforms.' },
      { title: 'Nova', description: 'Compact autonomous research robots.' },
    ],
    relatedLinks: [
      { label: 'Atlas', path: routes.atlas.path },
      { label: 'Sentinel', path: routes.sentinel.path },
      { label: 'Nova', path: routes.nova.path },
    ],
  },
  investors: {
    headline: 'Investors',
    subheadline: 'Partner with NEXUS as we scale the robotics operating system and marketplace economy.',
    features: [
      { title: 'Market opportunity', description: 'Robotics software lagging cloud-native developer experience.' },
      { title: 'Business model', description: 'SaaS, marketplace revenue share, and enterprise programs.' },
      { title: 'Traction', description: 'Public beta, sponsor pipeline, and developer ecosystem growth.' },
    ],
    primaryCta: { label: 'Contact us', path: routes.contact.path },
    secondaryCta: { label: 'Sponsor program', path: routes.sponsors.path },
  },
  careers: {
    headline: 'Careers',
    subheadline: 'Help build the platform robotics teams deserve — design, engineering, and developer relations.',
    features: [
      { title: 'Engineering', description: 'Cloud, Studio, OS runtime, simulation, and hardware program tooling.' },
      { title: 'Developer experience', description: 'SDK, docs, and community programs.' },
      { title: 'Operations', description: 'Sponsor success, marketplace, and launch operations.' },
    ],
    primaryCta: { label: 'Get in touch', path: routes.contact.path },
  },
  company: {
    headline: 'Company',
    subheadline: 'Learn about NEXUS Robotics — our story, technology, and team.',
    features: [
      { title: 'About', description: 'Who we are and why we build.' },
      { title: 'Vision', description: 'Where the ecosystem is heading.' },
      { title: 'Careers & investors', description: 'Join or partner with NEXUS.' },
    ],
    relatedLinks: [
      { label: 'About', path: websiteRoutes.about.path },
      { label: 'Vision', path: websiteRoutes.vision.path },
      { label: 'Technology', path: websiteRoutes.technology.path },
      { label: 'Careers', path: websiteRoutes.careers.path },
      { label: 'Investors', path: websiteRoutes.investors.path },
    ],
  },
  legal: {
    headline: 'Legal',
    subheadline: 'Policies governing use of the NEXUS platform and website.',
    relatedLinks: [
      { label: 'Privacy Policy', path: websiteRoutes.privacy.path },
      { label: 'Terms of Service', path: websiteRoutes.terms.path },
    ],
    features: [],
  },
  privacy: {
    headline: 'Privacy Policy',
    subheadline: 'How NEXUS collects, uses, and protects your data across website, cloud, and Studio.',
    features: [
      { title: 'Data we collect', description: 'Account, usage analytics, and support interactions.' },
      { title: 'Your controls', description: 'Export, deletion, and organization admin tools.' },
      { title: 'Security', description: 'Encryption in transit, hashed credentials, and audit logs.' },
    ],
  },
  terms: {
    headline: 'Terms of Service',
    subheadline: 'Terms for using NEXUS Cloud, Studio, SDK, and marketplace services.',
    features: [
      { title: 'Acceptable use', description: 'Safety, compliance, and marketplace content rules.' },
      { title: 'Subscriptions', description: 'Billing, refunds, and enterprise agreements.' },
      { title: 'IP & licensing', description: 'Behavior packages, marketplace publishing, and OSS components.' },
    ],
  },
  downloadMarketing: {
    headline: 'Downloads',
    subheadline: 'Get NEXUS Studio, the SDK, and documentation — built for production robotics teams.',
    primaryCta: { label: 'Download Studio', path: routes.login.path },
    secondaryCta: { label: 'SDK documentation', path: websiteRoutes.docsSdk.path },
    features: [
      { title: 'NEXUS Studio', description: 'Desktop IDE with digital twin and Command Center.' },
      { title: 'NEXUS SDK', description: 'Behavior, simulation, ROS, vision, and Atlas packages.' },
      { title: 'Release channels', description: 'Stable, beta, and alpha builds with verified checksums.' },
    ],
    relatedLinks: [
      { label: 'Release notes', path: websiteRoutes.releases.path },
      { label: 'Developer onboarding', path: websiteRoutes.developerOnboarding.path },
    ],
  },
} satisfies Record<string, ProductPageContent>
