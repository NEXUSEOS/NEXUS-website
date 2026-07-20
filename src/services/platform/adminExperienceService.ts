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

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/admin-experience${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Admin experience error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchAdminWizardHub() {
  return adminFetch<Record<string, unknown>>('/wizards')
}

export async function fetchAdminExperienceStatus() {
  return adminFetch<Record<string, unknown>>('/status')
}

export async function fetchAdminWizardDefinition(wizardKey: string) {
  return adminFetch<Record<string, unknown>>(`/wizards/${wizardKey}`)
}

export async function saveAdminWizardProgress(
  wizardKey: string,
  body: { step: string; completed?: boolean; metadata?: Record<string, unknown> },
) {
  return adminFetch<Record<string, unknown>>(`/wizards/${wizardKey}/progress`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}
