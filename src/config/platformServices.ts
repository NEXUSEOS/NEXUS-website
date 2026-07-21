/** EPIC 71 — Platform service catalog for Mission Control and Connection Orchestrator UI. */
export interface PlatformServiceDefinition {
  id: string
  name: string
  category: 'platform' | 'infrastructure' | 'commerce' | 'content' | 'ai' | 'robotics' | 'monitoring'
  connectionId?: string
  adminPath?: string
  owner: string
  description: string
}

/** All services listed in EPIC 71 — mapped to connection registry IDs where applicable. */
export const EPIC_PLATFORM_SERVICES: PlatformServiceDefinition[] = [
  { id: 'mission-control', name: 'Mission Control', category: 'platform', adminPath: '/admin', owner: 'nexus-cloud', description: 'Primary administrator homepage and KPI dashboard' },
  { id: 'command-center', name: 'Command Center', category: 'platform', adminPath: '/studio', owner: 'nexus-studio', description: 'Studio operations panels and wizard hub' },
  { id: 'connection-orchestrator', name: 'Connection Orchestrator', category: 'platform', connectionId: 'cloud-api', adminPath: '/admin/connections', owner: 'nexus-cloud', description: 'Live infrastructure connections and health matrix' },
  { id: 'installation-manager', name: 'Installation Manager', category: 'platform', adminPath: '/admin/installation', owner: 'nexus-cloud', description: 'First-run setup progress and readiness scoring' },
  { id: 'marketplace', name: 'Marketplace', category: 'commerce', connectionId: 'marketplace', adminPath: '/marketplace', owner: 'nexus-cloud', description: 'Package publishing and install pipeline' },
  { id: 'billing', name: 'Billing', category: 'commerce', connectionId: 'stripe', adminPath: '/pricing', owner: 'nexus-cloud', description: 'Subscriptions, sponsors, and Stripe Connect' },
  { id: 'auth', name: 'Auth', category: 'infrastructure', connectionId: 'supabase', adminPath: '/admin/secrets', owner: 'nexus-cloud', description: 'Supabase authentication and JWT' },
  { id: 'organizations', name: 'Organizations', category: 'platform', connectionId: 'cloud-api', adminPath: '/developers/portal/organizations', owner: 'nexus-cloud', description: 'Org membership and team management' },
  { id: 'user-profiles', name: 'User Profiles', category: 'platform', connectionId: 'supabase', owner: 'nexus-cloud', description: 'User profile storage and preferences' },
  { id: 'cms', name: 'CMS', category: 'content', connectionId: 'cloud-api', adminPath: '/admin/cms', owner: 'nexus-cloud', description: 'Visual CMS builder and published content' },
  { id: 'analytics', name: 'Analytics', category: 'monitoring', connectionId: 'posthog', adminPath: '/developers/portal/analytics', owner: 'nexus-website', description: 'Product analytics and portal metrics' },
  { id: 'executive-dashboard', name: 'Executive Dashboard', category: 'platform', adminPath: '/admin', owner: 'nexus-cloud', description: 'KPI engine and strategic planning' },
  { id: 'automation', name: 'Automation', category: 'platform', adminPath: '/admin/jobs', owner: 'nexus-cloud', description: 'Scheduled jobs, queues, and self-healing' },
  { id: 'ai-platform', name: 'AI Platform', category: 'ai', connectionId: 'openai', adminPath: '/copilot', owner: 'nexus-cloud', description: 'LLM services and copilot workflows' },
  { id: 'atlas-engineering', name: 'Atlas Engineering', category: 'robotics', adminPath: '/atlas-engineering', owner: 'nexus-studio', description: 'Hardware registry and manufacturing readiness' },
  { id: 'digital-twin', name: 'Digital Twin', category: 'robotics', connectionId: 'ros2', adminPath: '/atlas-engineering', owner: 'nexus-studio', description: 'Simulation and robot digital twin' },
  { id: 'sdk', name: 'SDK', category: 'platform', connectionId: 'sdk-cli', adminPath: '/sdk', owner: 'nexus-sdk', description: 'Developer SDK CLI and API key exchange' },
  { id: 'studio', name: 'Studio', category: 'platform', connectionId: 'studio', adminPath: '/studio', owner: 'nexus-studio', description: 'Desktop IDE and Command Center' },
  { id: 'cloud', name: 'Cloud', category: 'infrastructure', connectionId: 'cloud-api', adminPath: '/admin/config', owner: 'nexus-cloud', description: 'Central API gateway and platform hub' },
  { id: 'website', name: 'Website', category: 'platform', connectionId: 'website', adminPath: '/', owner: 'nexus-website', description: 'Public gateway and marketing site' },
  { id: 'github', name: 'GitHub', category: 'infrastructure', connectionId: 'github', adminPath: '/admin/deployment', owner: 'nexus-cloud', description: 'Source control and CI/CD' },
  { id: 'supabase', name: 'Supabase', category: 'infrastructure', connectionId: 'supabase', adminPath: '/admin/secrets', owner: 'nexus-cloud', description: 'Auth, profiles, and managed Postgres' },
  { id: 'storage', name: 'Storage', category: 'infrastructure', connectionId: 'object-storage', adminPath: '/admin/config', owner: 'nexus-cloud', description: 'Artifact and media object storage' },
  { id: 'cdn', name: 'CDN', category: 'infrastructure', connectionId: 'cloudflare', adminPath: '/admin/deployment', owner: 'nexus-cloud', description: 'Cloudflare CDN, DNS, and edge' },
  { id: 'production-apis', name: 'Production APIs', category: 'infrastructure', connectionId: 'cloud-api', adminPath: '/admin/monitoring', owner: 'nexus-cloud', description: 'Live production API endpoints and health probes' },
]

export function getPlatformService(id: string): PlatformServiceDefinition | undefined {
  return EPIC_PLATFORM_SERVICES.find((s) => s.id === id)
}
