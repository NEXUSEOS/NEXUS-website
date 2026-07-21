import { NavLink, Outlet } from 'react-router-dom'
import { GlassPanel, Heading, Text } from '@nexus/ui'
import './AdminLayout.css'
import '../pages/Admin/AdminPages.css'

const ADMIN_NAV: Array<{ path: string; label: string; end?: boolean }> = [
  { path: '/admin', label: 'Mission Control', end: true },
  { path: '/admin/cms', label: 'Visual CMS' },
  { path: '/admin/theme', label: 'Theme Editor' },
  { path: '/admin/services', label: 'Services' },
  { path: '/admin/config', label: 'Configuration' },
  { path: '/admin/secrets', label: 'Secrets' },
  { path: '/admin/jobs', label: 'Jobs & Queues' },
  { path: '/admin/events', label: 'Events' },
  { path: '/admin/deployment', label: 'Deployment' },
  { path: '/admin/monitoring', label: 'Monitoring' },
  { path: '/admin/recovery', label: 'Recovery' },
  { path: '/admin/connections', label: 'Connections' },
  { path: '/admin/installation', label: 'Installation Center' },
  { path: '/admin/setup', label: 'Setup Wizard' },
] as const satisfies Array<{ path: string; label: string; end?: boolean }>

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <GlassPanel className="admin-layout__sidebar">
        <Heading as="h1" level="title">Platform Control Center</Heading>
        <Text variant="caption">NEXUS Administration</Text>
        <nav className="admin-layout__nav" aria-label="Platform administration">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-layout__link${isActive ? ' admin-layout__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </GlassPanel>
      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  )
}
