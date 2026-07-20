import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/marketing'
import { routes, websiteRoutes } from '../../config'
import { productPages } from '../../content/productPages'
import { fetchAtlasAlphaPackage } from '../../services/publicBeta/publicBetaService'
import { Button, Heading, Text } from '../../components/ui'

export default function Atlas() {
  const [pkg, setPkg] = useState<Record<string, unknown> | null>(null)
  const content = productPages.atlas

  useEffect(() => {
    void fetchAtlasAlphaPackage().then((d) => setPkg(d.package)).catch(() => {})
  }, [])

  const release = pkg?.release as { version?: string; releaseNotes?: string; status?: string } | undefined
  const installers = pkg?.installers as Record<string, { version?: string; command?: string }> | undefined

  return (
    <MarketingPage route={{ path: routes.atlas.path, title: 'NEXUS Atlas', description: content.subheadline ?? '' }} {...content}>
      <section aria-labelledby="atlas-alpha-release" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="atlas-alpha-release">Atlas Alpha {release?.version ?? '2.5.0-alpha.1'}</Heading>
        <Text variant="caption">Status: {release?.status ?? 'candidate'}</Text>
        <Text variant="muted">{release?.releaseNotes ?? 'First public alpha software release for Atlas — runtime, digital twin, OTA, calibration, and manufacturing validation.'}</Text>
      </section>
      <section aria-labelledby="atlas-install" style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title" id="atlas-install">Install Channels</Heading>
        <ul>
          <li><Text variant="muted">Studio: {installers?.studio?.version ?? '0.2.0'} (alpha channel)</Text></li>
          <li><Text variant="muted">SDK: @nexus/sdk-atlas {installers?.sdk?.version ?? '0.2.0'}</Text></li>
          <li><Text variant="muted">CLI: {installers?.cli?.command ?? 'nexus atlas install'}</Text></li>
          <li><Text variant="muted">Firmware: {installers?.firmware?.version ?? '2.5.0-alpha'}</Text></li>
        </ul>
        <div className="marketing-page__actions" style={{ marginTop: 'var(--spacing-4)' }}>
          <Link to={websiteRoutes.learningCenter.path}><Button variant="secondary">Atlas Alpha Guide</Button></Link>
          <Link to={websiteRoutes.demoProjects.path}><Button variant="ghost">Demo Projects</Button></Link>
        </div>
      </section>
    </MarketingPage>
  )
}
