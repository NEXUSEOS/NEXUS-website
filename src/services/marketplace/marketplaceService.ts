const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export interface MarketplaceListing {
  id: string
  packageName: string
  packageSlug: string
  version: string
  publishedAt?: string | null
  isFeatured?: boolean
  updateChannel?: string
  manifest?: Record<string, unknown>
}

async function marketplaceFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}${path}`, init)
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Marketplace API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchMarketplaceListings(channel?: string) {
  const qs = channel ? `?channel=${channel}` : ''
  const data = await marketplaceFetch<{ listings: MarketplaceListing[] }>(`/v1/marketplace/listings${qs}`)
  return data.listings
}

export async function fetchFeaturedListings() {
  const data = await marketplaceFetch<{ listings: MarketplaceListing[] }>('/v1/marketplace/listings/featured')
  return data.listings
}

export async function searchMarketplace(q: string, robot?: string) {
  const params = new URLSearchParams({ q })
  if (robot) params.set('robot', robot)
  const data = await marketplaceFetch<{ listings: MarketplaceListing[] }>(`/v1/marketplace/search?${params}`)
  return data.listings
}

export async function fetchMarketplaceCollections() {
  const data = await marketplaceFetch<{ collections: Array<{ id: string; slug: string; title: string; description: string }> }>(
    '/v1/marketplace/collections',
  )
  return data.collections
}

export async function fetchMarketplaceAnalytics() {
  const data = await marketplaceFetch<{ analytics: Record<string, unknown> }>('/v1/marketplace/analytics')
  return data.analytics
}

export async function fetchCompatibilityMatrices() {
  return marketplaceFetch<{ behavior: unknown; robot: unknown }>('/v1/marketplace/compatibility')
}

export async function fetchListingRecommendations(listingId: string) {
  const data = await marketplaceFetch<{ recommendations: MarketplaceListing[] }>(
    `/v1/marketplace/listings/${listingId}/recommendations`,
  )
  return data.recommendations
}

export async function fetchVerifiedPublishers() {
  const data = await marketplaceFetch<{ publishers: Array<{ displayName: string; organizationId: string; verifiedAt?: string }> }>(
    '/v1/marketplace/publishers/verified',
  )
  return data.publishers
}

export async function trackMarketplaceDownload(listingId: string, version: string, token?: string) {
  return marketplaceFetch(`/v1/marketplace/listings/${listingId}/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ version }),
  })
}
