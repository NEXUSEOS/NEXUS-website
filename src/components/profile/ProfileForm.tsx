import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Profile, UserSettings } from '../../types'
import { updateProfile, updateUserSettings, uploadAvatar } from '../../services'
import { Button } from '../ui'
import './ProfileForm.css'

interface ProfileFormProps {
  userId: string
  profile: Profile | null
  settings: UserSettings | null
  onUpdated: () => Promise<void>
}

export default function ProfileForm({ userId, profile, settings, onUpdated }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [username, setUsername] = useState(profile?.username ?? '')
  const [emailNotifications, setEmailNotifications] = useState(settings?.email_notifications ?? true)
  const [marketingEmails, setMarketingEmails] = useState(settings?.marketing_emails ?? false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      await Promise.all([
        updateProfile(userId, { full_name: fullName, username }),
        updateUserSettings(userId, {
          email_notifications: emailNotifications,
          marketing_emails: marketingEmails,
        }),
      ])
      await onUpdated()
      setMessage('Account settings saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setSubmitting(true)
    setError(null)

    try {
      await uploadAvatar(userId, file)
      await onUpdated()
      setMessage('Avatar updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to upload avatar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="profile-form auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="avatar">
          Avatar
        </label>
        <input
          id="avatar"
          className="auth-form__input"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={submitting}
        />
      </div>

      <div className="profile-form__grid">
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="fullName">
            Name
          </label>
          <input
            id="fullName"
            className="auth-form__input"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="auth-form__input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
        </div>
      </div>

      <div className="auth-form__field">
        <span className="auth-form__label">Organization</span>
        <p className="profile-form__readonly">
          {profile?.organization?.name ?? 'Not assigned'}
        </p>
      </div>

      <div className="auth-form__field">
        <span className="auth-form__label">Role</span>
        <p className="profile-form__readonly">{profile?.role?.name ?? 'visitor'}</p>
      </div>

      <div className="profile-form__grid">
        <label className="auth-form__field">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(event) => setEmailNotifications(event.target.checked)}
          />
          <span className="auth-form__label">Email notifications</span>
        </label>

        <label className="auth-form__field">
          <input
            type="checkbox"
            checked={marketingEmails}
            onChange={(event) => setMarketingEmails(event.target.checked)}
          />
          <span className="auth-form__label">Marketing emails</span>
        </label>
      </div>

      {error ? <p className="auth-form__error">{error}</p> : null}
      {message ? <p className="auth-form__success">{message}</p> : null}

      <div className="profile-form__actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>
    </form>
  )
}
