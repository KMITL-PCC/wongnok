import { test, expect } from '@playwright/test';

// กำหนด URL ของระบบ Login
const BASE_URL = 'http://localhost:3000/login';

// Credentials สมมติ
const validUser = 'validUser';
const validPass = 'validPass123';

// ----------------------
// ✅ Positive Test Cases
// ----------------------
test.describe('Login - Positive Flow', () => {
  test('TC-001: Login สำเร็จด้วย Username & Password ถูกต้อง', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('TC-002: กด Enter แทนปุ่ม Login', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', validPass);
    await page.press('#password', 'Enter');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('TC-003: จำค่า Session หลังจาก Login', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await page.reload();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('TC-004: Logout สำเร็จ', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await page.click('#logoutBtn');
    await expect(page).toHaveURL(/.*login/);
  });
});

// ----------------------
// ❌ Negative Test Cases
// ----------------------
test.describe('Login - Negative Flow', () => {
  test('TC-005: Username ว่าง', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Username is required/);
  });

  test('TC-006: Password ว่าง', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Password is required/);
  });

  test('TC-007: ทั้งคู่ว่าง', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Please enter username and password/);
  });

  test('TC-008: Username หรือ Password ไม่ถูกต้อง', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', 'wrongPass');
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Invalid username or password/);
  });

  test('TC-009: Password น้อยกว่า 6 ตัวอักษร', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', '123');
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Password must be at least 6 characters/);
  });
});

// ----------------------
// ⚔️ XSS Test Cases
// ----------------------
test.describe('Login - XSS Tests', () => {
  test('TC-010: XSS ใน Username', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "<script>alert('XSS')</script>");
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test('TC-011: XSS ใน Password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', "<img src=x onerror=alert('XSS')>");
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test('TC-012: Reflected XSS (ตรวจสอบ URL)', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "<script>alert(1)</script>");
    await page.fill('#password', validPass);
    await page.click('#loginBtn');
    await expect(page).not.toHaveURL(/<script>/);
  });
});

// ----------------------
// 🛡 SQL Injection Test Cases
// ----------------------
test.describe('Login - SQL Injection Tests', () => {
  test("TC-013: SQLi - ' OR '1'='1", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "' OR '1'='1");
    await page.fill('#password', 'any');
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toHaveText(/Invalid username or password/);
  });

  test("TC-014: SQLi - admin' --", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "admin' --");
    await page.fill('#password', '');
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test("TC-015: SQLi - '; DROP TABLE users; --", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', validUser);
    await page.fill('#password', "'; DROP TABLE users; --");
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toBeVisible();
  });

  test("TC-016: SQLi - Boolean-based", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#username', "test' AND '1'='1");
    await page.fill('#password', 'any');
    await page.click('#loginBtn');
    await expect(page.locator('.error')).toBeVisible();
  });
});
