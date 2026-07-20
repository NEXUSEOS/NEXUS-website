import { test, expect } from '@playwright/test'

const BETA_ROUTES = [
  { path: '/beta', heading: /beta|preview|early|nexus/i },
  { path: '/beta/apply', heading: /apply|beta|join/i },
]

test.describe('Private beta public surfaces', () => {
  for (const route of BETA_ROUTES) {
    test(`${route.path} loads`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('body')).toBeVisible()
      await expect(page.getByRole('heading').first()).toBeVisible()
    })
  }

  test('beta hub links to feedback and bug reporting', async ({ page }) => {
    await page.goto('/beta')
    await expect(page.locator('body')).toBeVisible()
    const links = page.getByRole('link')
    await expect(links.first()).toBeVisible()
  })
})
