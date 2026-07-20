import '../../components/layout/PageShell.css'
import { ProfileAvatar, ProfileForm } from '../../components/profile'
import { PageMeta } from '../../components/seo'
import { Container, Heading, Section, Text } from '../../components/ui'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import LoadingFallback from '../../router/LoadingFallback'

export default function AccountSettings() {
  const { user, profile, settings, profileLoading, refreshProfile } = useAuth()

  if (profileLoading && !profile) {
    return <LoadingFallback />
  }

  return (
    <>
      <PageMeta
        title={routes.account.title}
        description={routes.account.description}
        path={routes.account.path}
      />
      <Section>
        <Container>
          <div className="page-shell">
            <div className="page-shell__inner">
              <ProfileAvatar profile={profile} email={user?.email} />
              <Heading as="h1" level="heading">
                Account Settings
              </Heading>
              <Text variant="muted">{user?.email}</Text>
              {user ? (
                <ProfileForm
                  userId={user.id}
                  profile={profile}
                  settings={settings}
                  onUpdated={refreshProfile}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
