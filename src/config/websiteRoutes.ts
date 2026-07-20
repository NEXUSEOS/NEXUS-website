import type { RouteConfig } from '@nexus/config'

/** Website-owned routes — documentation, content, SDK, and extended developer platform. */
export const websiteRoutes = {
  docs: {
    path: '/docs',
    title: 'Documentation',
    description: 'NEXUS platform documentation — SDK, API reference, tutorials, and guides.',
  },
  docsSdk: {
    path: '/docs/sdk',
    title: 'SDK Documentation',
    description: 'NEXUS SDK documentation — installation, authentication, and API references.',
  },
  docsApi: {
    path: '/docs/api',
    title: 'API Reference',
    description: 'NEXUS platform API reference for developers and integrators.',
  },
  docsTutorials: {
    path: '/docs/tutorials',
    title: 'Tutorials',
    description: 'Step-by-step NEXUS platform tutorials for robotics development.',
  },
  docsGuides: {
    path: '/docs/guides',
    title: 'Guides',
    description: 'In-depth NEXUS platform guides for production deployments.',
  },
  docsExamples: {
    path: '/docs/examples',
    title: 'Examples',
    description: 'NEXUS SDK and platform code examples.',
  },
  blog: {
    path: '/blog',
    title: 'Blog',
    description: 'NEXUS engineering blog — platform updates, robotics, and ecosystem news.',
  },
  releases: {
    path: '/releases',
    title: 'Release Notes',
    description: 'NEXUS platform release notes and version history.',
  },
  changelog: {
    path: '/changelog',
    title: 'Changelog',
    description: 'Detailed NEXUS platform changelog across all products.',
  },
  docsArchitecture: {
    path: '/docs/architecture',
    title: 'Architecture',
    description: 'Behavior packages, marketplace pipeline, SDK CLI, and Digital Twin specifications.',
  },
  developerPortalApplications: {
    path: '/developers/portal/applications',
    title: 'Applications',
    description: 'Manage NEXUS platform applications and OAuth clients.',
  },
  developerPortalOrganizations: {
    path: '/developers/portal/organizations',
    title: 'Organizations',
    description: 'Manage developer organizations and team membership.',
  },
  developerPortalRobotRegistry: {
    path: '/developers/portal/robot-registry',
    title: 'Robot Registry',
    description: 'Register and manage robots connected to the NEXUS cloud platform.',
  },
  developerPortalBehaviors: {
    path: '/developers/portal/behaviors',
    title: 'Behavior Library',
    description: 'Create, version, and publish robot behaviors — architecture preview.',
  },
  developerPortalBehaviorNew: {
    path: '/developers/portal/behaviors/new',
    title: 'Create Behavior',
    description: 'Create a new robot behavior draft in the NEXUS Behavior Workspace.',
  },
  developerPortalSimulation: {
    path: '/developers/portal/simulation',
    title: 'Simulation Jobs',
    description: 'Schedule and monitor NEXUS simulation jobs for behavior validation.',
  },
  developerPortalMarketplaceUploads: {
    path: '/developers/portal/marketplace-uploads',
    title: 'Marketplace Uploads',
    description: 'Publish skills, models, and packages to the NEXUS Marketplace.',
  },
  developerPortalReleaseHistory: {
    path: '/developers/portal/release-history',
    title: 'Release History',
    description: 'Developer release history across SDK, behaviors, and applications.',
  },
  developerPortalAnalytics: {
    path: '/developers/portal/analytics',
    title: 'Developer Analytics',
    description: 'Usage analytics for your NEXUS developer account and applications.',
  },
  developerPortalApiExplorer: {
    path: '/developers/portal/api-explorer',
    title: 'API Explorer',
    description: 'Interactive REST API explorer with OpenAPI.',
  },
  developerPortalSdkExplorer: {
    path: '/developers/portal/sdk-explorer',
    title: 'SDK Explorer',
    description: 'Try SDK client methods in the browser.',
  },
  developerPortalPlayground: {
    path: '/developers/portal/playground',
    title: 'Developer Playground',
    description: 'Run safe SDK validation snippets.',
  },
  developerPortalTutorials: {
    path: '/developers/portal/tutorials',
    title: 'Interactive Tutorials',
    description: 'Step-by-step developer tutorials.',
  },
  developerPortalSdkWizard: {
    path: '/developers/portal/sdk-wizard',
    title: 'SDK Wizard',
    description: 'Guided SDK onboarding wizard.',
  },
  developerPortalBeta: {
    path: '/developers/portal/beta',
    title: 'Beta Dashboard',
    description: 'NEXUS Beta Program dashboard — applications, feedback, and release channels.',
  },
  developerPortalInvitations: {
    path: '/developers/portal/invitations',
    title: 'Developer Invitations',
    description: 'Invite external developers to your NEXUS organization.',
  },
  developerPortalFeedback: {
    path: '/developers/portal/feedback',
    title: 'Feedback Center',
    description: 'Submit and review beta program feedback.',
  },
  developerPortalBugReport: {
    path: '/developers/portal/bug-report',
    title: 'Bug Reporting',
    description: 'Report defects found during the NEXUS Beta Program.',
  },
  developerPortalCrashes: {
    path: '/developers/portal/crashes',
    title: 'Crash Analytics',
    description: 'Aggregated crash analytics from Studio and OS runtimes.',
  },
  betaApply: {
    path: '/beta/apply',
    title: 'Beta Application',
    description: 'Apply for the NEXUS Robotics Beta Program.',
  },
  publicBeta: {
    path: '/beta',
    title: 'Public Beta',
    description: 'NEXUS public beta hub — onboarding, demos, and Atlas Alpha.',
  },
  customerOnboarding: {
    path: '/customers/onboarding',
    title: 'Customer Onboarding',
    description: 'Get started as a NEXUS customer.',
  },
  learningCenter: {
    path: '/learning',
    title: 'Learning Center',
    description: 'Guides, videos, and training for NEXUS.',
  },
  demoProjects: {
    path: '/demos',
    title: 'Demo Projects',
    description: 'Sample robot and behavior projects.',
  },
  developerOnboarding: {
    path: '/developers/onboarding',
    title: 'Developer Onboarding',
    description: 'Get started with NEXUS — account, downloads, docs, and portal.',
  },
  community: {
    path: '/community',
    title: 'Community',
    description: 'Join the NEXUS Robotics developer and sponsor community.',
  },
  sponsorOnboarding: {
    path: '/sponsors/onboarding',
    title: 'Sponsor Onboarding',
    description: 'Get started as a NEXUS sponsor — tiers, application, and portal access.',
  },
  support: {
    path: '/support',
    title: 'Support Center',
    description: 'Help, knowledge base, feedback, and issue tracking for external users.',
  },
  knowledgeBase: {
    path: '/support/knowledge',
    title: 'Knowledge Base',
    description: 'Searchable help articles for developers and sponsors.',
  },
  feedbackPortal: {
    path: '/support/feedback',
    title: 'Feedback Portal',
    description: 'Submit product feedback for the NEXUS platform.',
  },
  issueTracking: {
    path: '/support/issues',
    title: 'Issue Tracking',
    description: 'Report and track issues during external launch.',
  },
  status: {
    path: '/status',
    title: 'System Status',
    description: 'Public operational status for NEXUS Cloud and services.',
  },
  launchChecklist: {
    path: '/launch/checklist',
    title: 'Launch Checklist',
    description: 'External launch quality gate and onboarding readiness.',
  },
  adminSetup: {
    path: '/admin/setup',
    title: 'Platform Setup',
    description: 'First-run NEXUS Setup Wizard for platform administrators.',
  },
  adminInstallation: {
    path: '/admin/installation',
    title: 'Installation Center',
    description: 'Unified first-run installation hub — setup progress, readiness, and required actions.',
  },
  admin: {
    path: '/admin',
    title: 'Platform Control Center',
    description: 'Complete platform administration — CMS, theme, services, jobs, events, deployment, monitoring, recovery.',
  },
  adminDeployment: {
    path: '/admin/deployment',
    title: 'Deployment',
    description: 'Production deployment, releases, canary status, and backup triggers.',
  },
  adminMonitoring: {
    path: '/admin/monitoring',
    title: 'Monitoring',
    description: 'Alert rules, metrics, traces, and incident signals.',
  },
  adminRecovery: {
    path: '/admin/recovery',
    title: 'Recovery',
    description: 'Backup snapshots, restore verification, and disaster recovery status.',
  },
  releaseChannels: {
    path: '/releases/channels',
    title: 'Release Channels',
    description: 'NEXUS release channels — Stable, Beta, Alpha, and Nightly.',
  },
  pricing: {
    path: '/pricing',
    title: 'Pricing',
    description: 'NEXUS platform plans — Starter, Pro, and Enterprise.',
  },
  waitlist: {
    path: '/waitlist',
    title: 'Launch Waitlist',
    description: 'Join the NEXUS developer or sponsor waitlist for public beta.',
  },
  checkoutSuccess: {
    path: '/checkout/success',
    title: 'Checkout Complete',
    description: 'Subscription checkout completed successfully.',
  },
  checkoutCancel: {
    path: '/checkout/cancel',
    title: 'Checkout Cancelled',
    description: 'Checkout was cancelled.',
  },
  developerPortalBilling: {
    path: '/developers/portal/billing',
    title: 'Developer Billing',
    description: 'Manage subscriptions, invoices, and licenses.',
  },
  developerPortalPayouts: {
    path: '/developers/portal/payouts',
    title: 'Developer Payouts',
    description: 'Marketplace revenue and Stripe Connect payouts.',
  },
  developerPortalActivity: {
    path: '/developers/portal/activity',
    title: 'Activity Feed',
    description: 'Developer workflow and publishing activity.',
  },
  developerPortalAiAssistant: {
    path: '/developers/portal/ai-assistant',
    title: 'AI Code Assistant',
    description: 'Developer copilot and AI behavior generator.',
  },
  unifiedCopilot: {
    path: '/copilot',
    title: 'NEXUS AI Copilot',
    description: 'Unified intelligence layer with role-based assistants and autonomous workflows.',
  },
  visualDevHub: {
    path: '/visual-dev',
    title: 'Visual Robot Development',
    description: 'Visual behavior builder, simulation jobs, and cloud-backed development hub.',
  },
  atlasEngineeringHub: {
    path: '/atlas-engineering',
    title: 'Atlas Hardware Engineering',
    description: 'Hardware registry, prototype tracking, and manufacturing readiness for future Atlas robots.',
  },
  developerPortalCertification: {
    path: '/developers/portal/certification',
    title: 'Certification Dashboard',
    description: 'Submit and track behavior package certification.',
  },
  developerPortalExamples: {
    path: '/developers/portal/examples',
    title: 'Example Library',
    description: 'Curated SDK examples and robot templates.',
  },
  developerPortalReputation: {
    path: '/developers/portal/reputation',
    title: 'Developer Reputation',
    description: 'Achievements, leaderboards, and reputation tiers.',
  },
  developerPortalCodeGenerator: {
    path: '/developers/portal/code-generator',
    title: 'Code Generator',
    description: 'Generate handlers, tests, and ROS bridge stubs.',
  },
  sponsorPortalBilling: {
    path: '/sponsors/portal/billing',
    title: 'Sponsor Billing',
    description: 'Sponsor agreements and tier billing.',
  },
  company: {
    path: '/company',
    title: 'Company',
    description: 'About NEXUS Robotics — story, team, careers, and investors.',
  },
  about: {
    path: '/about',
    title: 'About',
    description: 'About NEXUS Robotics — mission, approach, and commitment to the robotics ecosystem.',
  },
  vision: {
    path: '/vision',
    title: 'Vision',
    description: 'The NEXUS vision for unified robotics development and deployment.',
  },
  mission: {
    path: '/mission',
    title: 'Mission',
    description: 'The NEXUS mission — accessible, safe, and collaborative robotics development.',
  },
  news: {
    path: '/news',
    title: 'News',
    description: 'NEXUS platform news — engineering updates, releases, and ecosystem announcements.',
  },
  technology: {
    path: '/technology',
    title: 'Technology',
    description: 'NEXUS platform technology — cloud, OS, intelligence, and digital twin.',
  },
  robots: {
    path: '/robots',
    title: 'Robots',
    description: 'NEXUS robot product lines — Atlas, Sentinel, and Nova.',
  },
  investors: {
    path: '/investors',
    title: 'Investors',
    description: 'Invest in the NEXUS robotics operating system and marketplace.',
  },
  careers: {
    path: '/careers',
    title: 'Careers',
    description: 'Careers at NEXUS Robotics — engineering, developer experience, and operations.',
  },
  legal: {
    path: '/legal',
    title: 'Legal',
    description: 'Legal policies for the NEXUS platform and website.',
  },
  privacy: {
    path: '/legal/privacy',
    title: 'Privacy Policy',
    description: 'NEXUS privacy policy — data collection, use, and your controls.',
  },
  terms: {
    path: '/legal/terms',
    title: 'Terms of Service',
    description: 'NEXUS terms of service for cloud, Studio, SDK, and marketplace.',
  },
  downloadMarketing: {
    path: '/download',
    title: 'Downloads',
    description: 'Download NEXUS Studio, SDK, and platform documentation.',
  },
  sdkLanding: {
    path: '/sdk',
    title: 'NEXUS SDK',
    description: 'Build robotics applications with the NEXUS SDK — behavior, simulation, ROS, and cloud APIs.',
  },
} as const satisfies Record<string, RouteConfig>

/** Additional public routes surfaced in content navigation. */
export const websiteRouteList: RouteConfig[] = [
  websiteRoutes.docs,
  websiteRoutes.blog,
  websiteRoutes.releases,
  websiteRoutes.changelog,
  websiteRoutes.developerOnboarding,
  websiteRoutes.sponsorOnboarding,
  websiteRoutes.community,
  websiteRoutes.support,
  websiteRoutes.status,
  websiteRoutes.launchChecklist,
  websiteRoutes.releaseChannels,
  websiteRoutes.company,
  websiteRoutes.about,
  websiteRoutes.mission,
  websiteRoutes.news,
  websiteRoutes.robots,
  websiteRoutes.pricing,
  websiteRoutes.downloadMarketing,
  websiteRoutes.legal,
]
