import { websiteRoutes } from '../config/websiteRoutes'

export interface SdkDocSection {
  id: string
  title: string
  description: string
  path: string
  order: number
}

/** SDK documentation sections — maps to nexus-sdk ownership. */
export const sdkDocSections: SdkDocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Platform overview and first integration steps.',
    path: `${websiteRoutes.docsSdk.path}/getting-started`,
    order: 1,
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Install SDK packages and CLI tooling.',
    path: `${websiteRoutes.docsSdk.path}/installation`,
    order: 2,
  },
  {
    id: 'quick-start',
    title: 'Quick Start',
    description: 'Authenticate and call your first API.',
    path: `${websiteRoutes.docsSdk.path}/quick-start`,
    order: 3,
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'API keys, OAuth, and service credentials.',
    path: `${websiteRoutes.docsSdk.path}/authentication`,
    order: 4,
  },
  {
    id: 'robot-api',
    title: 'Robot API',
    description: 'Robot registry, provisioning, and status.',
    path: `${websiteRoutes.docsSdk.path}/robot-api`,
    order: 5,
  },
  {
    id: 'motion-api',
    title: 'Motion API',
    description: 'Motion commands and trajectory interfaces.',
    path: `${websiteRoutes.docsSdk.path}/motion-api`,
    order: 6,
  },
  {
    id: 'vision-api',
    title: 'Vision API',
    description: 'Perception pipelines and vision models.',
    path: `${websiteRoutes.docsSdk.path}/vision-api`,
    order: 7,
  },
  {
    id: 'speech-api',
    title: 'Speech API',
    description: 'Speech recognition and synthesis hooks.',
    path: `${websiteRoutes.docsSdk.path}/speech-api`,
    order: 8,
  },
  {
    id: 'behavior-api',
    title: 'Behavior API',
    description: 'Behavior schema, versioning, and publishing.',
    path: `${websiteRoutes.docsSdk.path}/behavior-api`,
    order: 9,
  },
  {
    id: 'simulation-api',
    title: 'Simulation API',
    description: 'Simulation jobs and digital twin integration.',
    path: `${websiteRoutes.docsSdk.path}/simulation-api`,
    order: 10,
  },
  {
    id: 'cloud-api',
    title: 'Cloud API',
    description: 'NEXUS cloud service endpoints.',
    path: `${websiteRoutes.docsSdk.path}/cloud-api`,
    order: 11,
  },
  {
    id: 'fleet-api',
    title: 'Fleet API',
    description: 'Fleet coordination and multi-robot operations.',
    path: `${websiteRoutes.docsSdk.path}/fleet-api`,
    order: 12,
  },
  {
    id: 'ota-api',
    title: 'OTA API',
    description: 'Over-the-air updates and firmware delivery.',
    path: `${websiteRoutes.docsSdk.path}/ota-api`,
    order: 13,
  },
  {
    id: 'cli',
    title: 'CLI',
    description: 'NEXUS command-line interface reference.',
    path: `${websiteRoutes.docsSdk.path}/cli`,
    order: 14,
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Runnable SDK examples and integration patterns.',
    path: `${websiteRoutes.docsSdk.path}/examples`,
    order: 15,
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Project and behavior scaffolds from nexus-sdk.',
    path: `${websiteRoutes.docsSdk.path}/templates`,
    order: 16,
  },
]

export function getSdkDocSection(id: string): SdkDocSection | undefined {
  return sdkDocSections.find((section) => section.id === id)
}
