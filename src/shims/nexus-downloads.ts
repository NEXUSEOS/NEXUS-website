import type { DownloadMetadata } from './nexus-config'

type Component<T> = import('react').ComponentType<T>

export interface DownloadCenterProps {
  title?: string
  description?: string
}

export const DownloadCenter = null as unknown as Component<DownloadCenterProps>

export const DownloadCard = null as unknown as Component<{
  item: DownloadMetadata
  onDownload: (item: DownloadMetadata) => void
  downloading: boolean
  message?: string | null
}>

export const STUDIO_PRODUCT = null as unknown as string
export const STUDIO_VERSION = null as unknown as string
export const getDownloadById = null as unknown as (id: string) => DownloadMetadata | undefined
export const getUserDownloads = null as unknown as (userId: string) => Promise<unknown[]>
export const initiateDownload = null as unknown as (
  userId: string,
  item: DownloadMetadata,
) => Promise<{ message: string }>
export const initiateStudioDownload = null as unknown as (userId: string) => Promise<{ message: string }>
export const recordDownload = null as unknown as (userId: string, productSlug: string) => Promise<void>
