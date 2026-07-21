import type { Colors } from './nexus-theme'
import ParticleFieldCanvas from '../components/living-glass/ParticleFieldCanvas'

export type AetherPerformance = 'low' | 'medium' | 'high'

export type AetherTheme = {
  background: string
  surface: string
  accent: string
  accentSecondary: string
  textMuted: string
}

export type AetherMouse = { x: number; y: number; active: boolean }
export type DissolveState = Record<string, unknown>
export type FormationState = Record<string, unknown>
export type MaterializationState = Record<string, unknown>
export type DissolveLayerAPI = Record<string, unknown>
export type FormationEngineAPI = Record<string, unknown>
export type MaterializationLayerAPI = Record<string, unknown>
export type FormationTarget = Record<string, unknown>
export type AetherContextValue = Record<string, unknown>
export type DissolveControls = Record<string, unknown>
export type FormationEngineControls = Record<string, unknown>
export type MaterializationControls = Record<string, unknown>

type Component<T> = import('react').ComponentType<T>

export interface AetherProviderProps {
  children: import('react').ReactNode
  performance?: AetherPerformance
  colors?: Colors
}

/** EPIC 72 — Living particle field + volumetric mist for GitHub Pages shim mode. */
export function AetherBackground() {
  return (
    <div className="aether-shim-bg" aria-hidden="true">
      <div
        className="aether-shim-mist"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 184, 150, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(180, 131, 139, 0.08) 0%, transparent 50%), var(--color-background, #050505)',
          pointerEvents: 'none',
        }}
      />
      <ParticleFieldCanvas />
    </div>
  )
}

export function AetherProvider({ children }: AetherProviderProps) {
  return children
}

export const AetherScene = null as unknown as Component<Record<string, unknown>>
export const AmbientGlow = null as unknown as Component<Record<string, unknown>>
export const DepthFog = null as unknown as Component<Record<string, unknown>>
export const DissolveLayer = null as unknown as Component<Record<string, unknown>>
export const FormationEngine = null as unknown as Component<Record<string, unknown>>
export const MaterializationLayer = null as unknown as Component<Record<string, unknown>>
export const MistLayer = null as unknown as Component<Record<string, unknown>>
export const MouseField = null as unknown as Component<Record<string, unknown>>
export const ParticleCanvas = null as unknown as Component<Record<string, unknown>>
export const ParticleField = null as unknown as Component<Record<string, unknown>>

export const useAether = null as unknown as () => AetherContextValue
export const useDissolveLayer = null as unknown as () => DissolveControls
export const useFormationEngine = null as unknown as () => FormationEngineControls
export const useMaterializationLayer = null as unknown as () => MaterializationControls

export const AetherContext = null as unknown as import('react').Context<AetherContextValue | null>

export const PARTICLE_COUNTS = null as unknown as Record<AetherPerformance, number>
export const createAetherTheme = null as unknown as () => AetherTheme
export const createParticleData = null as unknown as (count: number) => {
  positions: Float32Array
  depths: Float32Array
  opacities: Float32Array
  seeds: Float32Array
}
