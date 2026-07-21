import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { LivingGlassInput } from '../../components/living-glass'
import { routes } from '../../config'
import { ParticleMaterialize, VolumetricLayer } from '../../experience'
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
    <div className="cx-surface cx-surface--showroom">
      <VolumetricLayer variant="spotlight" intensity="medium" />
      <PageShell route={routes.marketplace}>
        <Text variant="muted">
          Discover behaviors, models, and tools for the NEXUS ecosystem — search, collections, featured packages, and compatibility matrices.
        </Text>

        <form onSubmit={(e) => void handleSearch(e)} className="marketplace-search lg-materialize" style={{ marginTop: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-2)' }}>
          <LivingGlassInput
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
              className={`button living-glass-button living-glass-button--${channel === c ? 'primary' : 'secondary'}`}
              onClick={() => void filterChannel(c)}
            >
              {c || 'All channels'}
            </button>
          ))}
        </div>

        {loading && <Text variant="muted">Loading marketplace…</Text>}
        {error && <Text variant="muted" role="alert">{error}</Text>}

        {analytics && (
          <dl className="portal-metrics lg-materialize-stagger" style={{ marginTop: 'var(--spacing-6)' }} aria-label="Marketplace analytics">
            <div className="cx-showroom-card"><dt>Published</dt><dd>{String(analytics.publishedListings ?? 0)}</dd></div>
            <div className="cx-showroom-card"><dt>Pending review</dt><dd>{String(analytics.pendingReviews ?? 0)}</dd></div>
            <div className="cx-showroom-card"><dt>Downloads</dt><dd>{String(analytics.totalDownloads ?? 0)}</dd></div>
          </dl>
        )}

        {featured.length > 0 && (
          <section aria-labelledby="marketplace-featured" style={{ marginTop: 'var(--spacing-8)' }}>
            <Heading as="h2" level="title" id="marketplace-featured">Featured Packages</Heading>
            <ul role="list" className="lg-materialize-stagger">
              {featured.map((pkg, index) => (
                <ParticleMaterialize key={pkg.id} as="li" variant="ripple" index={index}>
                  <div className="cx-showroom-card">
                    {pkg.packageName} · v{pkg.version}
                  </div>
                </ParticleMaterialize>
              ))}
            </ul>
          </section>
        )}

        {collections.length > 0 && (
          <section aria-labelledby="marketplace-collections" style={{ marginTop: 'var(--spacing-8)' }}>
            <Heading as="h2" level="title" id="marketplace-collections">Collections</Heading>
            <ul role="list">
              {collections.map((c) => (
                <li key={c.slug} className="cx-showroom-card" style={{ marginBottom: 'var(--spacing-3)' }}>
                  <strong>{c.title}</strong> — {c.description}
                </li>
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
          <ul role="list" aria-label="Marketplace packages" className="lg-materialize-stagger">
            {listings.map((pkg, index) => (
              <ParticleMaterialize key={pkg.id} as="li" variant="stagger" index={index} className="cx-showroom-card" style={{ marginBottom: 'var(--spacing-4)', listStyle: 'none' }}>
                <Heading as="h3" level="title">{pkg.packageName}{pkg.isFeatured ? ' ★' : ''}</Heading>
                <Text variant="muted">
                  {pkg.packageSlug} · v{pkg.version}
                  {pkg.updateChannel ? ` · ${pkg.updateChannel}` : ''}
                  {pkg.publishedAt ? ` · ${pkg.publishedAt.slice(0, 10)}` : ''}
                </Text>
              </ParticleMaterialize>
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

        <div className="download-card__actions lg-materialize" style={{ marginTop: 'var(--spacing-8)' }}>
          <Link to={routes.developerPortalMarketplaceUploads.path}>
            <Button variant="primary">Publish a Package</Button>
          </Link>
          <Link to={routes.docs.path}>
            <Button variant="secondary">Marketplace Docs</Button>
          </Link>
        </div>
      </PageShell>
    </div>
  )
}
