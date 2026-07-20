import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text } from '@nexus/ui'
import { fetchAdminJobs, fetchJobStats, fetchSchedulerJobs } from '../../services/platform/platformAdminService'

export default function AdminJobs() {
  const [jobs, setJobs] = useState<unknown[]>([])
  const [stats, setStats] = useState<Record<string, number>>({})
  const [schedules, setSchedules] = useState<unknown[]>([])

  useEffect(() => {
    void Promise.all([fetchAdminJobs(), fetchJobStats(), fetchSchedulerJobs()]).then(([j, s, sch]) => {
      setJobs(j.jobs)
      setStats(s)
      setSchedules(sch.jobs)
    })
  }, [])

  return (
    <GlassPanel className="admin-page">
      <Heading as="h2" level="title">Jobs & Queues</Heading>
      <Text variant="caption">Background workers, scheduler, queue dashboard</Text>
      <Text variant="caption">Queue stats: {JSON.stringify(stats)}</Text>
      <Heading as="h3" level="title">Scheduled Jobs</Heading>
      <ul>{schedules.map((s) => <li key={JSON.stringify(s)}><Text variant="muted">{JSON.stringify(s)}</Text></li>)}</ul>
      <Heading as="h3" level="title">Recent Jobs</Heading>
      <ul>{jobs.slice(0, 20).map((j) => <li key={JSON.stringify(j)}><Text variant="muted">{JSON.stringify(j)}</Text></li>)}</ul>
    </GlassPanel>
  )
}
