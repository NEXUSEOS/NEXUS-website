/** @nexus/sdk-vision API contract — implementation owner: nexus-sdk */

export interface VisionApi {
  openStream(config: CameraConfig): Promise<VisionStream>
  runInference(request: InferenceRequest): Promise<InferenceResult>
  closeStream(streamId: string): Promise<void>
}

export interface CameraConfig {
  deviceId: string
  resolution: { width: number; height: number }
  fps: number
}

export interface VisionStream {
  streamId: string
  deviceId: string
}

export interface InferenceRequest {
  streamId: string
  modelId: string
  regionOfInterest?: BoundingBox
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface InferenceResult {
  labels: { name: string; confidence: number }[]
  timestamp: string
}
