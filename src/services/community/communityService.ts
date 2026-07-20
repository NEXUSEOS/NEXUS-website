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

async function communityFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/business/community${path}`, { ...init, headers })
  if (!res.ok) throw new Error(`Community API error ${res.status}`)
  return res.json() as Promise<T>
}

export async function fetchCommunityForums() {
  return communityFetch<{ forums: Array<{ id: string; name: string; description: string }> }>('/forums')
}

export async function fetchCommunityLeaderboard() {
  return communityFetch<{ leaderboard: Array<{ userId: string; displayName: string; points: number; rank: number }> }>('/leaderboard')
}

export async function fetchCommunityEvents() {
  return communityFetch<{ events: unknown[] }>('/events')
}

export async function fetchCommunityActivity() {
  return communityFetch<{ activity: unknown[] }>('/activity')
}
