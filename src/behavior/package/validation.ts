import type { BehaviorPackageManifest } from './manifest'

export interface ValidationIssue {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  issues: ValidationIssue[]
}

const SEMVER_PATTERN = /^\d+\.\d+\.\d+(-[\w.-]+)?(\+[\w.-]+)?$/

/** Validation rules for behavior.json — architecture only; no file I/O. */
export function validateBehaviorManifest(manifest: Partial<BehaviorPackageManifest>): ValidationResult {
  const issues: ValidationIssue[] = []

  if (!manifest.schemaVersion) {
    issues.push({ field: 'schemaVersion', message: 'schemaVersion is required.', severity: 'error' })
  }

  if (!manifest.id?.match(/^[@a-z][\w.-]*\/[\w.-]+$/i) && !manifest.id?.match(/^[\w.-]+$/)) {
    issues.push({
      field: 'id',
      message: 'id must be a scoped slug (e.g. @nexus/example-greet) or valid identifier.',
      severity: 'error',
    })
  }

  if (!manifest.name?.trim()) {
    issues.push({ field: 'name', message: 'name is required.', severity: 'error' })
  }

  if (!manifest.version || !SEMVER_PATTERN.test(manifest.version)) {
    issues.push({ field: 'version', message: 'version must be valid semver.', severity: 'error' })
  }

  if (!manifest.description?.trim()) {
    issues.push({ field: 'description', message: 'description is required.', severity: 'error' })
  }

  if (!manifest.author?.trim()) {
    issues.push({ field: 'author', message: 'author is required.', severity: 'error' })
  }

  if (!manifest.license?.trim()) {
    issues.push({ field: 'license', message: 'LICENSE file reference requires license field.', severity: 'error' })
  }

  if (!manifest.entrypoint?.trim()) {
    issues.push({ field: 'entrypoint', message: 'entrypoint script path is required.', severity: 'error' })
  }

  if (!manifest.sdkMinimum || !SEMVER_PATTERN.test(manifest.sdkMinimum)) {
    issues.push({ field: 'sdkMinimum', message: 'sdkMinimum must be valid semver.', severity: 'error' })
  }

  if (!manifest.robotCompatibility?.length) {
    issues.push({
      field: 'robotCompatibility',
      message: 'At least one robot model must be declared.',
      severity: 'warning',
    })
  }

  if (!manifest.permissions?.length) {
    issues.push({
      field: 'permissions',
      message: 'Declare required runtime permissions.',
      severity: 'warning',
    })
  }

  manifest.dependencies?.forEach((dep, index) => {
    if (!dep.name || !dep.version) {
      issues.push({
        field: `dependencies[${index}]`,
        message: 'Each dependency requires name and version.',
        severity: 'error',
      })
    }
  })

  return {
    valid: !issues.some((issue) => issue.severity === 'error'),
    issues,
  }
}

/** Versioning rules — package version bumps follow semver; schemaVersion bumps are breaking. */
export const versioningRules = {
  packageVersion: 'Semantic versioning for behavior releases (major.minor.patch).',
  schemaVersion: 'Increment major when behavior.json schema changes incompatibly.',
  dependencyResolution: 'Exact or caret ranges resolved by nexus-sdk package manager.',
} as const
