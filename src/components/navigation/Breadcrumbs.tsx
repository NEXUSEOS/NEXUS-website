import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../config/routes'
import { Container } from '../ui'
import './Breadcrumbs.css'

interface Crumb {
  label: string
  path: string
}

function labelFromSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function buildCrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: 'Home', path: routes.home.path }]

  if (pathname === routes.home.path) return crumbs

  const segments = pathname.split('/').filter(Boolean)
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`
    const matchedRoute = Object.values(routes).find((route) => route.path === currentPath)
    crumbs.push({
      label: matchedRoute?.title ?? labelFromSegment(segment),
      path: currentPath,
    })
  }

  return crumbs
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const crumbs = buildCrumbs(pathname)

  if (crumbs.length <= 1) return null

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Container>
        <ol className="breadcrumbs__list">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            return (
              <li key={crumb.path} className="breadcrumbs__item">
                {index > 0 ? (
                  <span className="breadcrumbs__separator" aria-hidden="true">
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span className="breadcrumbs__link breadcrumbs__link--current" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.path} className="breadcrumbs__link">
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
