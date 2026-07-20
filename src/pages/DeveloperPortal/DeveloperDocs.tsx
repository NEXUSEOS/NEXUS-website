import { Link } from 'react-router-dom'
import { routes } from '../../config'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function DeveloperDocs() {
  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Developer Documentation
        </Heading>
        <Text variant="muted">Technical guides and references for building on NEXUS.</Text>
      </div>
      <GlassPanel className="download-card">
        <Text variant="body">
          Full developer documentation is available in the public documentation hub and
          downloadable PDF format from the Download Center.
        </Text>
        <div className="download-card__actions">
          <Link to={routes.documentation.path} className="button button--secondary">
            Public Documentation
          </Link>
          <Link to={routes.downloadCenter.path} className="button button--primary">
            Download PDF
          </Link>
        </div>
      </GlassPanel>
    </div>
  )
}
