import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { updatePassword } from '../../services'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { isConfigured, session } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const { error: updateError } = await updatePassword(password)
      if (updateError) throw updateError
      navigate(routes.account.path, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Set New Password"
      description="Choose a new password for your NEXUS account."
      path={routes.resetPassword.path}
      notice={!session ? 'Open the reset link from your email to activate this form.' : undefined}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="password">
            New password
          </label>
          <input
            id="password"
            className="auth-form__input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            disabled={!isConfigured || !session || submitting}
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            className="auth-form__input"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            disabled={!isConfigured || !session || submitting}
          />
        </div>

        {error ? <p className="auth-form__error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button type="submit" variant="primary" disabled={!isConfigured || !session || submitting}>
            {submitting ? 'Updating…' : 'Update Password'}
          </Button>
        </div>

        <div className="auth-form__links">
          <Link to={routes.login.path} className="auth-form__link">
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
