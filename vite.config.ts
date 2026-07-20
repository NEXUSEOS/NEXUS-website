import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const websiteNodeModules = path.resolve(__dirname, 'node_modules')
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'NEXUS-website'
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/')

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
      '@nexus/design-system/globals.css': path.resolve(__dirname, '../nexus-design-system/src/globals.css'),
      '@nexus/design-system': path.resolve(__dirname, '../nexus-design-system/src/index.ts'),
      '@nexus/navigation/styles.css': path.resolve(__dirname, '../nexus-platform/packages/navigation/src/UniversalNavigation.css'),
      '@nexus/navigation': path.resolve(__dirname, '../nexus-platform/packages/navigation/index.ts'),
      '@nexus/theme/globals.css': path.resolve(websiteNodeModules, '@nexus/theme/src/globals.css'),
      '@nexus/downloads/downloads.css': path.resolve(
        websiteNodeModules,
        '@nexus/downloads/src/downloads.css',
      ),
      '@nexus/theme': path.resolve(websiteNodeModules, '@nexus/theme/index.ts'),
      '@nexus/ui': path.resolve(websiteNodeModules, '@nexus/ui/index.ts'),
      '@nexus/config': path.resolve(websiteNodeModules, '@nexus/config/index.ts'),
      '@nexus/auth': path.resolve(websiteNodeModules, '@nexus/auth/index.ts'),
      '@nexus/analytics': path.resolve(websiteNodeModules, '@nexus/analytics/index.ts'),
      '@nexus/downloads': path.resolve(websiteNodeModules, '@nexus/downloads/index.ts'),
      '@nexus/integration': path.resolve(websiteNodeModules, '@nexus/integration/src/index.ts'),
      '@nexus/sdk-cms': path.resolve(websiteNodeModules, '@nexus/sdk-cms/src/index.ts'),
      '@nexus/sdk-platform': path.resolve(websiteNodeModules, '@nexus/sdk-platform/src/index.ts'),
      '@nexus/cms-renderer': path.resolve(__dirname, '../nexus-platform/packages/cms-renderer/src/index.ts'),
      '@nexus/cms-renderer/styles.css': path.resolve(
        __dirname,
        '../nexus-platform/packages/cms-renderer/src/cms-renderer.css',
      ),
      '@nexus/aether': path.resolve(websiteNodeModules, '@nexus/aether/index.ts'),
      '@nexus/aether/src/aetherContext': path.resolve(
        __dirname,
        'node_modules/@nexus/aether/src/aetherContext.ts',
      ),
      '@nexus/aether/src/utils': path.resolve(__dirname, 'node_modules/@nexus/aether/src/utils.ts'),
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
