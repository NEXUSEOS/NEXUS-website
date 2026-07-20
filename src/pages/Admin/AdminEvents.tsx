import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchAdminEvents, fetchActivityTimeline } from '../../services/platform/platformAdminService'

export default function AdminEvents() {
  const [events, setEvents] = useState<unknown[]>([])
  const [timeline, setTimeline] = useState<unknown[]>([])

  useEffect(() => {
    void Promise.all([fetchAdminEvents(50), fetchActivityTimeline(50)]).then(([e, t]) => {
      setEvents(e.events)
      setTimeline(t.timeline)
    })
  }, [])

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Event Bus</Heading>
      <Text variant="caption">Platform events and activity timeline</Text>
      <Heading as="h3" level="title">Recent Events</Heading>
      <ul>{events.map((e) => <li key={JSON.stringify(e)}><Text variant="muted">{JSON.stringify(e)}</Text></li>)}</ul>
      <Heading as="h3" level="title">Activity Timeline</Heading>
      <ul>{timeline.map((e) => <li key={JSON.stringify(e)}><Text variant="muted">{JSON.stringify(e)}</Text></li>)}</ul>
    </GlassPanel>
  )
}
