import { createPlatformClient } from '@nexus/sdk-platform'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

function getAccessToken(): string | undefined {
  try {
    const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
    if (!key) return undefined
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    return (JSON.parse(raw) as { access_token?: string }).access_token
  } catch {
    return undefined
  }
}

function getOrganizationId(): string | undefined {
  return localStorage.getItem('nexus-organization-id') ?? undefined
}

export function createDeveloperPortalClient() {
  return createPlatformClient({
    cloudBaseUrl: CLOUD_URL,
    accessToken: getAccessToken(),
    organizationId: getOrganizationId(),
  })
}

export async function developerFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken()
  if (!token) throw new Error('Sign in required')
  const orgId = getOrganizationId()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...(orgId ? { 'X-Organization-Id': orgId } : {}),
  }
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function listOrganizations() {
  const data = await developerFetch<{ organizations: Array<{ id: string; name: string; slug: string }> }>(
    '/v1/organizations',
  )
  return data.organizations
}

export async function listApiKeys(organizationId: string) {
  const data = await developerFetch<{
    apiKeys: Array<{ id: string; name: string; keyPrefix: string; scopes: string[]; environment: string; createdAt: string }>
  }>(`/v1/organizations/${organizationId}/api-keys`)
  return data.apiKeys
}

export async function createApiKey(organizationId: string, name: string, environment = 'development') {
  const data = await developerFetch<{
    apiKey: { id: string; name: string; keyPrefix: string; secret: string; scopes: string[]; environment: string }
  }>(`/v1/organizations/${organizationId}/api-keys`, {
    method: 'POST',
    body: JSON.stringify({ name, environment }),
  })
  return data.apiKey
}

export async function revokeApiKey(organizationId: string, keyId: string) {
  await developerFetch(`/v1/organizations/${organizationId}/api-keys/${keyId}/revoke`, { method: 'POST' })
}

export async function fetchMarketplaceListings() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/marketplace/listings`)
  if (!res.ok) throw new Error('Failed to load marketplace listings')
  const data = (await res.json()) as {
    listings: Array<{
      id: string
      packageName: string
      packageSlug: string
      version: string
      publishedAt?: string | null
    }>
  }
  return data.listings
}

export async function submitSponsorApplication(input: {
  organizationName: string
  contactName: string
  email: string
  message: string
}) {
  return developerFetch('/v1/beta/sponsors/applications', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function registerDeveloper(organizationId: string, displayName: string) {
  return developerFetch('/v1/developers/register', {
    method: 'POST',
    body: JSON.stringify({ organizationId, displayName }),
  })
}

export async function fetchDeveloperAnalytics(organizationId: string) {
  return developerFetch(`/v1/organizations/${organizationId}/analytics`)
}

export async function fetchDeveloperDashboard(organizationId: string) {
  return developerFetch<{ dashboard: Record<string, unknown> }>(`/v1/organizations/${organizationId}/developer/dashboard`)
}

export async function fetchDeveloperActivity(organizationId: string) {
  return developerFetch<{
    activity: Array<{ id: string; eventType: string; summary: string; resource: string; createdAt: string }>
  }>(`/v1/organizations/${organizationId}/developer/activity`)
}

export async function fetchDeveloperTemplates() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/developer/templates`)
  if (!res.ok) throw new Error('Failed to load templates')
  const data = (await res.json()) as { templates: Array<{ id: string; kind: string; name: string }> }
  return data.templates
}

export async function fetchOpenApiSpec() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/developer/openapi.json`)
  if (!res.ok) throw new Error('Failed to load OpenAPI spec')
  return res.json() as Promise<Record<string, unknown>>
}

export async function fetchTutorials() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/developer/tutorials`)
  if (!res.ok) throw new Error('Failed to load tutorials')
  const data = (await res.json()) as { tutorials: Array<{ id: string; slug: string; title: string; description: string }> }
  return data.tutorials
}

export async function fetchTutorial(slug: string) {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/developer/tutorials/${slug}`)
  if (!res.ok) throw new Error('Failed to load tutorial')
  const data = (await res.json()) as { tutorial: { id: string; slug: string; title: string; steps: unknown[] } }
  return data.tutorial
}

export async function saveTutorialProgress(tutorialId: string, completedStepId: string, totalSteps: number) {
  return developerFetch(`/v1/developer/tutorials/${tutorialId}/progress`, {
    method: 'POST',
    body: JSON.stringify({ completedStepId, totalSteps }),
  })
}

export async function runPlaygroundCode(code: string) {
  const data = await developerFetch<{ session: { output: string } }>('/v1/developer/playground/run', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
  return data.session
}

export async function createSandboxOrganization(name: string) {
  const data = await developerFetch<{ organization: { id: string; name: string; slug: string } }>(
    '/v1/developer/sandbox',
    { method: 'POST', body: JSON.stringify({ name }) },
  )
  return data.organization
}

export async function listSandboxOrganizations() {
  const data = await developerFetch<{
    sandboxes: Array<{ organizations: { id: string; name: string; slug: string } }>
  }>('/v1/developer/sandbox')
  return data.sandboxes
}

export async function submitMarketplaceListing(organizationId: string, behaviorPackageVersionId: string) {
  const listing = await developerFetch<{ id: string }>(
    `/v1/organizations/${organizationId}/marketplace/listings`,
    {
      method: 'POST',
      body: JSON.stringify({ behaviorPackageVersionId, visibility: 'public' }),
    },
  )
  await developerFetch(`/v1/organizations/${organizationId}/marketplace/listings/${listing.id}/submit`, {
    method: 'POST',
  })
  return listing
}

export async function listOrgBehaviors(organizationId: string) {
  const data = await developerFetch<{ packages: Array<{ id: string; name: string; packageSlug: string }> }>(
    `/v1/organizations/${organizationId}/behaviors`,
  )
  return data.packages
}

export async function listOrgBehaviorVersions(organizationId: string) {
  const packages = await listOrgBehaviors(organizationId)
  if (!packages[0]) return []
  const data = await developerFetch<{
    versions: Array<{ id: string; version: string; status: string; createdAt: string }>
  }>(`/v1/organizations/${organizationId}/behaviors/${packages[0].id}/versions`)
  return data.versions
}

export async function verifyPackage(organizationId: string, contentHash: string, signature: string) {
  return developerFetch(`/v1/organizations/${organizationId}/developer/packages/verify`, {
    method: 'POST',
    body: JSON.stringify({ contentHash, signature }),
  })
}

export async function requestCertification(organizationId: string, behaviorPackageVersionId: string) {
  return developerFetch(`/v1/organizations/${organizationId}/developer/certifications`, {
    method: 'POST',
    body: JSON.stringify({ behaviorPackageVersionId }),
  })
}
