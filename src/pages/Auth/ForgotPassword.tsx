import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { resetPassword } from '../../services'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function ForgotPassword() {
  const { isConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const { error: resetError } = await resetPassword(email)
      if (resetError) throw resetError
      setMessage('Password reset instructions have been sent to your email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset email.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      description="Receive a secure link to reset your password."
      path={routes.forgotPassword.path}
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

        {error ? <p className="auth-form__error">{error}</p> : null}
        {message ? <p className="auth-form__success">{message}</p> : null}

        <div className="auth-form__actions">
          <Button type="submit" variant="primary" disabled={!isConfigured || submitting}>
            {submitting ? 'Sending…' : 'Send Reset Link'}
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
