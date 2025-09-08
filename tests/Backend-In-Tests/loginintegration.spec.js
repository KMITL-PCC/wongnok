import { test , expect } from '@playwright/test';

test('Login test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //wait 5 seconds
    await page.waitForTimeout(5000);
} );