import { useCallback, useState } from 'react'
import { behaviorService } from '../behaviorService'
import type { BehaviorDraftPayload, BehaviorMetadata } from '../types'

export function useBehaviors() {
  const [behaviors, setBehaviors] = useState<BehaviorMetadata[]>(() => behaviorService.list())

  const refresh = useCallback(() => {
    setBehaviors(behaviorService.list())
  }, [])

  return {
    behaviors,
    refresh,
    createDraft: (author: string, payload: BehaviorDraftPayload) => {
      const created = behaviorService.createDraft(author, payload)
      refresh()
      return created
    },
    updateDraft: (id: string, payload: Partial<BehaviorDraftPayload>) => {
      const updated = behaviorService.updateDraft(id, payload)
      refresh()
      return updated
    },
    clone: (id: string, author: string) => {
      const cloned = behaviorService.cloneBehavior(id, author)
      refresh()
      return cloned
    },
    publish: (id: string) => {
      const published = behaviorService.publishDraft(id)
      refresh()
      return published
    },
    archive: (id: string) => {
      const archived = behaviorService.archiveBehavior(id)
      refresh()
      return archived
    },
    version: (id: string, changelog?: string) => {
      const version = behaviorService.versionBehavior(id, changelog)
      refresh()
      return version
    },
  }
}
