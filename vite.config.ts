import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const websiteNodeModules = path.resolve(__dirname, 'node_modules')
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'NEXUS-website'
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/')

function shim(name: string) {
  return path.resolve(__dirname, `src/shims/nexus-${name}`)
}

function sibling(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

function nodeModule(relativePath: string) {
  return path.resolve(websiteNodeModules, relativePath)
}

/** Prefer sibling monorepo packages when present locally; fall back to committed shims for CI. */
function resolveNexus(
  shimName: string,
  options: { sibling?: string; nodeModule?: string; extension?: string } = {},
) {
  const extension = options.extension ?? 'ts'
  const shimPath = `${shim(shimName)}.${extension}`
  if (options.sibling && existsSync(options.sibling)) return options.sibling
  if (options.nodeModule && existsSync(options.nodeModule)) return options.nodeModule
  return shimPath
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
  ],
  resolve: {
    alias: {
      react: path.resolve(websiteNodeModules, 'react'),
      'react-dom': path.resolve(websiteNodeModules, 'react-dom'),
      'react-router-dom': path.resolve(websiteNodeModules, 'react-router-dom'),
      '@supabase/supabase-js': path.resolve(websiteNodeModules, '@supabase/supabase-js'),
      three: path.resolve(websiteNodeModules, 'three'),
      '@react-three/fiber': path.resolve(websiteNodeModules, '@react-three/fiber'),
      '@react-three/drei': path.resolve(websiteNodeModules, '@react-three/drei'),
      '@nexus/design-system/globals.css': resolveNexus('design-system', {
        sibling: sibling('../nexus-design-system/src/globals.css'),
        nodeModule: nodeModule('@nexus/design-system/src/globals.css'),
        extension: 'css',
      }),
      '@nexus/design-system': resolveNexus('design-system', {
        sibling: sibling('../nexus-design-system/src/index.ts'),
        nodeModule: nodeModule('@nexus/design-system/src/index.ts'),
      }),
      '@nexus/navigation/styles.css': resolveNexus('navigation', {
        sibling: sibling('../nexus-platform/packages/navigation/src/UniversalNavigation.css'),
        nodeModule: nodeModule('@nexus/navigation/src/UniversalNavigation.css'),
        extension: 'css',
      }),
      '@nexus/navigation': resolveNexus('navigation', {
        sibling: sibling('../nexus-platform/packages/navigation/index.ts'),
        nodeModule: nodeModule('@nexus/navigation/index.ts'),
        extension: 'tsx',
      }),
      '@nexus/theme/globals.css': resolveNexus('theme', {
        nodeModule: nodeModule('@nexus/theme/src/globals.css'),
        extension: 'css',
      }),
      '@nexus/downloads/downloads.css': resolveNexus('downloads', {
        nodeModule: nodeModule('@nexus/downloads/src/downloads.css'),
        extension: 'css',
      }),
      '@nexus/theme': resolveNexus('theme', {
        nodeModule: nodeModule('@nexus/theme/index.ts'),
      }),
      '@nexus/ui': resolveNexus('ui', {
        nodeModule: nodeModule('@nexus/ui/index.ts'),
      }),
      '@nexus/config': resolveNexus('config', {
        nodeModule: nodeModule('@nexus/config/index.ts'),
      }),
      '@nexus/auth': resolveNexus('auth', {
        nodeModule: nodeModule('@nexus/auth/index.ts'),
      }),
      '@nexus/analytics': resolveNexus('analytics', {
        nodeModule: nodeModule('@nexus/analytics/index.ts'),
      }),
      '@nexus/downloads': resolveNexus('downloads', {
        nodeModule: nodeModule('@nexus/downloads/index.ts'),
      }),
      '@nexus/integration': resolveNexus('integration', {
        sibling: sibling('../nexus-platform/packages/integration/src/index.ts'),
        nodeModule: nodeModule('@nexus/integration/src/index.ts'),
      }),
      '@nexus/platform': resolveNexus('platform', {
        sibling: sibling('../nexus-platform/packages/platform/src/index.ts'),
        nodeModule: nodeModule('@nexus/platform/src/index.ts'),
      }),
      '@nexus/sdk-cms': resolveNexus('sdk-cms', {
        sibling: sibling('../nexus-sdk/packages/cms/src/index.ts'),
        nodeModule: nodeModule('@nexus/sdk-cms/src/index.ts'),
      }),
      '@nexus/sdk-platform': resolveNexus('sdk-platform', {
        sibling: sibling('../nexus-sdk/packages/platform/src/index.ts'),
        nodeModule: nodeModule('@nexus/sdk-platform/src/index.ts'),
      }),
      '@nexus/cms-renderer/styles.css': resolveNexus('cms-renderer', {
        sibling: sibling('../nexus-platform/packages/cms-renderer/src/cms-renderer.css'),
        extension: 'css',
      }),
      '@nexus/cms-renderer': resolveNexus('cms-renderer', {
        sibling: sibling('../nexus-platform/packages/cms-renderer/src/index.ts'),
        extension: 'tsx',
      }),
      '@nexus/aether': resolveNexus('aether', {
        nodeModule: nodeModule('@nexus/aether/index.ts'),
      }),
      '@nexus/aether/src/aetherContext': resolveNexus('aether', {
        nodeModule: nodeModule('@nexus/aether/src/aetherContext.ts'),
      }),
      '@nexus/aether/src/utils': resolveNexus('aether', {
        nodeModule: nodeModule('@nexus/aether/src/utils.ts'),
      }),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three'
          }
          if (id.includes('@supabase')) {
            return 'supabase'
          }
          if (id.includes('react-router')) {
            return 'router'
          }
        },
      },
    },
  },
})
