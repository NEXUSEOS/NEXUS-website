import { useEffect, useState } from 'react'
import { applyThemeMode, type ThemeMode } from '@nexus/theme'
import './ThemeToggle.css'

const STORAGE_KEY = 'nexus-theme-mode'

function readStoredMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode())

  useEffect(() => {
    applyThemeMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
