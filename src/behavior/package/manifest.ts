/**
 * NEXUS Behavior Package Manifest (behavior.json)
 * Canonical specification owner: nexus-sdk
 * Documentation owner: nexus-website
 */

export const BEHAVIOR_PACKAGE_VERSION = '1.0.0' as const

export const BehaviorPackageLayout = {
  manifest: 'behavior.json',
  readme: 'README.md',
  license: 'LICENSE',
  assets: 'assets/',
  motions: 'motions/',
  voice: 'voice/',
  vision: 'vision/',
  scripts: 'scripts/',
  tests: 'tests/',
  simulation: 'simulation/',
  examples: 'examples/',
} as const

export type BehaviorPackageLayoutKey = keyof typeof BehaviorPackageLayout

/** Required top-level directories in a distributable behavior package. */
export const requiredDirectories: BehaviorPackageLayoutKey[] = [
  'assets',
  'scripts',
  'tests',
  'simulation',
]

/** Optional directories — included when behavior uses motion, voice, or vision. */
export const optionalDirectories: BehaviorPackageLayoutKey[] = ['motions', 'voice', 'vision', 'examples']

export interface BehaviorPackageDependency {
  name: string
  version: string
  optional?: boolean
}

export interface BehaviorPackagePermission {
  id: string
  reason: string
}

export interface BehaviorPackageManifest {
  /** Schema version — semver of the package format spec. */
  schemaVersion: string
  /** Package identifier — reverse-DNS or nexus scoped slug. */
  id: string
  /** Human-readable name. */
  name: string
  /** Package semver — independent of schemaVersion. */
  version: string
  description: string
  author: string
  license: string
  /** Robot models this behavior supports. */
  robotCompatibility: string[]
  requiredSensors: string[]
  requiredHardware: string[]
  requiredAiModels: string[]
  motionDependencies: string[]
  permissions: BehaviorPackagePermission[]
  safetyLevel: 'monitor' | 'supervised' | 'autonomous' | 'restricted'
  categories: string[]
  tags: string[]
  dependencies: BehaviorPackageDependency[]
  /** Minimum NEXUS SDK version required to validate/simulate/install. */
  sdkMinimum: string
  /** Minimum nexus-os runtime version for on-robot installation. */
  runtimeMinimum?: string
  entrypoint: string
  simulationProfile?: string
}
