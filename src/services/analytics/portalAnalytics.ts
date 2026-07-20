const STORAGE_KEY = 'nexus-portal-analytics'

export interface PortalEvent {
  id: string
  user_id: string
  portal: string
  event_type: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface DashboardMetrics {
  totalDownloads: number
  portalVisits: number
  lastDownloadAt: string | null
  recentEvents: PortalEvent[]
}

function readEvents(): PortalEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PortalEvent[]) : []
  } catch {
    return []
  }
}

function writeEvents(events: PortalEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 500)))
}

export async function trackPortalEvent(
  userId: string,
  portal: string,
  eventType: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  const events = readEvents()
  events.unshift({
    id: crypto.randomUUID(),
    user_id: userId,
    portal,
    event_type: eventType,
    metadata: metadata ?? null,
    created_at: new Date().toISOString(),
  })
  writeEvents(events)
}

export async function trackPortalVisit(userId: string, portal: string): Promise<void> {
  await trackPortalEvent(userId, portal, 'visit')
}

export async function getPortalUsage(userId: string, portal: string): Promise<PortalEvent[]> {
  return readEvents().filter((e) => e.user_id === userId && e.portal === portal)
}

export async function getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
  const events = readEvents().filter((e) => e.user_id === userId)
  const visits = events.filter((e) => e.event_type === 'visit')
  const downloads = events.filter((e) => e.event_type === 'download')
  return {
    totalDownloads: downloads.length,
    portalVisits: visits.length,
    lastDownloadAt: downloads[0]?.created_at ?? null,
    recentEvents: events.slice(0, 20),
  }
}
