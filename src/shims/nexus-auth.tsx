import { createContext, useContext, type ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import type { Session, User } from '@supabase/supabase-js'
import { routes } from './nexus-config'
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
  VIEWER: 'viewer',
  DEVELOPER: 'developer',
  SPONSOR: 'sponsor',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  ADMINISTRATOR: 'administrator',
  SUPER_ADMINISTRATOR: 'super_administrator',
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

const defaultAuthContext: AuthContextValue = {
  user: null,
  session: null,
  loading: false,
  isConfigured: false,
  profile: null,
  settings: null,
  profileLoading: false,
  refreshProfile: async () => undefined,
  signOutUser: async () => undefined,
}

export const AuthContext = createContext<AuthContextValue | null>(defaultAuthContext)

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={defaultAuthContext}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext) ?? defaultAuthContext
}

export function usePermissions() {
  return {
    role: RoleName.VISITOR,
    isAuthenticated: false,
    hasPermission: (_permission: PermissionKey) => false,
    hasRole: (_allowedRoles: RoleName[]) => false,
  }
}

export interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

/** Production shim — redirects unauthenticated users; allows public browsing when auth is not configured. */
export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { user, loading, isConfigured } = useAuth()
  const location = useLocation()

  if (!isConfigured) {
    return (
      <section className="auth-layout">
        <div className="auth-layout__panel glass-panel">
          <h1>Authentication unavailable</h1>
          <p>Cloud services are not configured for this deployment. Sign-in protected areas require Supabase configuration.</p>
          <Link to={routes.home.path} className="button button--primary">Return Home</Link>
        </div>
      </section>
    )
  }

  if (loading) {
    return <div className="loading-fallback" role="status">Loading…</div>
  }

  if (!user) {
    return <Navigate to={redirectTo ?? routes.login.path} state={{ from: location }} replace />
  }

  return children
}

export interface RoleGuardProps {
  children: ReactNode
  allowedRoles: readonly RoleName[]
  portalName: string
}

/** Production shim — shows access notice when role requirements are not met. */
export function RoleGuard({ children, allowedRoles, portalName }: RoleGuardProps) {
  const { hasRole, isAuthenticated, role } = usePermissions()

  if (!isAuthenticated) {
    return null
  }

  if (!hasRole([...allowedRoles])) {
    return (
      <section className="auth-layout">
        <div className="auth-layout__panel glass-panel">
          <h1>Access Restricted</h1>
          <p>
            The {portalName} requires elevated permissions. Your current role is <strong>{role}</strong>.
          </p>
          <div className="auth-form__links">
            <Link to={routes.developers.path} className="auth-form__link">Learn about Developer access</Link>
            <Link to={routes.sponsors.path} className="auth-form__link">Learn about Sponsor access</Link>
            <Link to={routes.contact.path} className="auth-form__link">Contact NEXUS</Link>
          </div>
        </div>
      </section>
    )
  }

  return children
}

export interface PermissionGuardProps {
  children: ReactNode
  permission: PermissionKey
  resourceName?: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, fallback = null }: PermissionGuardProps) {
  return fallback ?? children
}

export interface SignUpPayload {
  email: string
  password: string
  fullName: string
}

export interface SignInPayload {
  email: string
  password: string
}

export async function signUp(_payload: SignUpPayload): Promise<{ error: Error | null }> {
  return { error: new Error('Authentication is not configured in this deployment.') }
}

export async function signIn(_payload: SignInPayload): Promise<{ error: Error | null }> {
  return { error: new Error('Authentication is not configured in this deployment.') }
}

export async function signOut(): Promise<{ error: Error | null }> {
  return { error: null }
}

export async function resetPassword(_email: string): Promise<{ error: Error | null }> {
  return { error: new Error('Authentication is not configured in this deployment.') }
}

export async function updatePassword(_password: string): Promise<{ error: Error | null }> {
  return { error: new Error('Authentication is not configured in this deployment.') }
}

export async function resendVerificationEmail(_email: string): Promise<{ error: Error | null }> {
  return { error: new Error('Authentication is not configured in this deployment.') }
}

export function getAuthConfigurationStatus() {
  return {
    configured: false,
    message: 'Supabase credentials are not configured for GitHub Pages deployment.',
  }
}

export async function getProfile(_userId: string): Promise<Profile | null> {
  return null
}

export async function getUserSettings(_userId: string): Promise<UserSettings | null> {
  return null
}

export async function updateProfile(_userId: string, _payload: ProfileUpdatePayload): Promise<Profile> {
  throw new Error('Authentication is not configured in this deployment.')
}

export async function updateUserSettings(
  _userId: string,
  _payload: UserSettingsUpdatePayload,
): Promise<UserSettings> {
  throw new Error('Authentication is not configured in this deployment.')
}

export async function uploadAvatar(_userId: string, _file: File): Promise<string> {
  throw new Error('Authentication is not configured in this deployment.')
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export const supabase = null as unknown as import('@supabase/supabase-js').SupabaseClient | null
