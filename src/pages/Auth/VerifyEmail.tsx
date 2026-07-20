import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { resendVerificationEmail } from '../../services'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function VerifyEmail() {
  const location = useLocation()
  const { user, isConfigured } = useAuth()
  const email = (location.state as { email?: string } | null)?.email ?? user?.email ?? ''
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleResend() {
    if (!email) return

    setSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const { error: resendError } = await resendVerificationEmail(email)
      if (resendError) throw resendError
      setMessage('Verification email sent.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to resend verification email.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Verify Email"
      description="Confirm your email address to activate your NEXUS account."
      path={routes.verifyEmail.path}
    >
      <div className="auth-form">
        <p className="auth-form__label">
          {email
            ? `A verification link has been sent to ${email}.`
            : 'Check your inbox for a verification link.'}
        </p>

        {error ? <p className="auth-form__error">{error}</p> : null}
        {message ? <p className="auth-form__success">{message}</p> : null}

        <div className="auth-form__actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResend}
            disabled={!isConfigured || !email || submitting}
          >
            {submitting ? 'Sending…' : 'Resend Verification Email'}
          </Button>
        </div>

        <div className="auth-form__links">
          <Link to={routes.login.path} className="auth-form__link">
            Return to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
