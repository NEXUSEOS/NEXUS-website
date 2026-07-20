/** Cloud-driven feature flags — call loadCloudFeatureFlags() at app bootstrap. */
export { loadCloudFeatureFlags, getCloudFeatureFlags, isCloudFeatureEnabled, isFeatureEnabled } from '../services/platform/featureFlagService'
export type { FeatureFlag } from '../services/platform/featureFlagService'
