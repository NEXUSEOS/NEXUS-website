import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { RELEASE_CHANNELS } from '@nexus/integration'
import { routes } from '../../config'
import { getBetaClient } from '../../services/platform/betaService'
import type { ReleaseChannel } from '@nexus/integration'
import { Button, Heading, Text } from '../../components/ui'

const RELEASE_CHANNEL_LABELS: Record<ReleaseChannel, string> = {
  stable: 'Stable',
  beta: 'Beta',
  alpha: 'Alpha',
  nightly: 'Nightly',
}

interface ChannelRow {
  product: string
  channel: ReleaseChannel
  version: string
}

export default function ReleaseChannelsPage() {
  const [channels, setChannels] = useState<ChannelRow[]>([])

  useEffect(() => {
    const client = getBetaClient()
    client
      .listReleaseChannels()
      .then(setChannels)
      .catch(() => setChannels([]))
  }, [])

  const byChannel = RELEASE_CHANNELS.map((channel) => ({
    channel,
    items: channels.filter((c) => c.channel === channel),
  }))

  return (
    <PageShell route={routes.releaseChannels}>
      <Text variant="muted">
        NEXUS ships on four release channels. Stable is recommended for production; Beta and Alpha are for early
        adopters; Nightly is for internal testing.
      </Text>

      {byChannel.map(({ channel, items }) => (
        <section key={channel} aria-labelledby={`channel-${channel}`} style={{ marginTop: 'var(--spacing-8)' }}>
          <Heading as="h2" level="title" id={`channel-${channel}`}>
            {RELEASE_CHANNEL_LABELS[channel]}
          </Heading>
          {items.length === 0 ? (
            <Text variant="muted">No releases published on this channel yet.</Text>
          ) : (
            <ul aria-label={`${RELEASE_CHANNEL_LABELS[channel]} releases`}>
              {items.map((item) => (
                <li key={`${item.product}-${item.version}`}>
                  <Text>
                    {item.product} v{item.version}
                  </Text>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <div className="download-card__actions" style={{ marginTop: 'var(--spacing-8)' }}>
        <Link to={routes.downloadCenter.path}>
          <Button variant="primary">Download Center</Button>
        </Link>
        <Link to={routes.developerPortalSdk.path}>
          <Button variant="secondary">SDK Downloads</Button>
        </Link>
      </div>
    </PageShell>
  )
}
