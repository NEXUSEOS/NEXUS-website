export {
  BEHAVIOR_PACKAGE_VERSION,
  BehaviorPackageLayout,
  requiredDirectories,
  optionalDirectories,
} from './manifest'
export type {
  BehaviorPackageDependency,
  BehaviorPackageLayoutKey,
  BehaviorPackageManifest,
  BehaviorPackagePermission,
} from './manifest'
export { validateBehaviorManifest, versioningRules } from './validation'
export type { ValidationIssue, ValidationResult } from './validation'
