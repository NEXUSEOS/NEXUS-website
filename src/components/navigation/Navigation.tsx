import { Link, NavLink } from 'react-router-dom'
import { useEffect, useId, useRef, useState } from 'react'
import { company, routes } from '../../config'
import { fetchPublishedNavigation } from '../../services/cms/cmsContentService'
import { Container } from '../ui'
import AuthActions from './AuthActions'
import NavSearch from './NavSearch'
import './Navigation.css'

const DRAWER_BREAKPOINT = '(max-width: 1100px)'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDrawerViewport, setIsDrawerViewport] = useState(false)
  const [navLinks, setNavLinks] = useState<Array<{ label: string; path: string }>>([])
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    fetchPublishedNavigation('website')
      .then((items) =>
        setNavLinks(
          items
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => ({ label: item.label, path: item.href })),
        ),
      )
      .catch(() => setNavLinks([]))
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DRAWER_BREAKPOINT)
    const updateViewport = () => {
      const matches = mediaQuery.matches
      setIsDrawerViewport(matches)
      if (!matches) {
        setMenuOpen(false)
      }
    }

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      toggleRef.current?.focus()
    }
  }, [menuOpen])

  return (
    <nav className="navigation" aria-label="Main navigation">
      {isDrawerViewport && menuOpen ? (
        <button
          type="button"
          className="navigation__backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <Container>
        <div className="navigation__inner">
          <Link to={routes.home.path} className="navigation__logo" aria-label={`${company.shortName} home`}>
            {company.shortName}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="navigation__toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close menu' : 'Open menu'}
          </button>

          <div
            id={menuId}
            role={isDrawerViewport && menuOpen ? 'dialog' : undefined}
            aria-modal={isDrawerViewport && menuOpen ? true : undefined}
            aria-label={isDrawerViewport ? 'Site navigation menu' : undefined}
            className={`navigation__panel${menuOpen ? ' navigation__panel--open' : ''}`}
          >
            <ul className="navigation__links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === routes.home.path}
                    className={({ isActive }) =>
                      `navigation__link${isActive ? ' navigation__link--active' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="navigation__search">
              <NavSearch />
            </div>

            <div className="navigation__actions">
              <AuthActions />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}
