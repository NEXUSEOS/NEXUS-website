import { defineConfig, devices } from '@playwright/test'

const previewBaseUrl = 'http://localhost:4173'
const devBaseUrl = 'http://localhost:5173'
const baseURL = process.env.E2E_BASE_URL ?? (process.env.CI ? previewBaseUrl : devBaseUrl)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: process.env.CI ? 'npm run preview' : 'npm run dev',
        url: process.env.CI ? previewBaseUrl : devBaseUrl,
        reuseExistingServer: !process.env.CI,
      },
})
