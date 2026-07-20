export {
  getAuthConfigurationStatus,
  resetPassword,
  resendVerificationEmail,
  signIn,
  signOut,
  signUp,
  updatePassword,
  getProfile,
  getUserSettings,
  updateProfile,
  updateUserSettings,
  uploadAvatar,
  isSupabaseConfigured,
  supabase,
} from '@nexus/auth'
export type { SignInPayload, SignUpPayload } from '@nexus/auth'
export {
  getDashboardMetrics,
  getPortalUsage,
  trackPortalEvent,
  trackPortalVisit,
} from '@nexus/analytics'
export type { DashboardMetrics, PortalEvent } from '@nexus/analytics'
export {
  getDownloadById,
  getUserDownloads,
  initiateDownload,
  initiateStudioDownload,
  recordDownload,
  STUDIO_PRODUCT,
  STUDIO_VERSION,
} from '@nexus/downloads'

export {
  ECOSYSTEM_REPOS,
  INTEGRATION_FEATURES,
  fetchEcosystemStatus,
  fetchSdkDownloads,
  fetchUpdateManifest,
  getWebsiteIntegrationClient,
} from './platform/integrationService'
export { getBetaClient, CLOUD_URL } from './platform/betaService'
