import { useLocation } from 'react-router-dom'
import { developerPlatformSections } from '../../config/developerPlatform'
import { routes } from '../../config/routes'
import { PlatformFeaturePage } from '../../components/platform'
import NotFound from '../NotFound/NotFound'

const capabilityMap: Record<string, string[]> = {
  applications: [
    'Register OAuth applications and redirect URIs',
    'Manage client credentials and scopes',
    'Audit application usage via Developer Analytics',
  ],
  organizations: [
    'Create team workspaces with role boundaries',
    'Invite members and assign developer roles',
    'Link billing and resource quotas',
  ],
  'robot-registry': [
    'Register robots with cloud provisioning tokens',
    'Track firmware version and connectivity status',
    'Assign robots to projects and fleets',
  ],
  behaviors: [
    'Create and edit behavior drafts',
    'Version, clone, publish, and archive behaviors',
    'Define metadata for sensors, hardware, and safety level',
  ],
  simulation: [
    'Queue simulation jobs for behavior validation',
    'Review simulation logs and metrics',
    'Promote validated behaviors to publish workflow',
  ],
  marketplace: [
    'Upload skills, AI models, and distributable packages',
    'Manage review status and versioning',
    'Connect to nexus-marketplace publishing pipeline',
  ],
  releases: [
    'Audit SDK, behavior, and application releases',
    'Compare version history across products',
    'Export release manifests for compliance',
  ],
  analytics: [
    'Portal visit and download metrics',
    'API usage summaries per application',
    'Integration with @nexus/analytics service',
  ],
}

const relatedLinksMap: Record<string, { label: string; path: string }[]> = {
  applications: [
    { label: 'API Keys', path: routes.developerPortalApiKeys.path },
    { label: 'SDK Docs', path: routes.docsSdk.path },
  ],
  behaviors: [
    { label: 'Behavior API', path: `${routes.docsSdk.path}/behavior-api` },
    { label: 'Create Behavior', path: routes.developerPortalBehaviorNew.path },
  ],
  'robot-registry': [{ label: 'Robot API', path: `${routes.docsSdk.path}/robot-api` }],
  analytics: [{ label: 'Dashboard', path: routes.developerPortal.path }],
}

export default function DeveloperPlatformFeature() {
  const { pathname } = useLocation()
  const section = developerPlatformSections.find((item) => item.path === pathname)

  if (!section || section.id === 'projects' || section.id === 'sdk-downloads' || section.id === 'api-keys') {
    return <NotFound />
  }

  return (
    <PlatformFeaturePage
      title={section.title}
      description={section.description}
      status={section.status}
      capabilities={capabilityMap[section.id] ?? ['Architecture preview']}
      relatedLinks={relatedLinksMap[section.id]}
    />
  )
}
