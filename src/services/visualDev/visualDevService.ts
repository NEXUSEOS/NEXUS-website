import { developerFetch } from '../developer/developerPortalService'

export async function fetchVisualDevTemplates() {
  return developerFetch<{ templates: Array<{ id: string; name: string; kind: string; category: string }> }>('/v1/visual-dev/templates')
}

export async function fetchDeveloperCenterDashboard(organizationId?: string) {
  const q = organizationId ? `?organizationId=${encodeURIComponent(organizationId)}` : ''
  return developerFetch<{ dashboard: Record<string, unknown> }>(`/v1/command-center/visual-dev/developer-center${q}`)
}

export async function listGraphDrafts(organizationId: string) {
  return developerFetch<{ drafts: Array<{ id: string; graphId: string; name: string; updatedAt: string }> }>(
    `/v1/organizations/${organizationId}/visual-dev/graph-drafts`,
  )
}

export async function saveGraphDraft(organizationId: string, graphId: string, graph: unknown, name?: string) {
  return developerFetch<{ draft: unknown }>(
    `/v1/organizations/${organizationId}/visual-dev/graph-drafts/${encodeURIComponent(graphId)}`,
    { method: 'PUT', body: JSON.stringify({ graph, name }) },
  )
}

export async function runSimulationJob(organizationId: string, graphId?: string, config?: Record<string, unknown>) {
  return developerFetch<{ job: { id: string; status: string; result?: unknown } }>(
    `/v1/organizations/${organizationId}/visual-dev/simulation/jobs`,
    { method: 'POST', body: JSON.stringify({ graphId, config }) },
  )
}

export async function listSimulationJobs(organizationId: string) {
  return developerFetch<{ jobs: Array<{ id: string; status: string; graphId: string | null }> }>(
    `/v1/organizations/${organizationId}/visual-dev/simulation/jobs`,
  )
}

export async function oneClickPublishPackage(
  organizationId: string,
  input: { packageSlug: string; name: string; version: string; manifest: Record<string, unknown>; graph: unknown },
) {
  return developerFetch<{ result: unknown }>(
    `/v1/organizations/${organizationId}/visual-dev/publish`,
    { method: 'POST', body: JSON.stringify(input) },
  )
}

export async function fetchBehaviorAnalytics(organizationId: string) {
  return developerFetch<{ analytics: Record<string, unknown> }>(
    `/v1/command-center/visual-dev/behavior-analytics?organizationId=${encodeURIComponent(organizationId)}`,
  )
}

export async function fetchSimulationAnalytics(organizationId: string) {
  return developerFetch<{ analytics: Record<string, unknown> }>(
    `/v1/command-center/visual-dev/simulation-analytics?organizationId=${encodeURIComponent(organizationId)}`,
  )
}
