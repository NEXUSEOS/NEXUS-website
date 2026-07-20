import { PageMeta } from '../../components/seo'
import { DownloadCenter } from '@nexus/downloads'
import { routes } from '../../config'
import '@nexus/downloads/downloads.css'
import '../../layouts/PortalLayout.css'

export default function DownloadCenterPage() {
  return (
    <>
      <PageMeta
        title={routes.downloadCenter.title}
        description={routes.downloadCenter.description}
        path={routes.downloadCenter.path}
      />
      <DownloadCenter />
    </>
  )
}
