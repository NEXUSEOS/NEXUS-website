import { Heading, Text } from '../../components/ui'

const SAMPLE_ROBOTS = [
  { id: 'robot-1', name: 'Lab Quadruped', platform: 'quadruped', status: 'online' },
  { id: 'robot-2', name: 'Warehouse AMR', platform: 'mobile-manipulator', status: 'provisioned' },
]

export default function DeveloperRobotRegistry() {
  return (
    <section aria-labelledby="robot-registry-title">
      <Heading as="h1" level="heading" id="robot-registry-title">Robot Registry</Heading>
      <Text variant="muted">Cloud-connected robot inventory. Scaffold with <code>nexus init --template quadruped-spot</code>.</Text>
      <table style={{ marginTop: 'var(--spacing-6)', width: '100%' }}>
        <thead>
          <tr><th scope="col">Name</th><th scope="col">Platform</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>
          {SAMPLE_ROBOTS.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.platform}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
