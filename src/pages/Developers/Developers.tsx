import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/marketing'
import { routes } from '../../config'
import { productPages } from '../../content/productPages'
import { Permission } from '../../config/permissions'
import { usePermissions } from '../../hooks'

export default function Developers() {
  const { isAuthenticated, hasPermission } = usePermissions()
  const content = productPages.developers

  return (
    <MarketingPage route={routes.developers} {...content}>
      <div className="marketing-page__actions" style={{ justifyContent: 'center', marginTop: 'var(--spacing-8)' }}>
        {isAuthenticated && hasPermission(Permission.DEVELOPER_PORTAL_ACCESS) ? (
          <Link to={routes.developerPortal.path} className="button button--primary">
            Open Developer Portal
          </Link>
        ) : (
          <Link to={routes.login.path} className="button button--primary">
            Login to Developer Portal
          </Link>
        )}
        <Link to={routes.downloadCenter.path} className="button button--secondary">
          Download Center
        </Link>
        <Link to={routes.betaApply.path} className="button button--ghost">
          Apply for Beta
        </Link>
      </div>
    </MarketingPage>
  )
}
