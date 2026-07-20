/**
 * NEXUS Ecosystem Ownership Model — validation registry
 * Ensures features are documented under the correct owning repository.
 */

export interface FeatureOwnership {
  feature: string
  owner: string
  documentation?: string
  implementation?: string
}

export const ecosystemOwnership: FeatureOwnership[] = [
  { feature: 'Behavior Editor UI', owner: 'nexus-studio', documentation: 'nexus-website/docs' },
  { feature: 'Behavior Package Format', owner: 'nexus-sdk', documentation: 'nexus-sdk/docs/adr', implementation: '@nexus/sdk-behavior' },
  { feature: 'Behavior Validation', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior' },
  { feature: 'Behavior Engine', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior' },
  { feature: 'Behavior Runtime', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior', documentation: 'nexus-sdk/docs/adr/ADR-049-behavior-runtime.md' },
  { feature: 'Behavior Graph', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior' },
  { feature: 'Behavior Nodes', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior' },
  { feature: 'Behavior Execution', owner: 'nexus-sdk', implementation: '@nexus/sdk-behavior/runtime' },
  { feature: 'Visual Behavior Editor', owner: 'nexus-studio', documentation: 'nexus-studio/docs/adr/ADR-050-visual-behavior-graph.md' },
  { feature: 'Behavior Inspector', owner: 'nexus-studio', implementation: 'src/behavior/inspector' },
  { feature: 'Behavior Debugger', owner: 'nexus-studio', implementation: 'src/behavior/debugger' },
  { feature: 'Behavior Marketplace Integration', owner: 'nexus-cloud', implementation: '@nexus-cloud/behavior-registry' },
  { feature: 'Behavior Cloud Sync', owner: 'nexus-cloud', implementation: '@nexus-cloud/behavior-registry' },
  { feature: 'ROS Integration', owner: 'nexus-os', documentation: 'nexus-specifications/docs/adr/ADR-053-ros-integration.md', implementation: '@nexus-os/ros' },
  { feature: 'ROS SDK', owner: 'nexus-sdk', implementation: '@nexus/sdk-ros' },
  { feature: 'Studio ROS Tools', owner: 'nexus-studio', implementation: 'src/ros/' },
  { feature: 'Cloud Robot Services', owner: 'nexus-cloud', implementation: '@nexus-cloud/robot-services' },
  { feature: 'Perception Runtime', owner: 'nexus-os', documentation: 'nexus-specifications/docs/adr/ADR-057-perception-architecture.md', implementation: '@nexus-os/perception' },
  { feature: 'Vision SDK', owner: 'nexus-sdk', implementation: '@nexus/sdk-vision' },
  { feature: 'Studio Vision Tools', owner: 'nexus-studio', implementation: 'src/vision/' },
  { feature: 'Cloud Perception Services', owner: 'nexus-cloud', implementation: '@nexus-cloud/perception-services' },
  { feature: 'Motion Runtime', owner: 'nexus-os', documentation: 'nexus-specifications/docs/adr/ADR-061-motion-planning.md', implementation: '@nexus-os/motion' },
  { feature: 'Planning SDK', owner: 'nexus-sdk', implementation: '@nexus/sdk-planning' },
  { feature: 'Motion Studio', owner: 'nexus-studio', implementation: 'src/motion/' },
  { feature: 'Atlas Runtime', owner: 'nexus-os', documentation: 'nexus-specifications/docs/adr/ADR-065-atlas-alpha-architecture.md', implementation: '@nexus-os/atlas' },
  { feature: 'Atlas SDK', owner: 'nexus-sdk', implementation: '@nexus/sdk-atlas' },
  { feature: 'Atlas Studio', owner: 'nexus-studio', implementation: 'src/atlas/' },
  { feature: 'Atlas Cloud', owner: 'nexus-cloud', implementation: '@nexus-cloud/atlas-services' },
  { feature: 'Platform Integration', owner: 'nexus-platform', documentation: 'nexus-specifications/docs/adr/ADR-069-unified-platform.md', implementation: '@nexus/platform' },
  { feature: 'Integration SDK', owner: 'nexus-sdk', implementation: '@nexus/sdk-integration' },
  { feature: 'Studio Platform Integration', owner: 'nexus-studio', implementation: 'src/platform/' },
  { feature: 'Cloud Platform Integration', owner: 'nexus-cloud', implementation: '@nexus-cloud/platform-services' },
  { feature: 'Website Platform Integration', owner: 'nexus-website', implementation: 'src/services/platform/integrationService.ts' },
  { feature: 'Marketplace Publishing', owner: 'nexus-marketplace', documentation: 'nexus-website/src/marketplace' },
  { feature: 'Simulation Interfaces', owner: 'nexus-sdk', documentation: 'nexus-sdk/docs/adr', implementation: '@nexus/sdk-simulation' },
  { feature: 'Simulation Contracts', owner: 'nexus-sdk', documentation: 'nexus-sdk/docs/adr/ADR-046-simulation-sessions.md', implementation: '@nexus/sdk-simulation' },
  { feature: 'Physics Interfaces', owner: 'nexus-sdk', documentation: 'nexus-sdk/docs/adr/ADR-047-physics-provider-architecture.md', implementation: '@nexus/sdk-simulation' },
  { feature: 'Digital Twin Runtime', owner: 'nexus-studio', documentation: 'nexus-studio/docs/adr/ADR-045-digital-twin-runtime.md', implementation: 'src/twin/runtime/DigitalTwinRuntime.ts' },
  { feature: 'Digital Twin Interfaces', owner: 'nexus-sdk', documentation: 'nexus-sdk/packages/simulation', implementation: '@nexus/sdk-simulation' },
  { feature: 'Robot Models', owner: 'nexus-os', documentation: 'nexus-os/docs/adr/ADR-048-robot-model-pipeline.md', implementation: '@nexus-os/models' },
  { feature: 'Cloud Sync', owner: 'nexus-cloud', documentation: 'Deferred — twin session sync in EPIC 9+' },
  { feature: 'SDK CLI', owner: 'nexus-sdk', documentation: 'nexus-website/src/sdk/cli' },
  { feature: 'Behavior Workspace (preview)', owner: 'nexus-website', implementation: 'nexus-website/src/behavior' },
  { feature: 'Public Documentation', owner: 'nexus-website', implementation: 'nexus-website/docs' },
  { feature: 'Specifications / ADRs', owner: 'nexus-specifications', documentation: 'nexus-website/docs/adr (incubation)' },
  { feature: 'Shared UI', owner: 'nexus-platform', implementation: '@nexus/ui' },
  { feature: 'Design Tokens', owner: 'nexus-design-system', documentation: '@nexus/theme consumption' },
  { feature: 'Telemetry / Analytics', owner: 'nexus-cloud', documentation: '@nexus/analytics' },
  { feature: 'Beta Program', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta', documentation: 'nexus-website/docs/adr/ADR-037-beta-program.md' },
  { feature: 'Beta Dashboard UI', owner: 'nexus-website', implementation: 'nexus-website/src/pages/Beta' },
  { feature: 'Application System', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta' },
  { feature: 'Developer Invitations', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta' },
  { feature: 'Sponsor Dashboard', owner: 'nexus-website', implementation: 'nexus-website/src/pages/SponsorPortal' },
  { feature: 'Feedback Center', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta' },
  { feature: 'Bug Reporting', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta' },
  { feature: 'Crash Analytics', owner: 'nexus-cloud', implementation: '@nexus-cloud/beta' },
  { feature: 'Release Channels', owner: 'nexus-cloud', documentation: '@nexus/config releaseChannels' },
  { feature: 'Developer Onboarding', owner: 'nexus-website', implementation: 'nexus-website/src/pages/Onboarding' },
  { feature: 'Community', owner: 'nexus-website', implementation: 'nexus-website/src/pages/Community' },
]

export function validateOwnership(feature: string): FeatureOwnership | undefined {
  return ecosystemOwnership.find((entry) => entry.feature === feature)
}

export function getFeaturesByOwner(owner: string): FeatureOwnership[] {
  return ecosystemOwnership.filter((entry) => entry.owner === owner)
}
