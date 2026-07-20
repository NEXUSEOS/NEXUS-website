import { useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { listOrganizations, submitMarketplaceListing } from '../../services/developer/developerPortalService'

export default function DeveloperMarketplaceWizard() {
  const [step, setStep] = useState(1)
  const [versionId, setVersionId] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function publish() {
    setError(null)
    try {
      const orgs = await listOrganizations()
      const orgId = orgs[0]?.id
      if (!orgId || !versionId) throw new Error('Organization and behavior version ID required')
      const listing = await submitMarketplaceListing(orgId, versionId)
      setMessage(`Listing ${listing.id} submitted for review`)
      setStep(4)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Publish failed')
    }
  }

  return (
    <section aria-labelledby="marketplace-wizard-title">
      <Heading as="h1" level="heading" id="marketplace-wizard-title">Marketplace Publishing Wizard</Heading>
      <Text variant="muted">Validate, sign, and publish behavior packages to the NEXUS Marketplace.</Text>
      <ol style={{ marginTop: 'var(--spacing-6)' }}>
        <li aria-current={step === 1 ? 'step' : undefined}>
          <strong>Validate</strong> — Run <code>nexus validate .</code> locally
        </li>
        <li aria-current={step === 2 ? 'step' : undefined}>
          <strong>Sign</strong> — Run <code>nexus keys generate</code> then <code>nexus package .</code>
        </li>
        <li aria-current={step === 3 ? 'step' : undefined}>
          <strong>Upload</strong> — Run <code>nexus publish .</code> or paste version ID below
          <label style={{ display: 'block', marginTop: 'var(--spacing-2)' }}>
            Behavior package version ID
            <input value={versionId} onChange={(e) => setVersionId(e.target.value)} aria-label="Version ID" />
          </label>
        </li>
        <li aria-current={step === 4 ? 'step' : undefined}>
          <strong>Submit listing</strong> — Creates marketplace listing for review
        </li>
      </ol>
      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-4)' }}>
        <button type="button" className="button button--secondary" onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
        {step < 3 ? (
          <button type="button" className="button button--primary" onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <button type="button" className="button button--primary" onClick={() => void publish()}>Submit listing</button>
        )}
      </div>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  )
}
