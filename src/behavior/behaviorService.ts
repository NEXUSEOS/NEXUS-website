const STORAGE_KEY = 'nexus-behavior-workspace-v1'

import {
  BehaviorStatus,
  SafetyLevel,
  type BehaviorDraftPayload,
  type BehaviorMetadata,
  type BehaviorVersion,
} from './types'

function readStore(): BehaviorMetadata[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as BehaviorMetadata[]) : []
    return parsed.map(normalizeStoredBehavior)
  } catch {
    return []
  }
}

function normalizeStoredBehavior(record: BehaviorMetadata): BehaviorMetadata {
  const aiModels = record.aiModels ?? record.requiredAiModels ?? []
  const motionPacks = record.motionPacks ?? record.motionDependencies ?? []

  return {
    ...record,
    requiredAiModels: aiModels,
    aiModels,
    motionDependencies: motionPacks,
    motionPacks,
    dependencies: record.dependencies ?? [],
  }
}

function writeStore(behaviors: BehaviorMetadata[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(behaviors))
}

function generateId(): string {
  return `behavior_${crypto.randomUUID()}`
}

function normalizeMetadataFields(payload: BehaviorDraftPayload) {
  const aiModels = payload.aiModels ?? payload.requiredAiModels ?? []
  const motionPacks = payload.motionPacks ?? payload.motionDependencies ?? []
  const dependencies = payload.dependencies ?? []

  return {
    requiredAiModels: aiModels,
    aiModels,
    motionDependencies: motionPacks,
    motionPacks,
    dependencies,
  }
}

function bumpPatchVersion(version: string): string {
  const parts = version.split('.').map(Number)
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    parts[2] += 1
    return parts.join('.')
  }
  return '0.1.0'
}

/** Local behavior persistence — architecture preview until nexus-cloud API. */
export const behaviorService = {
  list(): BehaviorMetadata[] {
    return readStore().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  },

  get(behaviorId: string): BehaviorMetadata | undefined {
    return readStore().find((b) => b.behaviorId === behaviorId)
  },

  createDraft(author: string, payload: BehaviorDraftPayload): BehaviorMetadata {
    const now = new Date().toISOString()
    const metadataFields = normalizeMetadataFields(payload)
    const behavior: BehaviorMetadata = {
      behaviorId: generateId(),
      name: payload.name,
      version: '0.1.0',
      author,
      description: payload.description,
      robotCompatibility: payload.robotCompatibility ?? [],
      requiredSensors: payload.requiredSensors ?? [],
      requiredHardware: payload.requiredHardware ?? [],
      ...metadataFields,
      permissions: payload.permissions ?? [],
      safetyLevel: payload.safetyLevel ?? SafetyLevel.SUPERVISED,
      categories: payload.categories ?? [],
      tags: payload.tags ?? [],
      license: payload.license ?? 'Proprietary',
      status: BehaviorStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    }

    const behaviors = readStore()
    behaviors.push(behavior)
    writeStore(behaviors)
    return behavior
  },

  updateDraft(behaviorId: string, payload: Partial<BehaviorDraftPayload>): BehaviorMetadata {
    const behaviors = readStore()
    const index = behaviors.findIndex((b) => b.behaviorId === behaviorId)
    if (index === -1) throw new Error('Behavior not found.')

    const current = behaviors[index]
    if (current.status === BehaviorStatus.ARCHIVED) {
      throw new Error('Archived behaviors cannot be edited.')
    }

    const updated: BehaviorMetadata = {
      ...current,
      ...payload,
      ...normalizeMetadataFields({ ...current, ...payload }),
      updatedAt: new Date().toISOString(),
    }
    behaviors[index] = updated
    writeStore(behaviors)
    return updated
  },

  saveDraft(behaviorId: string): BehaviorMetadata {
    return this.updateDraft(behaviorId, {})
  },

  /** Spec alias — persists the current draft metadata. */
  saveBehavior(behaviorId: string): BehaviorMetadata {
    return this.saveDraft(behaviorId)
  },

  versionBehavior(behaviorId: string, changelog?: string): BehaviorVersion {
    const behavior = this.get(behaviorId)
    if (!behavior) throw new Error('Behavior not found.')

    const nextVersion = bumpPatchVersion(behavior.version)
    const updated = this.updateDraft(behaviorId, {})
    updated.version = nextVersion
    updated.updatedAt = new Date().toISOString()

    const behaviors = readStore()
    const index = behaviors.findIndex((b) => b.behaviorId === behaviorId)
    behaviors[index] = updated
    writeStore(behaviors)

    return {
      version: nextVersion,
      behaviorId,
      createdAt: updated.updatedAt,
      status: updated.status,
      changelog,
    }
  },

  cloneBehavior(behaviorId: string, author: string): BehaviorMetadata {
    const source = this.get(behaviorId)
    if (!source) throw new Error('Behavior not found.')

    return this.createDraft(author, {
      name: `${source.name} (Copy)`,
      description: source.description,
      robotCompatibility: [...source.robotCompatibility],
      requiredSensors: [...source.requiredSensors],
      requiredHardware: [...source.requiredHardware],
      aiModels: [...source.aiModels],
      motionPacks: [...source.motionPacks],
      dependencies: [...source.dependencies],
      permissions: [...source.permissions],
      safetyLevel: source.safetyLevel,
      categories: [...source.categories],
      tags: [...source.tags],
      license: source.license,
    })
  },

  publishDraft(behaviorId: string): BehaviorMetadata {
    const behaviors = readStore()
    const index = behaviors.findIndex((b) => b.behaviorId === behaviorId)
    if (index === -1) throw new Error('Behavior not found.')

    const now = new Date().toISOString()
    behaviors[index] = {
      ...behaviors[index],
      status: BehaviorStatus.PUBLISHED,
      publishedAt: now,
      updatedAt: now,
    }
    writeStore(behaviors)
    return behaviors[index]
  },

  archiveBehavior(behaviorId: string): BehaviorMetadata {
    const behaviors = readStore()
    const index = behaviors.findIndex((b) => b.behaviorId === behaviorId)
    if (index === -1) throw new Error('Behavior not found.')

    behaviors[index] = {
      ...behaviors[index],
      status: BehaviorStatus.ARCHIVED,
      updatedAt: new Date().toISOString(),
    }
    writeStore(behaviors)
    return behaviors[index]
  },
}
