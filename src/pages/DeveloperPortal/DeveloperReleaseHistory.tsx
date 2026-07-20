import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { listOrganizations, listOrgBehaviorVersions } from '../../services/developer/developerPortalService'

export default function DeveloperReleaseHistory() {
  const [versions, setVersions] = useState<Array<{ id: string; version: string; status: string; createdAt: string }>>([])

  useEffect(() => {
    void listOrganizations()
      .then((orgs) => (orgs[0] ? listOrgBehaviorVersions(orgs[0].id) : []))
      .then(setVersions)
      .catch(() => setVersions([]))
  }, [])

  return (
    <section aria-labelledby="release-history-title">
      <Heading as="h1" level="heading" id="release-history-title">Release History</Heading>
      <Text variant="muted">Behavior package versions and publish audit trail.</Text>
      <table style={{ marginTop: 'var(--spacing-6)', width: '100%' }}>
        <thead>
          <tr><th scope="col">Version</th><th scope="col">Status</th><th scope="col">Created</th></tr>
        </thead>
        <tbody>
          {versions.map((v) => (
            <tr key={v.id}>
              <td>{v.version}</td>
              <td>{v.status}</td>
              <td>{new Date(v.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
