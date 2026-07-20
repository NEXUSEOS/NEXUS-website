/**
 * Digital Twin interface specifications — implementation owner: nexus-sdk
 * No simulation engine in this repository.
 */

export interface DigitalTwinLidar {
  id: string
  sampleRateHz: number
  rangeMeters: number
  angularResolutionDegrees: number
  channels: number
  frameId: string
}

export interface DigitalTwinRobot {
  id: string
  model: string
  firmwareVersion: string
  joints: DigitalTwinJoint[]
  motors: DigitalTwinMotor[]
  battery: DigitalTwinBattery
  cameras: DigitalTwinCamera[]
  lidars: DigitalTwinLidar[]
  sensors: DigitalTwinSensor[]
  controller: DigitalTwinController
}

export interface DigitalTwinJoint {
  id: string
  name: string
  type: 'revolute' | 'prismatic' | 'fixed'
  limits: { min: number; max: number }
  position: number
}

export interface DigitalTwinMotor {
  id: string
  jointId: string
  maxTorque: number
  maxSpeed: number
  temperatureC?: number
}

export interface DigitalTwinBattery {
  capacityWh: number
  chargePercent: number
  voltage: number
  estimatedRuntimeMinutes: number
}

export interface DigitalTwinCamera {
  id: string
  resolution: { width: number; height: number }
  fps: number
  fieldOfViewDegrees: number
}

export interface DigitalTwinSensor {
  id: string
  type: 'lidar' | 'imu' | 'force' | 'proximity' | 'custom'
  frameId: string
  sampleRateHz: number
}

export interface DigitalTwinController {
  id: string
  computeProfile: string
  connected: boolean
}

export interface DigitalTwinPhysics {
  gravity: { x: number; y: number; z: number }
  timestepMs: number
  solver: 'default' | 'high_fidelity'
}

export interface BehaviorRuntimeInterface {
  loadPackage(packageId: string, version: string): Promise<void>
  start(entrypoint: string): Promise<RuntimeHandle>
  stop(handle: RuntimeHandle): Promise<void>
  getState(handle: RuntimeHandle): Promise<RuntimeState>
}

export interface RuntimeHandle {
  id: string
}

export interface RuntimeState {
  status: 'idle' | 'running' | 'paused' | 'error'
  activeBehaviorId?: string
  errorMessage?: string
}

export interface SimulationSessionInterface {
  id: string
  robot: DigitalTwinRobot
  physics: DigitalTwinPhysics
  runtime: BehaviorRuntimeInterface
  startedAt: string
  status: 'initializing' | 'ready' | 'running' | 'terminated'
}

export interface TelemetryInterface {
  subscribe(sessionId: string, topics: string[]): AsyncIterable<TelemetryEvent>
  publish(sessionId: string, event: TelemetryEvent): Promise<void>
}

export interface TelemetryEvent {
  timestamp: string
  topic: string
  sourceId: string
  payload: Record<string, unknown>
}

export const digitalTwinInterfaces = [
  'Robot',
  'Joint',
  'Motor',
  'Battery',
  'Camera',
  'Lidar',
  'Sensor',
  'Controller',
  'Physics',
  'BehaviorRuntime',
  'SimulationSession',
  'Telemetry',
] as const

export type DigitalTwinInterfaceName = (typeof digitalTwinInterfaces)[number]
