export type SoundEvent = 'materialize' | 'dissolve' | 'alert' | 'success' | 'navigate'

export interface SoundEngine {
  play: (event: SoundEvent) => void
  setEnabled: (enabled: boolean) => void
  isEnabled: () => boolean
}

/** No-op sound engine — interface ready for future audio integration. */
export const soundEngine: SoundEngine = {
  play() {
    /* no-op until audio assets are added */
  },
  setEnabled() {
    /* no-op */
  },
  isEnabled() {
    return false
  },
}
