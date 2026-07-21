import { Link } from 'react-router-dom'
import { Heading, Text } from '@nexus/ui'
import './AdminMissionControlNav.css'

export interface MissionControlLink {
  label: string
  path: string
  description: string
  external?: boolean
}

const MISSION_CONTROL_LINKS: MissionControlLink[] = [
  { label: 'Platform Health', path: '/admin/monitoring', description: 'Live services, uptime, and health scoring' },
  { label: 'Connection Orchestrator', path: '/admin/connections', description: '41+ services, credentials, dependency graph' },
  { label: 'Live Services', path: '/admin/services', description: 'Registered platform services and probes' },
  { label: 'Repository', path: '/admin/deployment', description: 'GitHub, CI health, and deployment center' },
  { label: 'Cloud API', path: '/admin/config', description: 'Cloud configuration and environment registry' },
  { label: 'GitHub', path: 'https://github.com/NEXUSEOS', description: 'Organization repositories and workflows', external: true },
  { label: 'Supabase', path: '/admin/secrets', description: 'Database credentials and connection secrets' },
  { label: 'Marketplace', path: '/marketplace', description: 'Public marketplace and revenue overview' },
  { label: 'Billing', path: '/pricing', description: 'Subscriptions, sponsors, and commercial flows' },
  { label: 'CMS', path: '/admin/cms', description: 'Visual CMS builder and published content' },
  { label: 'Studio', path: '/studio', description: 'NEXUS Studio download and Command Center' },
  { label: 'SDK', path: '/sdk', description: 'Developer SDK landing and documentation' },
  { label: 'Digital Twin', path: '/atlas-engineering', description: 'Atlas engineering and digital twin hub' },
  { label: 'ROS', path: '/docs/architecture', description: 'ROS integration and architecture docs' },
  { label: 'Automation', path: '/admin/jobs', description: 'Scheduled jobs, queues, and automation engine' },
  { label: 'Executive KPIs', path: '/admin', description: 'Mission Control homepage KPI tiles' },
  { label: 'Alerts', path: '/admin/monitoring', description: 'Critical alerts and incident overview' },
  { label: 'Incidents', path: '/admin/recovery', description: 'Recovery center and incident response' },
  { label: 'Required Actions', path: '/admin', description: 'Action center on Mission Control homepage' },
  { label: 'Deployment', path: '/admin/deployment', description: 'GitHub Pages and production deployment' },
  { label: 'Security', path: '/admin/secrets', description: 'Secrets, RBAC, and security posture' },
  { label: 'Performance', path: '/status', description: 'Public status page and performance center' },
  { label: 'Accessibility', path: '/support', description: 'Support center and UX audit entry' },
  { label: 'Production Readiness', path: '/admin/installation', description: 'Installation wizard and readiness checks' },
  { label: 'Setup Wizard', path: '/admin/setup', description: 'Zero-manual-config administrator onboarding' },
  { label: 'Theme Editor', path: '/admin/theme', description: 'Liquid glass theme and design tokens' },
  { label: 'Events', path: '/admin/events', description: 'Platform events and audit stream' },
]

export default function AdminMissionControlNav() {
  return (
    <section className="mission-control-nav">
      <Heading as="h3" level="title">Quick Actions — One-Click Navigation</Heading>
      <Text variant="caption">Jump to every NEXUS subsystem from Mission Control.</Text>
      <div className="mission-control-nav__grid">
        {MISSION_CONTROL_LINKS.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.path}
              className="mission-control-nav__card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mission-control-nav__label">{link.label}</span>
              <span className="mission-control-nav__desc">{link.description}</span>
            </a>
          ) : (
            <Link key={link.label} to={link.path} className="mission-control-nav__card">
              <span className="mission-control-nav__label">{link.label}</span>
              <span className="mission-control-nav__desc">{link.description}</span>
            </Link>
          ),
        )}
      </div>
    </section>
  )
}
