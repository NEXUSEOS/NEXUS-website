import { useEffect, useMemo, useState } from 'react'

export type DeviceTier = 'high' | 'medium' | 'low' | 'minimal'

export interface DeviceCapability {
  tier: DeviceTier
  reducedMotion: boolean
  saveData: boolean
  isMobile: boolean
  particleBudget: number
  blurBudget: number
  enableWebGL: boolean
}

function detectGpuTier(): DeviceTier {
  if (typeof window === 'undefined') return 'medium'
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')
    if (!gl) return 'low'
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return 'medium'
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
    if (/swiftshader|llvmpipe|software/i.test(renderer)) return 'low'
    return 'high'
  } catch {
    return 'medium'
  }
}

function particleBudgetForTier(tier: DeviceTier, reducedMotion: boolean): number {
  if (reducedMotion) return 0
  switch (tier) {
    case 'high': return 220
    case 'medium': return 140
    case 'low': return 60
    case 'minimal': return 0
  }
}

function blurBudgetForTier(tier: DeviceTier, reducedMotion: boolean): number {
  if (reducedMotion) return 0
  switch (tier) {
    case 'high': return 24
    case 'medium': return 16
    case 'low': return 8
    case 'minimal': return 0
  }
}

export function computeDeviceCapability(): DeviceCapability {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  let tier = detectGpuTier()
  if (saveData || isMobile) tier = tier === 'high' ? 'medium' : tier === 'medium' ? 'low' : 'minimal'
  if (reducedMotion) tier = 'minimal'

  return {
    tier,
    reducedMotion,
    saveData,
    isMobile,
    particleBudget: particleBudgetForTier(tier, reducedMotion),
    blurBudget: blurBudgetForTier(tier, reducedMotion),
    enableWebGL: tier === 'high' || tier === 'medium',
  }
}

/** Detect GPU tier, reduced motion, and low-power mode to scale cinematic effects. */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => computeDeviceCapability())

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setCapability(computeDeviceCapability())
    motionQuery.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return useMemo(() => capability, [capability])
}
