import {
  createPlatformIntegrationClient,
  createStubIntegrationClient,
  ECOSYSTEM_REPOS,
  INTEGRATION_FEATURES,
} from '@nexus/integration'
import { createPlatformLayer } from '@nexus/platform'
import type { PlatformIntegrationClient } from '@nexus/integration'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export { ECOSYSTEM_REPOS, INTEGRATION_FEATURES, createPlatformLayer }

function isOfflineDevMode(): boolean {
  return import.meta.env.DEV && localStorage.getItem('NEXUS_OFFLINE_DEV') === '1'
}

export function isProduction(): boolean {
  return import.meta.env.PROD
}

export function getWebsiteIntegrationClient(accessToken?: string, organizationId?: string): PlatformIntegrationClient {
  if (!accessToken) {
    if (isOfflineDevMode()) return createStubIntegrationClient({ organizationId })
    throw new Error('Authentication required for platform integration')
  }
  return createPlatformIntegrationClient({
    cloudBaseUrl: CLOUD_URL,
    accessToken,
    organizationId,
  })
}

export async function fetchEcosystemStatus(accessToken?: string) {
  const client = getWebsiteIntegrationClient(accessToken)
  return client.getEcosystemStatus()
}

export async function fetchSdkDownloads(accessToken?: string, version?: string) {
  const client = getWebsiteIntegrationClient(accessToken)
  return client.listSdkDownloads(version)
}

export async function fetchUpdateManifest(
  product?: 'website' | 'studio' | 'sdk' | 'os',
  accessToken?: string,
) {
  const client = getWebsiteIntegrationClient(accessToken)
  return client.listUpdates(product)
}

export async function fetchDeveloperProjects(accessToken: string, organizationId?: string) {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/integration/sync/pull`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organizationId,
      resourceType: 'project',
    }),
  })
  if (!res.ok) throw new Error(`Failed to load projects: ${res.status}`)
  const data = (await res.json()) as { records: Array<{ externalId: string; payload: Record<string, unknown>; version: number }> }
  return data.records.map((r) => ({
    id: r.externalId,
    name: String(r.payload.name ?? r.externalId),
    status: String(r.payload.status ?? 'Active'),
    version: r.version,
  }))
}
