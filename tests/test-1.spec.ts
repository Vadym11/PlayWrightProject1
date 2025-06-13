import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://about.gitlab.com/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.locator('#be-navigation-desktop').getByRole('link', { name: 'Get free trial' }).click();
  await page.getByRole('heading', { name: 'Get Started with GitLab' }).click();
});