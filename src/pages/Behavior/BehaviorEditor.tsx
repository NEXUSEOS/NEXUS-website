import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBehaviors } from '../../behavior'
import { routes } from '../../config/routes'
import { useAuth } from '../../hooks'
import { Button, GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function BehaviorEditor() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { createDraft } = useBehaviors()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const author = profile?.full_name ?? user?.email ?? 'Developer'

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) return

    const behavior = createDraft(author, {
      name: name.trim(),
      description: description.trim(),
      categories: ['general'],
      tags: ['draft'],
    })

    navigate(`${routes.developerPortalBehaviors.path}/${behavior.behaviorId}`)
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Create Behavior
        </Heading>
        <Text variant="muted">Save a draft behavior with metadata. Execution deferred to nexus-os.</Text>
      </div>

      <GlassPanel className="download-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-form__field">
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="auth-form__field">
            <span>Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </label>
          <div className="download-card__actions">
            <Button type="submit" variant="primary">
              Save Draft
            </Button>
            <Link to={routes.developerPortalBehaviors.path} className="button button--ghost">
              Cancel
            </Link>
          </div>
        </form>
      </GlassPanel>
    </div>
  )
}
