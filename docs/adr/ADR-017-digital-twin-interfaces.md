# ADR-017: Digital Twin Interfaces

**Status:** Accepted  
**Date:** 2026-07-10  
**Sprint:** EPIC 4 — Sprint 5 Task 2

## Context

Behavior simulation requires abstract interfaces for robots, sensors, physics, runtime, and telemetry before a simulation engine exists.

## Decision

Define **Digital Twin interface specifications** in `nexus-website/src/sdk/digital-twin/interfaces.ts`, owned by **nexus-sdk** for implementation.

### Interface Catalog

| Interface | Purpose |
|-----------|---------|
| `DigitalTwinRobot` | Root robot model with subsystems |
| `DigitalTwinJoint` | Articulated joint state and limits |
| `DigitalTwinMotor` | Motor torque, speed, temperature |
| `DigitalTwinBattery` | Power state and runtime estimate |
| `DigitalTwinCamera` | Vision sensor parameters |
| `DigitalTwinLidar` | Lidar range, channels, frame |
| `DigitalTwinSensor` | IMU, force, proximity, custom |
| `DigitalTwinController` | Compute profile and connectivity |
| `DigitalTwinPhysics` | Gravity, timestep, solver profile |
| `BehaviorRuntimeInterface` | Load, start, stop, state |
| `SimulationSessionInterface` | Session lifecycle |
| `TelemetryInterface` | Subscribe/publish events |

### Constraints

- **No simulation engine** in nexus-website
- **No robot control** or hardware I/O
- **No physics engine** — physics profile is configuration only
- `nexus simulate` CLI will consume these interfaces when implemented in nexus-sdk
- Digital Twin **UI** governed by nexus-design-system → nexus-platform → nexus-studio (future)

## Consequences

- Simulation API (`@nexus/sdk-simulation`) aligns with Digital Twin types
- Developer portal Simulation Jobs page remains architecture preview

---

*Related: ADR-014, ADR-016*
