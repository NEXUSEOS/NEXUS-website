import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeMode } from '@nexus/theme'
import AuthProvider from './contexts/AuthProvider'
import { loadCloudFeatureFlags } from './config/features'
import LoadingFallback from './router/LoadingFallback'
import '@nexus/design-system/globals.css'
import '@nexus/theme/globals.css'
import App from './App.tsx'

function readStoredTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('nexus-theme-mode')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function Bootstrap() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    applyThemeMode(readStoredTheme())
    loadCloudFeatureFlags()
      .catch(() => ({}))
      .finally(() => setReady(true))
  }, [])

  if (!ready) return <LoadingFallback />

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
)
