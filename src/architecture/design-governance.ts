/**
 * Design Approval Pipeline — governance for all future visual systems.
 * Applications may consume design; they may NOT create competing design systems.
 */

export const designApprovalPipeline = [
  {
    stage: 'Design Concept',
    owner: 'nexus-design-system',
    output: 'Component spec, motion spec, accessibility review, interaction rules',
  },
  {
    stage: 'Approval / ADR',
    owner: 'nexus-specifications',
    output: 'System-wide ADR when change affects multiple applications',
  },
  {
    stage: 'Platform Implementation',
    owner: 'nexus-platform',
    output: '@nexus/theme, @nexus/ui package release',
  },
  {
    stage: 'Application Consumption',
    owner: 'Application repos',
    output: 'Import packages — no local token or primitive replacements',
  },
] as const

/** Future UIs that MUST follow the design approval pipeline. */
export const governedFutureUis = [
  { name: 'Behavior Editor UI', owner: 'nexus-studio', status: 'planned' },
  { name: 'Marketplace UI', owner: 'nexus-marketplace', status: 'planned' },
  { name: 'Studio UI', owner: 'nexus-studio', status: 'incubating' },
  { name: 'Digital Twin UI', owner: 'nexus-studio', status: 'planned' },
] as const

export const designGovernanceRules = [
  'No visual system changes bypass nexus-design-system review.',
  'Applications consume @nexus/theme and @nexus/ui — never duplicate primitives.',
  'Motion and Aether effects follow nexus-design-system motion specifications.',
  'Accessibility standards defined in nexus-design-system apply to all governed UIs.',
  'Breaking visual changes require ADR and semver bump in nexus-platform packages.',
] as const

export const currentWebsiteCompliance = {
  theme: '@nexus/theme — globals.css and design tokens',
  ui: '@nexus/ui — Button, GlassPanel, Container, Section, Heading, Text',
  aether: '@nexus/aether — Hero background only',
  localCss: 'Layout and navigation spacing only — no competing token systems',
  status: 'compliant',
} as const
