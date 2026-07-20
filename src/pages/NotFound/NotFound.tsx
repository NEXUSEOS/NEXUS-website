import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'

export default function NotFound() {
  return (
    <PageShell route={routes.notFound}>
      <Link to={routes.home.path} className="button button--secondary">
        Return Home
      </Link>
    </PageShell>
  )
}
