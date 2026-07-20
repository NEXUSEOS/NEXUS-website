import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchContent } from '../../content'
import { isFeatureEnabled } from '../../config/features'
import './NavSearch.css'

export default function NavSearch() {
  const enabled = isFeatureEnabled('navSearch')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  const results = searchContent(query)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!enabled) return null

  return (
    <div className="nav-search" ref={containerRef}>
      <label htmlFor={`nav-search-${listId}`} className="visually-hidden">
        Search NEXUS
      </label>
      <input
        id={`nav-search-${listId}`}
        type="search"
        className="nav-search__input"
        placeholder="Search…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
      />
      {open && query && results.length > 0 ? (
        <ul id={listId} className="nav-search__results" role="listbox">
          {results.map((result) => (
            <li key={result.path} role="option">
              <Link
                to={result.path}
                className="nav-search__result"
                onClick={() => {
                  setOpen(false)
                  setQuery('')
                }}
              >
                <span className="nav-search__result-label">{result.label}</span>
                <span className="nav-search__result-meta">
                  {result.category} · {result.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
