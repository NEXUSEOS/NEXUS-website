import { useEffect, useState } from 'react'
import { applyThemeMode } from '@nexus/theme'
import AuthProvider from './contexts/AuthProvider'
import { loadCloudFeatureFlags } from './config/features'
import LoadingFallback from './router/LoadingFallback'
import App from './App.tsx'

function readStoredTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('nexus-theme-mode')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function Bootstrap() {
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
