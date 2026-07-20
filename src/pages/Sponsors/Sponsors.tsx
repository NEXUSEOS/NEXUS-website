import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/marketing'
import { routes } from '../../config'
import { productPages } from '../../content/productPages'
import { Permission } from '../../config/permissions'
import { usePermissions } from '../../hooks'

export default function Sponsors() {
  const { isAuthenticated, hasPermission } = usePermissions()
  const content = productPages.sponsors

  return (
    <MarketingPage route={routes.sponsors} {...content}>
      <div className="marketing-page__actions" style={{ justifyContent: 'center', marginTop: 'var(--spacing-8)' }}>
        {isAuthenticated && hasPermission(Permission.SPONSOR_PORTAL_ACCESS) ? (
          <Link to={routes.sponsorPortal.path} className="button button--primary">
            Open Sponsor Portal
          </Link>
        ) : (
          <Link to={routes.login.path} className="button button--primary">
            Login to Apply
          </Link>
        )}
        <Link to={routes.sponsorTiers.path} className="button button--secondary">
          View Tiers
        </Link>
      </div>
    </MarketingPage>
  )
}
