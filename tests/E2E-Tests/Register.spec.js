import { test, expect } from '@playwright/test';

test('Register with mocked OTP Email', async ({ page }) => {
  // ไปที่หน้า register
  await page.goto('http://localhost:3000/register');

  // ดัก request /api/send-otp-email
  await page.route('**/api/send-otp-email', async route => {
    // ✅ ส่ง response ปลอมกลับไปเลย
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Mocked OTP sent',
        otp: '123456',   // mock OTP ที่เราคุมเอง
      }),
    });
  });

  // กรอกข้อมูลสมัคร
  await page.fill('#username', 'testuser');
  await page.fill('#email', 'testuser@example.com');
  await page.fill('#password', 'Pass1234!');
  await page.fill('#confirmPassword', 'Pass1234!');
  await page.check('#pdpa');
  await page.click('button[type="submit"]');

  // ✅ กรอก OTP mock แทนของจริง
  await page.fill('#otp', '123456');
  await page.click('#submit-otp');

  // คาดหวัง register success
  await expect(page.locator('text=Registration Successful')).toBeVisible();
});
