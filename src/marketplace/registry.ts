import type { MarketplacePackage, PackageVersion } from './types'

/** Package registry architecture — owner: nexus-marketplace */
export interface PackageRegistry {
  packages: MarketplacePackage[]
  versions: Record<string, PackageVersion[]>
}

export const registryCapabilities = {
  storage: 'Immutable versioned artifacts with checksum verification.',
  indexing: 'Search by robot compatibility, category, author, semver.',
  access: 'Public, organization-scoped, and private channels.',
  signing: 'Package signatures verified on publish and install.',
} as const

export function getPackageVersions(registry: PackageRegistry, packageId: string): PackageVersion[] {
  return registry.versions[packageId] ?? []
}
