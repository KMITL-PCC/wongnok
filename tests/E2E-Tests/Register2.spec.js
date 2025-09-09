import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/register';

const validUser = 'newUser';
const validEmail = 'user@test.com';
const validPass = 'Test@1234';

// ----------------------
// ✅ Positive Test Cases

// ----------------------
// ❌ Negative Test Cases
// ----------------------
// ----------------------
// ⚔️ XSS Test Cases
// ----------------------
test.describe('Register - XSS Tests', () => {
  test('REG-014: XSS ใน Username', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "<script>alert(1)</script>");
    await page.fill('#email', validEmail);
    await page.fill('#password', validPass);
    await page.fill('#confirmPassword', validPass);
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test('REG-015: XSS ใน Email', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#email', "<img src=x onerror=alert(1)>@test.com");
    await page.fill('#password', validPass);
    await page.fill('#confirmPassword', validPass);
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test('REG-016: XSS ใน Password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#email', validEmail);
    await page.fill('#password', "<script>alert('pw')</script>");
    await page.fill('#confirmPassword', "<script>alert('pw')</script>");
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });
});

// ----------------------
// 🛡 SQL Injection Test Cases
// ----------------------
test.describe('Register - SQL Injection Tests', () => {
  test("REG-017: SQLi ใน Username", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "' OR '1'='1");
    await page.fill('#email', validEmail);
    await page.fill('#password', validPass);
    await page.fill('#confirmPassword', validPass);
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test("REG-018: SQLi ใน Email", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#email', "test@test.com' --");
    await page.fill('#password', validPass);
    await page.fill('#confirmPassword', validPass);
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test("REG-019: SQLi ใน Password", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#email', validEmail);
    await page.fill('#password', "'; DROP TABLE users; --");
    await page.fill('#confirmPassword', "'; DROP TABLE users; --");
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test("REG-020: SQLi Boolean-based", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "abc' AND '1'='1");
    await page.fill('#email', validEmail);
    await page.fill('#password', validPass);
    await page.fill('#confirmPassword', validPass);
    await page.check('#pdpa');
    await page.click('#registerBtn');
    await expect(page.locator('.error')).toBeVisible();
  });
});
