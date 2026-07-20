import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../config/routes'
import { Container, GlassPanel, Heading, Section, Text } from '../ui'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('NEXUS application error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Section>
          <Container>
            <GlassPanel className="auth-layout__panel">
              <div className="auth-layout__header">
                <Heading as="h1" level="title">
                  Something went wrong
                </Heading>
                <Text variant="muted">
                  An unexpected error occurred. Return to the homepage or contact NEXUS support.
                </Text>
              </div>
              <Link to={routes.home.path} className="button button--primary">
                Return Home
              </Link>
            </GlassPanel>
          </Container>
        </Section>
      )
    }

    return this.props.children
  }
}
