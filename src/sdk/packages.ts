/** SDK package roadmap — owned by nexus-sdk; documented on nexus-website. */

export interface SdkPackage {
  name: string
  scope: string
  description: string
  status: 'planned' | 'alpha' | 'beta' | 'stable'
  repository: string
}

export const sdkPackages: SdkPackage[] = [
  {
    name: '@nexus/sdk-core',
    scope: 'core',
    description: 'Authentication, configuration, and shared client utilities.',
    status: 'beta',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-motion',
    scope: 'motion',
    description: 'Motion planning, trajectories, and kinematic primitives.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-vision',
    scope: 'vision',
    description: 'Camera pipelines, perception, and vision model interfaces.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-ai',
    scope: 'ai',
    description: 'Planning, reasoning, speech, and memory AI interfaces.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-cloud',
    scope: 'cloud',
    description: 'Cloud API client, telemetry ingestion, and fleet hooks.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-behavior',
    scope: 'behavior',
    description: 'Behavior schema, versioning, and publish workflows.',
    status: 'beta',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-fleet',
    scope: 'fleet',
    description: 'Multi-robot fleet management and coordination.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
  {
    name: '@nexus/sdk-simulation',
    scope: 'simulation',
    description: 'Simulation job scheduling and digital twin interfaces.',
    status: 'planned',
    repository: 'nexus-sdk',
  },
]

export function getSdkPackage(scope: string): SdkPackage | undefined {
  return sdkPackages.find((pkg) => pkg.scope === scope)
}
