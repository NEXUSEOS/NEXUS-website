export { ecosystemOwnership, validateOwnership, getFeaturesByOwner } from './ownership'
export type { FeatureOwnership } from './ownership'
export {
  designApprovalPipeline,
  governedFutureUis,
  designGovernanceRules,
  currentWebsiteCompliance,
} from './design-governance'

export const architectureDocs = [
  {
    id: 'behavior-package',
    title: 'Behavior Package Specification',
    description: 'behavior.json schema, directory layout, validation, and versioning.',
    owner: 'nexus-sdk',
  },
  {
    id: 'marketplace-pipeline',
    title: 'Marketplace Pipeline',
    description: 'Registry, publishing flow, review, compatibility, and updates.',
    owner: 'nexus-marketplace',
  },
  {
    id: 'sdk-cli',
    title: 'SDK CLI Specification',
    description: 'nexus init through nexus update command architecture.',
    owner: 'nexus-sdk',
  },
  {
    id: 'digital-twin',
    title: 'Digital Twin Interfaces',
    description: 'Robot, sensor, physics, runtime, and telemetry interfaces.',
    owner: 'nexus-sdk',
  },
  {
    id: 'ecosystem-ownership',
    title: 'Ecosystem Ownership',
    description: 'Feature ownership validation across NEXUS repositories.',
    owner: 'nexus-specifications',
  },
  {
    id: 'design-governance',
    title: 'Design Governance',
    description: 'Design approval pipeline, governed UIs, and compliance rules.',
    owner: 'nexus-specifications',
  },
  {
    id: 'unified-platform',
    title: 'Unified Platform Integration',
    description: 'Platform layer, event bus, workflow engine, and cross-repository orchestration.',
    owner: 'nexus-platform',
  },
] as const

export type ArchitectureDocId = (typeof architectureDocs)[number]['id']

export function getArchitectureDoc(id: string) {
  return architectureDocs.find((doc) => doc.id === id)
}
