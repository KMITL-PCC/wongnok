import {test, expect} from '@playwright/test';

test('Login test', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    //wait for 2 seconds
    await page.waitForTimeout(2000);
    // Click on เข้าสู่ระบบ
    // await page.getByRole('link', { name: 'เข้าสู่ระบบ' }).click();

    //wait for 2 seconds
    await page.waitForTimeout(2000);
    
    await page.getByRole('textbox', { name: 'Username' }).fill('Testuser108');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test1234');

    //wiat for 500 ms
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    //wait for 4 seconds
    await page.waitForTimeout(4000);

});


// 🛡 SQL Injection Test Cases
// ----------------------
test.describe('Login - SQL Injection Tests', () => {
  test("TC-013: SQLi - ' OR '1'='1", async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).fill("' OR '1'='1");
    await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    // await expect(page.locator('.error')).toHaveText(/Invalid username or password/);
  });

  test("TC-014: SQLi - admin' --", async ({ page }) => {
    await page.goto( 'http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).fill("admin' --");
    await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    // await expect(page.locator('.error')).toBeVisible();
  });

  test("TC-015: SQLi - '; DROP TABLE users; --", async ({ page }) => {
    await page.goto( 'http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).fill("test123");
    await page.getByRole('textbox', { name: 'Password' }).fill("'; DROP TABLE users; --");
    await page.getByRole('button', { name: 'Login', exact: true }).click();
  });

  test("TC-016: SQLi - Boolean-based", async ({ page }) => {
    await page.goto( 'http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).fill("test' AND '1'='1");
    await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
  });

});
