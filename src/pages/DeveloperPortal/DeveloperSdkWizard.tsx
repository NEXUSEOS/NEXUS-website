import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heading, Text } from '../../components/ui'
import { routes } from '../../config'

const STEPS = [
  { title: 'Install CLI', body: 'npm install -g @nexus/sdk-cli', command: 'nexus --help' },
  { title: 'Run wizard', body: 'Interactive setup for auth, org, and starter project.', command: 'nexus wizard' },
  { title: 'Choose template', body: 'Patrol, pick-place, or robot profile templates.', command: 'nexus templates behavior' },
  { title: 'Validate & publish', body: 'End-to-end package workflow.', command: 'nexus validate . && nexus publish .' },
]

export default function DeveloperSdkWizard() {
  const [step, setStep] = useState(0)

  return (
    <section aria-labelledby="sdk-wizard-title">
      <Heading as="h1" level="heading" id="sdk-wizard-title">SDK Wizard</Heading>
      <Text variant="muted">Guided onboarding for external developers.</Text>
      <div style={{ marginTop: 'var(--spacing-6)' }}>
        <Text variant="caption">Step {step + 1} of {STEPS.length}</Text>
        <Heading as="h2" level="title">{STEPS[step].title}</Heading>
        <Text>{STEPS[step].body}</Text>
        <pre aria-label="Command"><code>{STEPS[step].command}</code></pre>
      </div>
      <div className="download-card__actions">
        <button type="button" className="button button--secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        {step < STEPS.length - 1 ? (
          <button type="button" className="button button--primary" onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <Link to={routes.developerPortal.path} className="button button--primary">Open Developer Portal</Link>
        )}
      </div>
    </section>
  )
}
