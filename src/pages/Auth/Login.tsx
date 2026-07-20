import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { signIn } from '../../services'
import { fetchSetupState, fetchAdministratorState } from '../../services/platform/platformOpsService'
import { fetchInstallationState } from '../../services/platform/installationService'
import { fetchPlatformAdminDashboard } from '../../services/platform/platformAdminService'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname
    ?? routes.home.path
  const notice = (location.state as { message?: string } | null)?.message

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const { error: signInError } = await signIn({ email, password })
      if (signInError) throw signInError

      try {
        const adminState = await fetchAdministratorState()
        if (!adminState.hasAdministrator) {
          navigate('/admin/create-administrator', { replace: true })
          return
        }
        const setupState = await fetchSetupState()
        if (!setupState.initialized || adminState.requiresSetupWizard) {
          try {
            const installState = await fetchInstallationState()
            if (installState.requiresInstallationCenter) {
              navigate('/admin/installation', { replace: true })
              return
            }
          } catch {
            // fall through to setup wizard
          }
          navigate('/admin/setup', { replace: true })
          return
        }
        try {
          await fetchPlatformAdminDashboard()
          navigate('/admin', { replace: true, state: { missionControl: true } })
          return
        } catch {
          // Not a platform administrator
        }
      } catch {
        // Cloud unreachable — continue to requested destination
      }

      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Login"
      description="Access your NEXUS account."
      path={routes.login.path}
      notice={!isConfigured ? 'Supabase is not configured. Authentication is unavailable in this environment.' : notice}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="auth-form__input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={!isConfigured || submitting}
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="auth-form__input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            disabled={!isConfigured || submitting}
          />
        </div>

        {error ? <p className="auth-form__error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button type="submit" variant="primary" disabled={!isConfigured || submitting}>
            {submitting ? 'Signing in…' : 'Login'}
          </Button>
        </div>

        <div className="auth-form__links">
          <Link to={routes.forgotPassword.path} className="auth-form__link">
            Forgot password?
          </Link>
          <Link to={routes.signUp.path} className="auth-form__link">
            Create an account
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
