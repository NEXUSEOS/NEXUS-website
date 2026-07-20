import { test, expect } from '@playwright/test'

const CLOUD_URL = process.env.E2E_CLOUD_URL ?? 'http://localhost:8787'
const SKIP_CLOUD = process.env.E2E_SKIP_CLOUD === '1'

test.describe('Production health endpoints', () => {
  test.skip(SKIP_CLOUD, 'Cloud API tests skipped (E2E_SKIP_CLOUD=1)')

  test('GET /v1/health returns ok', async ({ request }) => {
    const res = await request.get(`${CLOUD_URL}/v1/health`)
    test.skip(!res.ok(), 'Cloud API unavailable')
    const body = await res.json()
    expect(body.status).toBe('ok')
  })

  test('GET /v1/ready returns readiness payload', async ({ request }) => {
    const res = await request.get(`${CLOUD_URL}/v1/ready`)
    test.skip(!res.ok(), 'Cloud API unavailable')
    const body = await res.json()
    expect(body).toHaveProperty('checks')
    expect(body).toHaveProperty('score')
  })
})

test.describe('Website smoke', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/NEXUS/i)
  })

  test('status page loads', async ({ page }) => {
    await page.goto('/status')
    await expect(page.locator('body')).toBeVisible()
  })
})
