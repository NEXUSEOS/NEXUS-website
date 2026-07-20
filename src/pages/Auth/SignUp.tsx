import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/auth'
import { Button } from '../../components/ui'
import { routes } from '../../config'
import { signUp } from '../../services'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function SignUp() {
  const navigate = useNavigate()
  const { isConfigured } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const { error: signUpError } = await signUp({ email, password, fullName })
      if (signUpError) throw signUpError
      navigate(routes.verifyEmail.path, { state: { email } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Sign Up"
      description="Create your NEXUS account."
      path={routes.signUp.path}
      notice={!isConfigured ? 'Supabase is not configured. Registration is unavailable in this environment.' : undefined}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            className="auth-form__input"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            required
            disabled={!isConfigured || submitting}
          />
        </div>

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
            autoComplete="new-password"
            minLength={8}
            required
            disabled={!isConfigured || submitting}
          />
        </div>

        {error ? <p className="auth-form__error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button type="submit" variant="primary" disabled={!isConfigured || submitting}>
            {submitting ? 'Creating account…' : 'Sign Up'}
          </Button>
        </div>

        <div className="auth-form__links">
          <Link to={routes.login.path} className="auth-form__link">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
