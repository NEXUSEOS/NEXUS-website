import { useState } from 'react'
import { DownloadCard } from '../../components/downloads'
import { downloadCatalog } from '../../config/portals'
import { initiateDownload } from '../../services'
import { trackPortalEvent } from '../../services/analytics/analyticsService'
import { useAuth } from '../../hooks'
import { Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function DeveloperSdk() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Record<string, string>>({})
  const [downloading, setDownloading] = useState<string | null>(null)

  const sdkItems = downloadCatalog.filter((item) => item.category === 'sdk')

  async function handleDownload(item: (typeof downloadCatalog)[number]) {
    if (!user?.id) return

    setDownloading(item.id)
    try {
      const result = await initiateDownload(user.id, item)
      setMessages((prev) => ({ ...prev, [item.id]: result.message }))
      await trackPortalEvent(user.id, 'developer', 'download', { product: item.productSlug })
    } catch (err) {
      setMessages((prev) => ({
        ...prev,
        [item.id]: err instanceof Error ? err.message : 'Download failed.',
      }))
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          SDK Downloads
        </Heading>
        <Text variant="muted">Download the NEXUS SDK and developer tooling.</Text>
      </div>
      <div className="download-grid">
        {sdkItems.map((item) => (
          <DownloadCard
            key={item.id}
            item={item}
            onDownload={handleDownload}
            downloading={downloading === item.id}
            message={messages[item.id]}
          />
        ))}
      </div>
    </div>
  )
}
