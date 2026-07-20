import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import { listOrganizations } from '../../services/developer/developerPortalService'
import { createCheckoutSession, fetchPublicPricing, type PricingPlan } from '../../services/commercial/commercialService'
import { redirectToExternalUrl } from '../../utils/redirect'
import { Button, Heading, Text } from '../../components/ui'

export default function PricingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchPublicPricing()
      .then((d) => setPlans(d.plans))
      .catch(() => setPlans([]))
  }, [])

  async function handleSelectPlan(planSlug: string) {
    if (!user) {
      navigate(routes.login?.path ?? '/auth/login')
      return
    }
    setLoading(planSlug)
    setError(null)
    try {
      const orgs = await listOrganizations()
      const orgId = orgs[0]?.id
      if (!orgId) throw new Error('Create an organization first')
      const { session } = await createCheckoutSession(orgId, planSlug)
      if (session.checkoutUrl) {
        redirectToExternalUrl(session.checkoutUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
    } finally {
      setLoading(null)
    }
  }

  return (
    <PageShell route={{ path: '/pricing', title: 'Pricing', description: 'NEXUS platform plans for developers and teams.' }}>
      <Text variant="muted">Choose a plan for SDK access, behaviors, simulation, and marketplace publishing.</Text>

      {error && <p role="alert" style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--spacing-6)', marginTop: 'var(--spacing-8)' }}>
        {plans.map((plan) => (
          <article key={plan.slug} style={{ padding: 'var(--spacing-6)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <Heading as="h2" level="title">{plan.name}</Heading>
            <Text variant="muted">{plan.description}</Text>
            <p style={{ fontSize: '2rem', fontWeight: 600, margin: 'var(--spacing-4) 0' }}>
              {plan.priceCents === 0 ? 'Free' : `$${(plan.priceCents / 100).toFixed(0)}`}
              {plan.priceCents > 0 && <span style={{ fontSize: '1rem', fontWeight: 400 }}>/{plan.interval}</span>}
            </p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button
              variant={plan.slug === 'pro' ? 'primary' : 'secondary'}
              disabled={loading === plan.slug}
              onClick={() => void handleSelectPlan(plan.slug)}
              style={{ marginTop: 'var(--spacing-4)' }}
            >
              {loading === plan.slug ? 'Starting checkout…' : plan.priceCents === 0 ? 'Get started' : 'Subscribe'}
            </Button>
          </article>
        ))}
      </div>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Text variant="muted">
          Not ready to subscribe? <Link to="/waitlist">Join the waitlist</Link> or{' '}
          <Link to={routes.betaApply.path}>apply for beta access</Link>.
        </Text>
      </section>
    </PageShell>
  )
}
