import type { ReactNode } from 'react'
import { PageMeta } from '../seo'
import { Container, GlassPanel, Heading, Section, Text } from '../ui'
import './AuthForm.css'

interface AuthLayoutProps {
  title: string
  description: string
  path: string
  children: ReactNode
  notice?: string
}

export default function AuthLayout({ title, description, path, children, notice }: AuthLayoutProps) {
  return (
    <>
      <PageMeta title={title} description={description} path={path} />
      <Section>
        <Container>
          <div className="auth-layout">
            <GlassPanel className="auth-layout__panel">
              <div className="auth-layout__header">
                <Heading as="h1" level="title">
                  {title}
                </Heading>
                <Text variant="muted">{description}</Text>
              </div>
              {notice ? <div className="auth-layout__notice">{notice}</div> : null}
              {children}
            </GlassPanel>
          </div>
        </Container>
      </Section>
    </>
  )
}
