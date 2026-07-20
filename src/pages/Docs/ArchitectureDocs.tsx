import { Link, useParams } from 'react-router-dom'
import { ContentLayout } from '../../components/content'
import { routes } from '../../config/routes'
import {
  architectureDocs,
  currentWebsiteCompliance,
  designApprovalPipeline,
  designGovernanceRules,
  ecosystemOwnership,
  governedFutureUis,
  getArchitectureDoc,
} from '../../architecture'
import {
  BehaviorPackageLayout,
  BEHAVIOR_PACKAGE_VERSION,
  behaviorPipeline,
  requiredDirectories,
  validateBehaviorManifest,
  versioningRules,
} from '../../behavior'
import { compatibilityChecks, publishingFlow, registryCapabilities, reviewSystem, updateSystem, ratingsSystem, reviewsSystem, analyticsSystem, distributionSystem, uploadSystem } from '../../marketplace'
import { cliCommands, digitalTwinInterfaces, sdkApiModules } from '../../sdk'
import { GlassPanel, Heading, Text } from '../../components/ui'
import NotFound from '../NotFound/NotFound'

const architectureNav = architectureDocs.map((doc) => ({
  label: doc.title,
  path: `${routes.docsArchitecture.path}/${doc.id}`,
}))

export default function ArchitectureHub() {
  return (
    <ContentLayout
      title="Architecture"
      description="Cross-repository specifications for behaviors, SDK, marketplace, and Digital Twin."
      path={routes.docsArchitecture.path}
      navigation={[
        { label: 'Overview', path: routes.docsArchitecture.path, end: true },
        ...architectureNav,
      ]}
    >
      <Heading as="h1" level="heading">
        NEXUS Architecture
      </Heading>
      <Text variant="muted">
        Architecture-only specifications. No hardware runtime or robot control in this repository.
      </Text>

      <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
        {architectureDocs.map((doc) => (
          <GlassPanel key={doc.id} className="download-card">
            <Text variant="caption">Owner: {doc.owner}</Text>
            <Heading as="h2" level="title">
              {doc.title}
            </Heading>
            <Text variant="muted">{doc.description}</Text>
            <Link to={`${routes.docsArchitecture.path}/${doc.id}`} className="button button--secondary">
              Read specification
            </Link>
          </GlassPanel>
        ))}
      </div>
    </ContentLayout>
  )
}

export function ArchitectureDocPage() {
  const { docId } = useParams<{ docId: string }>()
  const doc = docId ? getArchitectureDoc(docId) : undefined

  if (!doc) return <NotFound />

  return (
    <ContentLayout
      title={doc.title}
      description={doc.description}
      path={`${routes.docsArchitecture.path}/${doc.id}`}
      navigation={[
        { label: 'Overview', path: routes.docsArchitecture.path, end: true },
        ...architectureNav.map((item) => ({ ...item, end: item.path.endsWith(doc.id) })),
      ]}
    >
      <Heading as="h1" level="heading">
        {doc.title}
      </Heading>
      <Text variant="caption">Owner: {doc.owner}</Text>
      <Text variant="muted">{doc.description}</Text>

      {doc.id === 'behavior-package' ? <BehaviorPackageDoc /> : null}
      {doc.id === 'marketplace-pipeline' ? <MarketplacePipelineDoc /> : null}
      {doc.id === 'sdk-cli' ? <SdkCliDoc /> : null}
      {doc.id === 'digital-twin' ? <DigitalTwinDoc /> : null}
      {doc.id === 'ecosystem-ownership' ? <OwnershipDoc /> : null}
      {doc.id === 'design-governance' ? <DesignGovernanceDoc /> : null}
    </ContentLayout>
  )
}

function BehaviorPackageDoc() {
  const sample = validateBehaviorManifest({
    schemaVersion: BEHAVIOR_PACKAGE_VERSION,
    id: '@nexus/example-greet',
    name: 'Example Greet',
    version: '0.1.0',
    description: 'Sample behavior package.',
    author: 'NEXUS',
    license: 'Apache-2.0',
    robotCompatibility: ['nexus-atlas'],
    requiredSensors: [],
    requiredHardware: [],
    requiredAiModels: [],
    motionDependencies: [],
    permissions: [{ id: 'speech.output', reason: 'Greeting speech' }],
    safetyLevel: 'supervised',
    categories: ['social'],
    tags: ['demo'],
    dependencies: [],
    sdkMinimum: '0.2.0',
    entrypoint: 'scripts/main.ts',
  })

  return (
    <GlassPanel className="download-card" style={{ marginTop: 'var(--spacing-8)' }}>
      <Heading as="h2" level="title">
        Package Layout
      </Heading>
      <ul className="tier-card__benefits">
        {Object.entries(BehaviorPackageLayout).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
            {requiredDirectories.includes(key as keyof typeof BehaviorPackageLayout) ? ' (required)' : ''}
          </li>
        ))}
      </ul>
      <Heading as="h3" level="title">
        Versioning
      </Heading>
      <Text variant="muted">{versioningRules.packageVersion}</Text>
      <Text variant="muted">{versioningRules.schemaVersion}</Text>
      <Heading as="h3" level="title">
        Sample Validation
      </Heading>
      <Text variant="body">Valid: {sample.valid ? 'yes' : 'no'}</Text>
      <Text variant="caption">{sample.issues.length} issue(s) reported</Text>
    </GlassPanel>
  )
}

