import { useEffect, useState } from 'react'
import { GlassPanel, Button, Heading, Text } from '@nexus/ui'
import { applyThemeMode, applyThemeOverrides, themeTokensToCmsTheme } from '@nexus/theme'
import type { ThemeOverrides } from '@nexus/theme'
import { createWebsiteCmsClient } from '../../services/cms/cmsContentService'

const PORTALS = ['website', 'developer', 'sponsor', 'marketplace', 'documentation'] as const

export default function AdminThemeEditor() {
  const [portal, setPortal] = useState<(typeof PORTALS)[number]>('website')
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const [overrides, setOverrides] = useState<ThemeOverrides>({
    primaryColor: '#C9B896',
    accentColor: '#B4838B',
    glassIntensity: 0.06,
    blur: '20px',
    cornerRadius: 'md',
  })
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    applyThemeMode(mode)
    applyThemeOverrides(overrides)
  }, [mode, overrides])

  async function saveTheme() {
    const client = createWebsiteCmsClient()
    const tokens = await themeTokensToCmsTheme(mode)
    const merged = {
      ...tokens,
      colors: {
        ...tokens.colors,
        accent: overrides.primaryColor ?? tokens.colors.accent,
        accentSecondary: overrides.accentColor ?? tokens.colors.accentSecondary,
      },
    }
    const themes = await client.listThemes(portal)
    const existing = themes.find((t) => t.isDefault) ?? themes[0]
    if (!existing) {
      setMessage(`No theme for ${portal}`)
      return
    }
    await client.upsertTheme({
      id: existing.id,
      portal,
      name: existing.name,
      isDefault: true,
      lightTokens: mode === 'light' ? (merged as never) : existing.lightTokens,
      darkTokens: mode === 'dark' ? (merged as never) : existing.darkTokens,
    })
    setMessage(`Theme saved for ${portal} — updates live on next publish`)
  }

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Live Theme Editor</Heading>
      <Text variant="caption">Liquid glass · colors · typography · blur — saved to CMS</Text>

      <div className="admin-form-grid">
        <label>Portal<select value={portal} onChange={(e) => setPortal(e.target.value as typeof portal)}>{PORTALS.map((p) => <option key={p} value={p}>{p}</option>)}</select></label>
        <label>Mode<select value={mode} onChange={(e) => setMode(e.target.value as 'dark' | 'light')}><option value="dark">Dark</option><option value="light">Light</option></select></label>
        <label>Primary<input type="color" value={overrides.primaryColor ?? '#C9B896'} onChange={(e) => setOverrides({ ...overrides, primaryColor: e.target.value })} /></label>
        <label>Accent<input type="color" value={overrides.accentColor ?? '#B4838B'} onChange={(e) => setOverrides({ ...overrides, accentColor: e.target.value })} /></label>
        <label>Glass intensity<input type="range" min={0} max={0.2} step={0.01} value={overrides.glassIntensity ?? 0.06} onChange={(e) => setOverrides({ ...overrides, glassIntensity: Number(e.target.value) })} /></label>
        <label>Blur<input value={overrides.blur ?? '20px'} onChange={(e) => setOverrides({ ...overrides, blur: e.target.value })} /></label>
      </div>

      <Button variant="primary" onClick={() => void saveTheme()}>Save Theme</Button>
      {message && <Text variant="caption">{message}</Text>}
    </GlassPanel>
  )
}
