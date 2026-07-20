import { useEffect, useState } from 'react'
import { PageMeta } from '../../components/seo'
import { Button, Container, GlassPanel, Heading, Section, Text } from '../../components/ui'
import { routes } from '../../config'
import { initiateStudioDownload, STUDIO_PRODUCT, STUDIO_VERSION } from '../../services'
import { fetchUpdateManifest } from '../../services/platform/integrationService'
import { useAuth } from '../../hooks'
import '../../components/auth/AuthForm.css'

export default function StudioDownload() {
  const { user, session } = useAuth()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    let active = true

    Promise.all([
      initiateStudioDownload(user.id),
      fetchUpdateManifest('studio', session?.access_token).catch(() => []),
    ])
      .then(([result, updates]) => {
        if (!active) return
        setMessage(result.message)
        const latest = Array.isArray(updates) ? updates[0] : null
        const url = latest && typeof latest === 'object' && 'downloadUrl' in latest
          ? String((latest as { downloadUrl?: string }).downloadUrl ?? '')
          : null
        if (url) setDownloadUrl(url)
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to initiate download.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [user, session?.access_token])

  return (
    <>
      <PageMeta
        title={routes.downloadStudio.title}
        description={routes.downloadStudio.description}
        path={routes.downloadStudio.path}
      />
      <Section>
        <Container>
          <div className="auth-layout">
            <GlassPanel className="auth-layout__panel">
              <div className="auth-layout__header">
                <Heading as="h1" level="title">
                  Download NEXUS Studio
                </Heading>
                <Text variant="muted">
                  Authenticated download for {STUDIO_PRODUCT} v{STUDIO_VERSION}.
                </Text>
              </div>

              {loading ? <p className="auth-form__label">Preparing download…</p> : null}
              {error ? <p className="auth-form__error">{error}</p> : null}
              {message ? <p className="auth-form__success">{message}</p> : null}

              {downloadUrl ? (
                <a href={downloadUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                  Download NEXUS Studio
                </a>
              ) : (
                <Button type="button" variant="primary" disabled={loading}>
                  {loading ? 'Preparing…' : 'Download unavailable — check back after release publish'}
                </Button>
              )}
            </GlassPanel>
          </div>
        </Container>
      </Section>
    </>
  )
}
