import { useAuth } from './useAuth'

export function useProfile() {
  const { profile, settings, profileLoading, refreshProfile, user } = useAuth()

  return {
    profile,
    settings,
    profileLoading,
    refreshProfile,
    userId: user?.id ?? null,
    isAuthenticated: Boolean(user),
  }
}
