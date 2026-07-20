import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { useAsyncMount } from '../../hooks'
import { routes } from '../../config'
import {
  completeSetup,
  fetchSetupDefinition,
  fetchSetupState,
  saveSetupStep,
  startSetup,
  validateSetupStep,
} from '../../services/platform/platformOpsService'
import '../../components/auth/AuthForm.css'

export default function AdminSetup() {
  const navigate = useNavigate()
  const [steps, setSteps] = useState<Array<{ step: number; id: string; title: string; fields?: string[]; connectionServiceId?: string }>>([])
  const [activeStep, setActiveStep] = useState(1)
  const [setupRunId, setSetupRunId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationDetail, setValidationDetail] = useState<string | null>(null)
  const [completeMessage, setCompleteMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [definition, state] = await Promise.all([fetchSetupDefinition(), fetchSetupState()])
      setSteps(definition.steps)
      setActiveStep(state.currentStep)
      setSetupRunId(state.setupRunId)
      if (state.initialized) {
        setCompleteMessage('Platform is already configured.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load setup wizard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useAsyncMount(load)

  async function handleStepSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setValidationDetail(null)
    try {
      let runId = setupRunId
      if (!runId) {
        const started = await startSetup()
        runId = started.setupRunId
        setSetupRunId(runId)
      }
      const stepDef = steps.find((s) => s.step === activeStep)
      if (!stepDef || !runId) return

      await saveSetupStep(runId, stepDef.id, formData, activeStep)
      const validation = await validateSetupStep(runId, stepDef.id)
      setValidationDetail(validation.passed ? 'Validation passed' : (validation.detail ?? 'Validation failed'))

      if (validation.passed && activeStep < steps.length) {
        setActiveStep((s) => s + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save step.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleComplete() {
    if (!setupRunId) return
    setSubmitting(true)
    setError(null)
    try {
      const result = await completeSetup(setupRunId)
      setCompleteMessage(result.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete setup.')
    } finally {
      setSubmitting(false)
    }
  }

  const currentStep = steps.find((s) => s.step === activeStep)

  return (
    <AuthLayout
      title="NEXUS Setup Wizard"
      description="Configure platform infrastructure for first-run deployment."
      path="/admin/setup"
    >
      {loading ? (
        <p>Loading setup wizard…</p>
      ) : completeMessage ? (
        <div>
          <p>{completeMessage}</p>
          <div className="auth-form__actions">
            <Button variant="primary" onClick={() => navigate('/admin')}>
              Go to Mission Control
            </Button>
          </div>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleStepSubmit}>
          <p className="auth-form__label">
            Step {activeStep} of {steps.length}: {currentStep?.title}
          </p>

          {currentStep?.fields?.map((field) => (
            <div className="auth-form__field" key={field}>
              <label className="auth-form__label" htmlFor={field}>{field}</label>
              <input
                id={field}
                className="auth-form__input"
                value={formData[field] ?? ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                disabled={submitting}
              />
            </div>
          ))}

          {currentStep?.connectionServiceId && (
            <p className="auth-form__label">Connection: {currentStep.connectionServiceId}</p>
          )}

          {validationDetail && <p className="auth-form__label">{validationDetail}</p>}
          {error && <p className="auth-form__error">{error}</p>}

          <div className="auth-form__actions">
            {activeStep < steps.length ? (
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save & Continue'}
              </Button>
            ) : (
              <Button type="button" variant="primary" disabled={submitting} onClick={() => void handleComplete()}>
                {submitting ? 'Completing…' : 'Complete Setup'}
              </Button>
            )}
          </div>

          <div className="auth-form__links">
            <Link to={routes.login.path} className="auth-form__link">Back to login</Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
