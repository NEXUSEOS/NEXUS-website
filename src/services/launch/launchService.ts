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

async function launchFetch<T>(path: string, init?: RequestInit, auth = false): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getAccessToken()
  if (auth && token) headers.Authorization = `Bearer ${token}`
  const orgId = localStorage.getItem('nexus-organization-id')
  if (orgId) headers['X-Organization-Id'] = orgId

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}${path}`, { ...init, headers: { ...headers, ...init?.headers } })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Launch API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchLaunchOverview() {
  return launchFetch<{ overview: Record<string, unknown> }>('/v1/launch/overview', undefined, !!getAccessToken())
}

export async function fetchOnboarding(portal: 'developer' | 'sponsor') {
  return launchFetch<{ onboarding: { steps: Array<{ stepKey: string; step: number; completed: boolean }>; progressPercent: number } }>(
    `/v1/launch/onboarding/${portal}`,
    undefined,
    true,
  )
}

export async function completeOnboardingStep(portal: string, stepKey: string) {
  return launchFetch(`/v1/launch/onboarding/${portal}/steps/${stepKey}`, { method: 'POST' }, true)
}

export async function fetchKnowledgeArticles(query?: string, category?: string) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (category) params.set('category', category)
  const qs = params.toString()
  return launchFetch<{ articles: Array<{ slug: string; title: string; summary: string; category: string }> }>(
    `/v1/launch/knowledge${qs ? `?${qs}` : ''}`,
  )
}

export async function fetchKnowledgeArticle(slug: string) {
  return launchFetch<{ article: { slug: string; title: string; body: string; summary: string } }>(`/v1/launch/knowledge/${slug}`)
}

export async function fetchWelcomeTour(portal: string) {
  return launchFetch<{ steps: Array<{ stepKey: string; title: string; description: string }> }>(`/v1/launch/welcome-tour/${portal}`)
}

export async function fetchForumIntegrations() {
  return launchFetch<{ forums: Array<{ label: string; url: string; description: string; integrationType: string }> }>(
    '/v1/launch/community/forums',
  )
}

export async function fetchPublicStatus() {
  return launchFetch<{ status: { overall: string; components: Array<{ name: string; status: string; description: string }>; activeIncidents: unknown[] } }>(
    '/v1/launch/status',
  )
}

export async function fetchCloudReleases() {
  return launchFetch<{ releases: Array<{ product: string; version: string; channel: string; releaseNotes: string; publishedAt: string }> }>(
    '/v1/launch/releases',
  )
}

export async function createSupportTicket(input: { subject: string; body: string; category?: string; email?: string }) {
  return launchFetch('/v1/launch/support/tickets', { method: 'POST', body: JSON.stringify(input) }, !!getAccessToken())
}

export async function submitLaunchFeedback(input: { category: string; message: string; rating?: number }) {
  return launchFetch('/v1/launch/feedback', { method: 'POST', body: JSON.stringify(input) }, true)
}

export async function createLaunchIssue(input: { title: string; description: string; severity?: string }) {
  return launchFetch('/v1/launch/issues', { method: 'POST', body: JSON.stringify(input) }, !!getAccessToken())
}

export async function fetchLaunchIssues() {
  return launchFetch<{ issues: Array<{ id: string; title: string; status: string; severity: string; createdAt: string }> }>(
    '/v1/launch/issues',
    undefined,
    !!getAccessToken(),
  )
}

export async function fetchLaunchChecklist() {
  return launchFetch<{ run: { checks: Array<{ id: string; passed: boolean; detail: string }>; score: string; status: string } | null }>(
    '/v1/launch/checklist/latest',
  )
}
