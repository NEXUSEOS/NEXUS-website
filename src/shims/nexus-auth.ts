import type { Session, User } from '@supabase/supabase-js'
import type { PermissionKey, ConfigRoleName } from './nexus-config'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  isConfigured: boolean
}

export type { Session, User }

export const RoleName = {
  VISITOR: 'visitor',
  DEVELOPER: 'developer',
  SPONSOR: 'sponsor',
  ADMINISTRATOR: 'administrator',
} as const satisfies Record<string, ConfigRoleName>

export type RoleName = ConfigRoleName

export interface Role {
  id: string
  name: RoleName
  description: string | null
  created_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  organization_id: string | null
  role_id: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
  role?: Role | null
  organization?: Organization | null
}

export interface UserSettings {
  id: string
  user_id: string
  email_notifications: boolean
  marketing_emails: boolean
  theme_preference: string
  created_at: string
  updated_at: string
}

export interface ProfileUpdatePayload {
  username?: string
  full_name?: string
  avatar_url?: string | null
  organization_id?: string | null
}

export interface UserSettingsUpdatePayload {
  email_notifications?: boolean
  marketing_emails?: boolean
  theme_preference?: string
}

export interface AuthContextValue extends AuthState {
  profile: Profile | null
  settings: UserSettings | null
  profileLoading: boolean
  refreshProfile: () => Promise<void>
  signOutUser: () => Promise<void>
}

type Component<T> = import('react').ComponentType<T>

export const AuthContext = null as unknown as import('react').Context<AuthContextValue | null>

export interface AuthProviderProps {
  children: import('react').ReactNode
}

export const AuthProvider = null as unknown as Component<AuthProviderProps>

export const useAuth = null as unknown as () => AuthContextValue

export const usePermissions = null as unknown as () => {
  role: RoleName
  isAuthenticated: boolean
  hasPermission: (permission: PermissionKey) => boolean
  hasRole: (allowedRoles: RoleName[]) => boolean
}

export const RoleGuard = null as unknown as Component<{
  children: import('react').ReactNode
  allowedRoles: readonly RoleName[]
  portalName: string
}>

export const PermissionGuard = null as unknown as Component<{
  children: import('react').ReactNode
  permission: PermissionKey
  resourceName?: string
  fallback?: import('react').ReactNode
}>

export const ProtectedRoute = null as unknown as Component<{
  children: import('react').ReactNode
  redirectTo?: string
}>

export interface SignUpPayload {
  email: string
  password: string
  fullName: string
}

export interface SignInPayload {
  email: string
  password: string
}

export const signUp = null as unknown as (payload: SignUpPayload) => Promise<{ error: Error | null }>
export const signIn = null as unknown as (payload: SignInPayload) => Promise<{ error: Error | null }>
export const signOut = null as unknown as () => Promise<{ error: Error | null }>
export const resetPassword = null as unknown as (email: string) => Promise<{ error: Error | null }>
export const updatePassword = null as unknown as (password: string) => Promise<{ error: Error | null }>
export const resendVerificationEmail = null as unknown as (
  email: string,
) => Promise<{ error: Error | null }>
export const getAuthConfigurationStatus = null as unknown as () => {
  configured: boolean
  message: string
}

export const getProfile = null as unknown as (userId: string) => Promise<Profile | null>
export const getUserSettings = null as unknown as (userId: string) => Promise<UserSettings | null>
export const updateProfile = null as unknown as (
  userId: string,
  payload: ProfileUpdatePayload,
) => Promise<Profile>
export const updateUserSettings = null as unknown as (
  userId: string,
  payload: UserSettingsUpdatePayload,
) => Promise<UserSettings>
export const uploadAvatar = null as unknown as (userId: string, file: File) => Promise<string>

export const isSupabaseConfigured = null as unknown as () => boolean
export const supabase = null as unknown as import('@supabase/supabase-js').SupabaseClient | null
