import { Link } from 'react-router-dom'
import { routes, sponsorNavLink } from '../../config'
import { Permission } from '../../config/permissions'
import { useAuth, usePermissions } from '../../hooks'
import './AuthActions.css'

export default function AuthActions() {
  const { user, profile, signOutUser, loading } = useAuth()
  const { hasPermission } = usePermissions()

  if (loading) {
    return <div className="navigation__auth" aria-hidden="true" />
  }

  if (!user) {
    return (
      <div className="navigation__auth">
        <Link to={routes.login.path} className="button button--ghost">
          Login
        </Link>
        <Link to={routes.signUp.path} className="button button--secondary">
          Developer
        </Link>
        <Link to={sponsorNavLink.path} className="button button--secondary">
          {sponsorNavLink.label}
        </Link>
      </div>
    )
  }

  const displayName = profile?.full_name || profile?.username || user.email

  return (
    <div className="navigation__auth">
      <span className="navigation__user" title={displayName ?? undefined}>
        {displayName}
      </span>
      {hasPermission(Permission.DEVELOPER_PORTAL_ACCESS) ? (
        <Link to={routes.developerPortal.path} className="button button--ghost">
          Developer
        </Link>
      ) : null}
      {hasPermission(Permission.SPONSOR_PORTAL_ACCESS) ? (
        <Link to={routes.sponsorPortal.path} className="button button--ghost">
          Sponsor
        </Link>
      ) : null}
      <Link to={routes.downloadCenter.path} className="button button--primary">
        Downloads
      </Link>
      <Link to={routes.account.path} className="button button--secondary">
        Account
      </Link>
      <button type="button" className="button button--ghost" onClick={() => void signOutUser()}>
        Logout
      </button>
    </div>
  )
}
