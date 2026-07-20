import { test, expect } from '@playwright/test'

const MARKETING_ROUTES = [
  { path: '/', title: /NEXUS/i },
  { path: '/company', heading: /company|nexus/i },
  { path: '/about', heading: /about|nexus/i },
  { path: '/vision', heading: /vision|future/i },
  { path: '/technology', heading: /technology|platform/i },
  { path: '/robots', heading: /robot|atlas|nova|sentinel/i },
  { path: '/nova', heading: /nova/i },
  { path: '/sentinel', heading: /sentinel/i },
  { path: '/studio', heading: /studio/i },
  { path: '/download', heading: /download|studio/i },
  { path: '/sdk', heading: /sdk|developer/i },
  { path: '/documentation', heading: /documentation|docs/i },
  { path: '/contact', heading: /contact/i },
  { path: '/legal/privacy', heading: /privacy/i },
  { path: '/legal/terms', heading: /terms/i },
  { path: '/investors', heading: /investor/i },
  { path: '/careers', heading: /career/i },
]

test.describe('Final release marketing smoke', () => {
  for (const route of MARKETING_ROUTES) {
    test(`${route.path} loads`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('body')).toBeVisible()
      if ('title' in route && route.title) {
        await expect(page).toHaveTitle(route.title)
      }
      if ('heading' in route && route.heading) {
        await expect(page.getByRole('heading').first()).toBeVisible()
      }
    })
  }
})

test.describe('Final release UX features', () => {
  test('command palette opens with keyboard shortcut', async ({ page }) => {
    await page.goto('/')
    const isMac = process.platform === 'darwin'
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible({ timeout: 5000 })
  })

  test('footer contains legal links', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /privacy/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /terms/i })).toBeVisible()
  })
})
