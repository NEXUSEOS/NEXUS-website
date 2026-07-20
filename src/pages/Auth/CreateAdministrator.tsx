import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { signUp } from '../../services'
import { fetchAdministratorState, registerAdministrator } from '../../services/platform/platformOpsService'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

/** EPIC 57 — First administrator creation when none exists. */
export default function CreateAdministrator() {
  const navigate = useNavigate()
  const { isConfigured } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const { error: signUpError } = await signUp({ email, password, fullName: name })
      if (signUpError) throw signUpError
      await registerAdministrator({ adminName: name, adminEmail: email })
      const adminState = await fetchAdministratorState()
      if (adminState.requiresSetupWizard) {
        navigate('/admin/setup', { replace: true })
        return
      }
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create administrator.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create Administrator"
      description="Set up the first platform administrator account."
      path="/admin/create-administrator"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="admin-name">Full name</label>
          <input
            id="admin-name"
            className="auth-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!isConfigured || submitting}
          />
        </div>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="auth-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={!isConfigured || submitting}
          />
        </div>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="auth-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            disabled={!isConfigured || submitting}
          />
        </div>
        {error ? <p className="auth-form__error">{error}</p> : null}
        <div className="auth-form__actions">
          <Button type="submit" variant="primary" disabled={!isConfigured || submitting}>
            {submitting ? 'Creating…' : 'Create Administrator'}
          </Button>
        </div>
        <div className="auth-form__links">
          <Link to={routes.login.path} className="auth-form__link">Already have an account? Login</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
