const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export function getCloudUrl(): string {
  return CLOUD_URL.replace(/\/$/, '')
}

export function isCloudConfigured(): boolean {
  const url = import.meta.env.VITE_NEXUS_CLOUD_URL
  return Boolean(url && !url.includes('localhost') && !url.includes('api.nexus.local'))
}

export function getAccessToken(): string | undefined {
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

export class CloudApiError extends Error {
  status: number
  code: 'unauthorized' | 'unreachable' | 'server' | 'unknown'

  constructor(
    message: string,
    status: number,
    code: 'unauthorized' | 'unreachable' | 'server' | 'unknown' = 'unknown',
  ) {
    super(message)
    this.name = 'CloudApiError'
    this.status = status
    this.code = code
  }
}

export async function cloudFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${getCloudUrl()}${path}`, { ...init, headers })
  } catch {
    throw new CloudApiError('Cloud API unreachable — configure VITE_NEXUS_CLOUD_URL and sign in as platform admin', 0, 'unreachable')
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    const code = res.status === 401 || res.status === 403 ? 'unauthorized' : res.status >= 500 ? 'server' : 'unknown'
    throw new CloudApiError(err.message ?? `Cloud API error ${res.status}`, res.status, code)
  }

  return res.json() as Promise<T>
}
