const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

function getAccessToken(): string | undefined {
  try {
    const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
    if (!key) return undefined
    return (JSON.parse(localStorage.getItem(key) ?? '{}') as { access_token?: string }).access_token
  } catch {
    return undefined
  }
}

async function betaFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/public-beta${path}`, { ...init, headers })
  if (!res.ok) throw new Error(`Public beta API error ${res.status}`)
  return res.json() as Promise<T>
}

export async function fetchPublicBetaHub() {
  return betaFetch<{ hub: Record<string, unknown> }>('/hub')
}

export async function fetchLearningCenter(portal?: string) {
  const q = portal ? `?portal=${encodeURIComponent(portal)}` : ''
  return betaFetch<{ items: Array<{ title: string; slug: string; summary: string; url: string; itemType: string }> }>(`/learning${q}`)
}

export async function fetchDemoProjects(featured = false) {
  return betaFetch<{ projects: Array<{ slug: string; title: string; description: string; category: string; difficulty: string }> }>(
    `/demos${featured ? '?featured=true' : ''}`,
  )
}

export async function fetchFeaturedPackages() {
  return betaFetch<{ packages: unknown[] }>('/marketplace/featured')
}

export async function fetchRoadmapItems() {
  return betaFetch<{ items: Array<{ id: string; title: string; description: string; voteCount: number; status: string }> }>('/roadmap')
}

export async function voteRoadmapItem(itemId: string) {
  return betaFetch<{ voted: boolean }>(`/roadmap/${itemId}/vote`, { method: 'POST', body: '{}' })
}

export async function fetchChallenges() {
  return betaFetch<{ challenges: Array<{ slug: string; title: string; description: string; prizeSummary: string }> }>('/challenges')
}

export async function joinChallenge(slug: string, projectName?: string) {
  return betaFetch<{ challenge: unknown; entry: unknown }>(`/challenges/${slug}/join`, {
    method: 'POST',
    body: JSON.stringify({ projectName }),
  })
}

export async function fetchAtlasAlphaPackage() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/atlas-alpha/package`)
  return res.json() as Promise<{ package: Record<string, unknown> }>
}

export async function fetchCustomerOnboarding() {
  const token = getAccessToken()
  if (!token) throw new Error('Sign in required')
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/customers/onboarding`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json() as Promise<{ onboarding: { steps: Array<{ stepKey: string; completed: boolean }>; progressPercent: number } }>
}

export async function completeCustomerOnboardingStep(stepKey: string) {
  const token = getAccessToken()
  if (!token) throw new Error('Sign in required')
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/customers/onboarding/steps/${stepKey}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  return res.json()
}
