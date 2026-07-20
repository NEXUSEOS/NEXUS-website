import { test, expect } from '@playwright/test'

/** EPIC 64 — Public marketing and content routes smoke coverage. */
const WEBSITE_COMPLETION_ROUTES = [
  { path: '/', title: /NEXUS/i },
  { path: '/about', heading: /about|nexus/i },
  { path: '/mission', heading: /mission/i },
  { path: '/vision', heading: /vision|future/i },
  { path: '/technology', heading: /technology|platform/i },
  { path: '/atlas', heading: /atlas/i },
  { path: '/nova', heading: /nova/i },
  { path: '/sentinel', heading: /sentinel/i },
  { path: '/studio', heading: /studio/i },
  { path: '/marketplace', heading: /marketplace/i },
  { path: '/developers', heading: /developer/i },
  { path: '/sdk', heading: /sdk|developer/i },
  { path: '/documentation', heading: /documentation|docs/i },
  { path: '/docs', heading: /documentation|docs/i },
  { path: '/blog', heading: /blog|engineering/i },
  { path: '/news', heading: /news|release|blog/i },
  { path: '/releases', heading: /release/i },
  { path: '/roadmap', heading: /roadmap/i },
  { path: '/community', heading: /community/i },
  { path: '/careers', heading: /career/i },
  { path: '/contact', heading: /contact/i },
  { path: '/support', heading: /support/i },
  { path: '/status', heading: /status|operational/i },
  { path: '/pricing', heading: /pricing/i },
  { path: '/legal/privacy', heading: /privacy/i },
  { path: '/legal/terms', heading: /terms/i },
  { path: '/investors', heading: /investor/i },
  { path: '/sponsors', heading: /sponsor/i },
  { path: '/download', heading: /download|studio/i },
]

const PLACEHOLDER_PATTERN = /coming soon|lorem ipsum|under construction|placeholder page/i

test.describe('EPIC 64 website completion', () => {
  for (const route of WEBSITE_COMPLETION_ROUTES) {
    test(`${route.path} loads with real content`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('body')).toBeVisible()
      if ('title' in route && route.title) {
        await expect(page).toHaveTitle(route.title)
      }
      if ('heading' in route && route.heading) {
        await expect(page.getByRole('heading').first()).toBeVisible()
      }
      const bodyText = await page.locator('body').innerText()
      expect(bodyText).not.toMatch(PLACEHOLDER_PATTERN)
    })
  }

  test('home platform overview section is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /NEXUS Platform/i })).toBeVisible()
  })

  test('privacy policy includes substantive sections', async ({ page }) => {
    await page.goto('/legal/privacy')
    await expect(page.getByRole('heading', { name: /Information We Collect/i })).toBeVisible()
  })
})
