# Cinematic Experience Engine — Architecture

**EPIC 73** extends **EPIC 72** Living Glass components without duplicating particle/glass implementations.

## Module Layout

```
src/experience/
├── index.ts                    # Public API
├── ExperienceProvider.tsx      # Root provider shell
├── experience.css              # Engine-specific styles
├── adaptive/                   # Device capability scaling
├── ambient/                    # Global background controller
├── theme/                      # Route ambient hues + bridge mode
├── transitions/                # GlobalTransitionEngine
├── particles/                  # ParticleMaterialize + hook
├── living-glass/               # Re-exports EPIC 72 + LivingGlassSurface
├── motion/                     # useMotionTimeline + MotionSequence
├── lighting/                   # VolumetricLayer + useAmbientLighting
├── holographic/                # HolographicPanel, HealthWidget, Label
└── sound/                      # useSoundHook + no-op SoundEngine
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ Bootstrap → App (BrowserRouter)                                 │
│   └── ExperienceProvider                                      │
│         ├── AdaptiveAnimationProvider  (GPU/motion tier)        │
│         ├── CinematicThemeProvider     (route ambient tokens)   │
│         └── AmbientEnvironment         (nebula/mist/particles)│
│               └── MainLayout / AdminLayout                    │
│                     └── GlobalTransitionEngine                │
│                           └── MistDissolve → lg-materialize   │
└─────────────────────────────────────────────────────────────────┘

EPIC 72 (unchanged source of truth):
  src/components/living-glass/*   → LivingGlass*, ParticleFieldCanvas
  src/styles/living-glass.css     → Design tokens (--lg-*)
```

## Engine Responsibilities

| Engine | Export | Role |
|--------|--------|------|
| Global Transition | `GlobalTransitionEngine` | Route dissolve → materialize orchestration |
| Particle Materialization | `ParticleMaterialize`, `useParticleMaterialize` | Stagger/ripple/assembly entrances |
| Living Glass | Re-exports + `LivingGlassSurface` | Unified glass with adaptive blur budget |
| Motion Timeline | `useMotionTimeline`, `MotionSequence` | Lightweight choreographed sequences |
| Volumetric Lighting | `VolumetricLayer`, `useAmbientLighting` | CSS nebula/spotlight/fog layers |
| Holographic UI | `HolographicPanel`, `HolographicHealthWidget` | Scan lines, health widgets |
| Adaptive Animation | `useDeviceCapability`, `AdaptiveAnimationProvider` | Scale particles/blur/3D quality |
| Sound | `useSoundHook`, `soundEngine` | No-op interface for future audio |
| Theme | `useCinematicTheme`, `CinematicThemeProvider` | Route modes: bridge, showroom, studio, cloud |
| Ambient Environment | `AmbientEnvironment` | Particle field, mist, parallax, energy waves |

## Route Theme Modes

| Route | Mode | Ambient Feel |
|-------|------|--------------|
| `/` | default | Warm nebula |
| `/admin/*` | bridge | Command bridge cyan |
| `/marketplace` | showroom | Purple spotlight |
| `/studio` | studio | Creative workstation green |
| `/technology` | cloud | Cloud platform blue |

## Production Shim Compatibility

- `ParticleFieldCanvas` (EPIC 72) used for ambient particles — no Three.js required
- `VITE_FORCE_SHIMS=true npm run build:pages` verified PASS
- `prefers-reduced-motion` disables animations, particles, scan-line drift

## Integration Points

- `src/App.tsx` — `ExperienceProvider` inside `BrowserRouter`
- `src/layouts/MainLayout.tsx` — `GlobalTransitionEngine` on `<Outlet />`
- `src/layouts/AdminLayout.tsx` — bridge mode + `HolographicLabel`
- Pages: Home, Technology (Cloud), Studio, Marketplace, AdminDashboard
- `nexus-studio` — holographic chrome on `CommandCenterPanel` header

## Performance Notes

- Ambient particle count scaled by `--cx-particle-budget` (0–220)
- Blur scaled by `--cx-blur-budget` (0–24px)
- `will-change` on route transitions only during animation window
- Three.js chunk remains lazy-loaded via AetherBackground on hero only
