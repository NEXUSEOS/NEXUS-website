import { useCallback, useEffect, useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchContent } from '../../content'
import './CommandPalette.css'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const listId = useId()
  const navigate = useNavigate()
  const results = searchContent(query, 12)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [close])

  if (!open) return null

  return (
    <div className="command-palette" role="presentation" onClick={close}>
      <div
        className="command-palette__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <label htmlFor={`command-palette-${listId}`} className="visually-hidden">
          Search pages and documentation
        </label>
        <input
          id={`command-palette-${listId}`}
          type="search"
          className="command-palette__input"
          placeholder="Search NEXUS…"
          value={query}
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && results[0]) {
              navigate(results[0].path)
              close()
            }
          }}
        />
        <ul id={listId} className="command-palette__results" role="listbox">
          {results.map((result) => (
            <li key={result.path} role="option">
              <Link to={result.path} className="command-palette__result" onClick={close}>
                <span className="command-palette__label">{result.label}</span>
                <span className="command-palette__meta">{result.category}</span>
              </Link>
            </li>
          ))}
          {query && results.length === 0 ? (
            <li className="command-palette__empty" role="status">No results for “{query}”</li>
          ) : null}
        </ul>
        <p className="command-palette__hint">Press ⌘K to toggle · Enter to navigate · Esc to close</p>
      </div>
    </div>
  )
}