function MarketplacePipelineDoc() {
  return (
    <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Publishing Flow
        </Heading>
        <ul className="tier-card__benefits">
          {publishingFlow.map((step) => (
            <li key={step.step}>
              {step.step}. {step.action} ({step.owner})
            </li>
          ))}
        </ul>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Registry
        </Heading>
        {Object.entries(registryCapabilities).map(([key, value]) => (
          <Text key={key} variant="muted">
            {key}: {value}
          </Text>
        ))}
        <Heading as="h3" level="title">
          Review
        </Heading>
        <Text variant="muted">Modes: {reviewSystem.modes.join(', ')}</Text>
        <Heading as="h3" level="title">
          Updates
        </Heading>
        <Text variant="muted">{updateSystem.strategy}</Text>
        <Text variant="muted">{updateSystem.rollback}</Text>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Compatibility
        </Heading>
        {Object.entries(compatibilityChecks).map(([key, value]) => (
          <Text key={key} variant="muted">
            {key}: {value}
          </Text>
        ))}
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Upload &amp; Distribution
        </Heading>
        <Text variant="muted">{uploadSystem.entry}</Text>
        <Text variant="muted">{uploadSystem.validation}</Text>
        <Text variant="muted">{uploadSystem.artifact}</Text>
        <Text variant="muted">Channels: {distributionSystem.channels.join(', ')}</Text>
        <Text variant="muted">{distributionSystem.delivery}</Text>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Ratings &amp; Reviews
        </Heading>
        <Text variant="muted">{ratingsSystem.scale}</Text>
        <Text variant="muted">{reviewsSystem.requirements}</Text>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Analytics
        </Heading>
        <Text variant="muted">Metrics: {analyticsSystem.metrics.join(', ')}</Text>
        <Text variant="muted">Owner: {analyticsSystem.owner}</Text>
      </GlassPanel>
    </div>
  )
}

function SdkCliDoc() {
  return (
    <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          CLI Commands
        </Heading>
        <ul className="tier-card__benefits">
          {cliCommands.map((cmd) => (
            <li key={cmd.name}>
              <strong>{cmd.name}</strong> — {cmd.description}
            </li>
          ))}
        </ul>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          SDK API Modules
        </Heading>
        <ul className="tier-card__benefits">
          {sdkApiModules.map((mod) => (
            <li key={mod.id}>
              {mod.package} ({mod.owner})
            </li>
          ))}
        </ul>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Behavior Pipeline
        </Heading>
        <ul className="tier-card__benefits">
          {behaviorPipeline.map((stage) => (
            <li key={stage.id}>
              {stage.label} — {stage.owner}
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}

function DigitalTwinDoc() {
  return (
    <GlassPanel className="download-card" style={{ marginTop: 'var(--spacing-8)' }}>
      <Heading as="h2" level="title">
        Interface Catalog
      </Heading>
      <Text variant="muted">No simulation engine in nexus-website — interfaces only.</Text>
      <ul className="tier-card__benefits">
        {digitalTwinInterfaces.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </GlassPanel>
  )
}

function OwnershipDoc() {
  return (
    <GlassPanel className="download-card" style={{ marginTop: 'var(--spacing-8)' }}>
      <ul className="tier-card__benefits">
        {ecosystemOwnership.map((entry) => (
          <li key={entry.feature}>
            <strong>{entry.feature}</strong> → {entry.owner}
          </li>
        ))}
      </ul>
    </GlassPanel>
  )
}

function DesignGovernanceDoc() {
  return (
    <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Approval Pipeline
        </Heading>
        <ul className="tier-card__benefits">
          {designApprovalPipeline.map((stage) => (
            <li key={stage.stage}>
              {stage.stage} ({stage.owner}) — {stage.output}
            </li>
          ))}
        </ul>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Governed Future UIs
        </Heading>
        <ul className="tier-card__benefits">
          {governedFutureUis.map((ui) => (
            <li key={ui.name}>
              {ui.name} — {ui.owner} ({ui.status})
            </li>
          ))}
        </ul>
      </GlassPanel>
      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Website Compliance
        </Heading>
        <Text variant="muted">Status: {currentWebsiteCompliance.status}</Text>
        <ul className="tier-card__benefits">
          {designGovernanceRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}
