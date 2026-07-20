import { createPlatformClient } from '@nexus/sdk-platform'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

let cachedFlags: Record<string, boolean> | null = null

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

export async function loadCloudFeatureFlags(): Promise<Record<string, boolean>> {
  const client = createPlatformClient({ cloudBaseUrl: CLOUD_URL, accessToken: getAccessToken() })
  cachedFlags = await client.resolveFeatureFlags({ environment: import.meta.env.MODE })
  return cachedFlags
}

export function getCloudFeatureFlags(): Record<string, boolean> {
  return cachedFlags ?? {}
}

export function isCloudFeatureEnabled(flag: string): boolean {
  return Boolean(getCloudFeatureFlags()[flag])
}

/** @deprecated Use isCloudFeatureEnabled — loads from Cloud on bootstrap via loadCloudFeatureFlags() */
export type FeatureFlag =
  | 'behaviorWorkspace'
  | 'developerPlatformExtended'
  | 'contentPlatform'
  | 'sdkDocumentation'
  | 'navSearch'
  | 'structuredMetadata'

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  const flags = getCloudFeatureFlags()
  if (flag in flags) return Boolean(flags[flag])
  const localDefaults: Partial<Record<FeatureFlag, boolean>> = {
    navSearch: true,
    contentPlatform: true,
    sdkDocumentation: true,
    structuredMetadata: true,
  }
  return localDefaults[flag] ?? false
}
