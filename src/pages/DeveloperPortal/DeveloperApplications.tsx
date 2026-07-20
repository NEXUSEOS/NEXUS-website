import { Heading, Text } from '../../components/ui'

export default function DeveloperApplications() {
  return (
    <section aria-labelledby="applications-title">
      <Heading as="h1" level="heading" id="applications-title">Applications</Heading>
      <Text variant="muted">Register OAuth applications and manage client credentials for third-party integrations.</Text>
      <p>Use API Keys to authenticate SDK and CLI tooling. OAuth application registration opens in a future release.</p>
    </section>
  )
}
