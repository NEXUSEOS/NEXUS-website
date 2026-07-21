import { useCallback } from 'react'
import { soundEngine, type SoundEvent } from './SoundEngine'

/** Future-ready sound hook with no-op default. */
export function useSoundHook() {
  const play = useCallback((event: SoundEvent) => {
    soundEngine.play(event)
  }, [])

  return { play, enabled: soundEngine.isEnabled() }
}
