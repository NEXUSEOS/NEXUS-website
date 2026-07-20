import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import {
  fetchCompatibilityMatrices,
  fetchFeaturedListings,
  fetchMarketplaceAnalytics,
  fetchMarketplaceCollections,
  fetchMarketplaceListings,
  fetchVerifiedPublishers,
  searchMarketplace,
  type MarketplaceListing,
} from '../../services/marketplace/marketplaceService'
import { Button, Heading, Text } from '../../components/ui'

export default function Marketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [featured, setFeatured] = useState<MarketplaceListing[]>([])
  const [collections, setCollections] = useState<Array<{ slug: string; title: string; description: string }>>([])
  const [verified, setVerified] = useState<Array<{ displayName: string; organizationId: string }>>([])
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(null)
  const [matrix, setMatrix] = useState<{ robots?: string[] } | null>(null)
  const [query, setQuery] = useState('')
  const [channel, setChannel] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void Promise.all([
      fetchMarketplaceListings(),
      fetchFeaturedListings(),
      fetchMarketplaceCollections(),
      fetchVerifiedPublishers(),
      fetchMarketplaceAnalytics(),
      fetchCompatibilityMatrices(),
    ])
      .then(([all, feat, cols, pubs, stats, compat]) => {
        setListings(all)
        setFeatured(feat)
        setCollections(cols)
        setVerified(pubs)
        setAnalytics(stats)
        setMatrix(compat.behavior as { robots?: string[] })
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const results = await searchMarketplace(query)
      setListings(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  async function filterChannel(next: string) {
    setChannel(next)
    setLoading(true)
    try {
      setListings(await fetchMarketplaceListings(next || undefined))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell route={routes.marketplace}>
      <Text variant="muted">
        Discover behaviors, models, and tools for the NEXUS ecosystem — search, collections, featured packages, and compatibility matrices.
      </Text>

      <form onSubmit={(e) => void handleSearch(e)} style={{ marginTop: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-2)' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search marketplace…"
          aria-label="Search marketplace"
          style={{ flex: 1 }}
        />
        <Button type="submit" variant="primary">Search</Button>
      </form>

      <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-2)' }} role="group" aria-label="Update channels">
        {['', 'stable', 'beta', 'nightly'].map((c) => (
          <button
            key={c || 'all'}
            type="button"
            className={`button ${channel === c ? 'button--primary' : 'button--secondary'}`}
            onClick={() => void filterChannel(c)}
          >
            {c || 'All channels'}
          </button>
        ))}
      </div>

      {loading && <Text variant="muted">Loading marketplace…</Text>}
      {error && <Text variant="muted" role="alert">{error}</Text>}

      {analytics && (
        <dl className="portal-metrics" style={{ marginTop: 'var(--spacing-6)' }} aria-label="Marketplace analytics">
          <div><dt>Published</dt><dd>{String(analytics.publishedListings ?? 0)}</dd></div>
          <div><dt>Pending review</dt><dd>{String(analytics.pendingReviews ?? 0)}</dd></div>
          <div><dt>Downloads</dt><dd>{String(analytics.totalDownloads ?? 0)}</dd></div>
        </dl>
      )}

      {featured.length > 0 && (
        <section aria-labelledby="marketplace-featured" style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title" id="marketplace-featured">Featured Packages</Heading>
          <ul role="list">
            {featured.map((pkg) => (
              <li key={pkg.id}>{pkg.packageName} · v{pkg.version}</li>
            ))}
          </ul>
        </section>
      )}

      {collections.length > 0 && (
        <section aria-labelledby="marketplace-collections" style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title" id="marketplace-collections">Collections</Heading>
          <ul role="list">
            {collections.map((c) => (
              <li key={c.slug}><strong>{c.title}</strong> — {c.description}</li>
            ))}
          </ul>
        </section>
      )}

      {verified.length > 0 && (
        <section aria-labelledby="verified-devs" style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title" id="verified-devs">Verified Developers</Heading>
          <ul role="list">{verified.map((p) => <li key={p.organizationId}>{p.displayName}</li>)}</ul>
        </section>
      )}

      <section aria-labelledby="marketplace-catalog" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="marketplace-catalog">Catalog</Heading>
        <ul role="list" aria-label="Marketplace packages">
          {listings.map((pkg) => (
            <li key={pkg.id} role="listitem" style={{ marginBottom: 'var(--spacing-4)' }}>
              <Heading as="h3" level="title">{pkg.packageName}{pkg.isFeatured ? ' ★' : ''}</Heading>
              <Text variant="muted">
                {pkg.packageSlug} · v{pkg.version}
                {pkg.updateChannel ? ` · ${pkg.updateChannel}` : ''}
                {pkg.publishedAt ? ` · ${pkg.publishedAt.slice(0, 10)}` : ''}
              </Text>
            </li>
          ))}
          {!loading && !error && listings.length === 0 && (
            <li><Text variant="muted">No published packages yet.</Text></li>
          )}
        </ul>
      </section>

      {matrix?.robots?.length ? (
        <section aria-labelledby="compat-matrix" style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title" id="compat-matrix">Robot Compatibility</Heading>
          <Text variant="muted">Supported platforms: {matrix.robots.join(', ')}</Text>
        </section>
      ) : null}

      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-8)' }}>
        <Link to={routes.developerPortalMarketplaceUploads.path}>
          <Button variant="primary">Publish a Package</Button>
        </Link>
        <Link to={routes.docs.path}>
          <Button variant="secondary">Marketplace Docs</Button>
        </Link>
      </div>
    </PageShell>
  )
}
