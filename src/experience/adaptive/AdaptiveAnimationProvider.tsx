import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { computeDeviceCapability, useDeviceCapability, type DeviceCapability } from './useDeviceCapability'

const AdaptiveContext = createContext<DeviceCapability>(computeDeviceCapability())

export function useAdaptiveAnimation(): DeviceCapability {
  return useContext(AdaptiveContext)
}

export interface AdaptiveAnimationProviderProps {
  children: ReactNode
}

/** Applies adaptive CSS custom properties based on device capability. */
export function AdaptiveAnimationProvider({ children }: AdaptiveAnimationProviderProps) {
  const capability = useDeviceCapability()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--cx-particle-budget', String(capability.particleBudget))
    root.style.setProperty('--cx-blur-budget', `${capability.blurBudget}px`)
    root.dataset.cxTier = capability.tier
    if (capability.reducedMotion) {
      root.dataset.reducedMotion = 'true'
    } else {
      delete root.dataset.reducedMotion
    }
  }, [capability])

  return (
    <AdaptiveContext.Provider value={capability}>
      {children}
    </AdaptiveContext.Provider>
  )
}
