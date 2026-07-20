import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { listOrganizations } from '../../services/developer/developerPortalService'
import { completeCheckoutSession } from '../../services/commercial/commercialService'
import { useAuth } from '../../hooks'
import { Heading, Text } from '../../components/ui'

export default function CheckoutSuccessPage() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(() =>
    sessionId ? 'loading' : 'success',
  )

  useEffect(() => {
    if (!user || !sessionId) return

    let active = true
    void listOrganizations()
      .then((orgs) => {
        const orgId = orgs[0]?.id
        if (!orgId) throw new Error('No organization')
        return completeCheckoutSession(orgId, sessionId)
      })
      .then(() => {
        if (active) setStatus('success')
      })
      .catch(() => {
        if (active) setStatus('error')
      })

    return () => {
      active = false
    }
  }, [user, sessionId])

  return (
    <PageShell route={{ path: '/checkout/success', title: 'Checkout Complete', description: 'Subscription activated.' }}>
      <Heading as="h1" level="heading">Checkout Complete</Heading>
      {status === 'loading' && <Text>Confirming your subscription…</Text>}
      {status === 'success' && (
        <>
          <Text>Your NEXUS subscription is active. Welcome to the platform!</Text>
          <p style={{ marginTop: 'var(--spacing-6)' }}>
            <Link to="/developers/portal/billing">View billing</Link> ·{' '}
            <Link to="/developers/portal">Developer portal</Link>
          </p>
        </>
      )}
      {status === 'error' && (
        <Text variant="muted">Payment received — billing may take a moment to sync. Check your billing portal.</Text>
      )}
    </PageShell>
  )
}
