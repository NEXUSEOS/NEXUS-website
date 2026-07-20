/** @nexus/sdk-behavior API contract — implementation owner: nexus-sdk */

export interface BehaviorApi {
  createDraft(payload: CreateBehaviorPayload): Promise<BehaviorRecord>
  validatePackage(path: string): Promise<ValidationReport>
  packageBehavior(path: string, output: string): Promise<PackageArtifact>
  publishPackage(artifact: PackageArtifact): Promise<PublishResult>
  installPackage(id: string, version: string, target: InstallTarget): Promise<InstallResult>
  updatePackage(id: string, version: string): Promise<UpdateResult>
}

export interface CreateBehaviorPayload {
  name: string
  description: string
  robotCompatibility: string[]
}

export interface BehaviorRecord {
  id: string
  version: string
  status: 'draft' | 'validated' | 'published' | 'archived'
}

export interface ValidationReport {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface PackageArtifact {
  id: string
  version: string
  checksum: string
  sizeBytes: number
}

export interface PublishResult {
  registryUrl: string
  version: string
  publishedAt: string
}

export interface InstallTarget {
  type: 'simulation' | 'robot'
  targetId: string
}

export interface InstallResult {
  installedVersion: string
  targetId: string
}

export interface UpdateResult {
  previousVersion: string
  currentVersion: string
}
