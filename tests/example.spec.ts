import { test, expect } from '@playwright/test';

test('practica', async ({ page }) => {
  await page.goto('https://clientes.orbyta.com/');
  await expect(page).toHaveTitle(/Orbyta/);

  await page.fill('input[name="usuario"]', 'jcarrillo@follow-up.cl');
  await page.fill('input[name="pass"]', 'jose.2025!');
  await page.click('button[type="submit"]');
  await expect(page.locator('h3')).toHaveText('Bienvenid@ jose carrillo');
});

/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});

*/
