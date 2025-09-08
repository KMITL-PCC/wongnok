import { test, expect, Page } from '@playwright/test';

// ตัวแปรสำหรับข้อมูลที่ใช้ในการทดสอบ
const testUser = {
  username: 'test_user',
  email: `test${Date.now()}@example.com`,
  password: 'Password123!',
};

// ใช้ beforeEach เพื่อลดความซ้ำซ้อนของโค้ด
test.beforeEach(async ({ page }) => {
  // ไปยังหน้า Register ก่อนเริ่มการทดสอบแต่ละครั้ง
  await page.goto('http://localhost:3000/register');
});

// --- Functional Test Cases ---
test.describe('Functional Tests', () => {

  // Test Case 1: การลงทะเบียนสำเร็จและยืนยัน OTP
  test('should allow a new user to register and confirm with a valid OTP', async ({ page }) => {
    // 1. กรอกข้อมูลในฟอร์ม
    await page.fill('#username-input', testUser.username);
    await page.fill('#email-input', testUser.email);
    await page.fill('#password-input', testUser.password);
    await page.fill('#confirm-password-input', testUser.password);

    // 2. ตรวจสอบว่าปุ่ม Register ถูกปิดใช้งานในตอนแรก
    const registerButton = page.locator('#register-button');
    await expect(registerButton).toBeDisabled();

    // 3. คลิกเลือก PDPA
    await page.locator('#pdpa-checkbox').click();

    // 4. ตรวจสอบว่าปุ่ม Register ถูกเปิดใช้งานแล้ว
    await expect(registerButton).toBeEnabled();

    // 5. คลิกปุ่ม Register เพื่อส่ง OTP
    await registerButton.click();

    // 6. ตรวจสอบว่าหน้า OTP ถูกแสดงขึ้นมา (เช่น ตรวจสอบ URL หรือข้อความ)
    await expect(page.locator('text=Enter OTP')).toBeVisible();

    // 7. ดึงค่า OTP ที่ถูก Hash จาก Session
    // นี่คือส่วนที่ต้องจำลองการดึงค่า OTP จากเซิร์ฟเวอร์
    // ใน Playwright คุณสามารถใช้ request interception หรือ API call เพื่อจำลองได้
    // ตัวอย่าง: สมมติว่ามี API สำหรับดึง OTP
    const response = await page.request.get('YOUR_OTP_API_URL');
    const otpSession = await response.json();
    const otp = otpSession.otp; // สมมติว่า OTP ถูกส่งมาในรูปแบบ JSON

    // 8. กรอก OTP และกดยืนยัน
    await page.fill('#otp-input', otp);
    await page.locator('#confirm-otp-button').click();

    // 9. ตรวจสอบว่าการลงทะเบียนสำเร็จ
    await expect(page.locator('text=Registration Successful')).toBeVisible();
    await expect(page).toHaveURL('YOUR_SUCCESS_PAGE_URL');
  });

  // Test Case 2: รหัสผ่านไม่ตรงกัน
  test('should show an error when passwords do not match', async ({ page }) => {
    await page.fill('#username-input', testUser.username);
    await page.fill('#email-input', testUser.email);
    await page.fill('#password-input', testUser.password);
    await page.fill('#confirm-password-input', 'mismatchedpassword');
    await page.locator('#pdpa-checkbox').click();
    await page.locator('#register-button').click();

    // ตรวจสอบว่ามีข้อความแจ้งเตือน "Passwords do not match"
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  // Test Case 3: อีเมลไม่ถูกต้อง
  test('should show an error for an invalid email format', async ({ page }) => {
    await page.fill('#email-input', 'invalid-email');
    await page.locator('#pdpa-checkbox').click();

    // ตรวจสอบว่ามีข้อความแจ้งเตือน "Invalid email format"
    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });

  // Test Case 4: อีเมลที่ลงทะเบียนไปแล้ว
  test('should show an error for an existing email', async ({ page }) => {
    // สมมติว่ามีข้อมูลในฐานข้อมูลอยู่แล้ว
    await page.fill('#email-input', 'existing_user@example.com');
    await page.locator('#pdpa-checkbox').click();
    await page.locator('#register-button').click();

    // ตรวจสอบว่ามีข้อความแจ้งเตือน "Email is already in use"
    await expect(page.locator('text=Email is already in use')).toBeVisible();
  });

  // Test Case 5: OTP ไม่ถูกต้อง
  test('should show an error for an incorrect OTP', async ({ page }) => {
    // ทำตามขั้นตอนการลงทะเบียนจนถึงหน้ากรอก OTP
    await page.locator('#pdpa-checkbox').click();
    await page.locator('#register-button').click();

    // กรอก OTP ที่ไม่ถูกต้อง
    await page.fill('#otp-input', '999999');
    await page.locator('#confirm-otp-button').click();

    // ตรวจสอบว่ามีข้อความแจ้งเตือน "Incorrect OTP"
    await expect(page.locator('text=Incorrect OTP')).toBeVisible();
  });
});

// --- Security Test Cases ---
test.describe('Security Tests', () => {

  // Test Case 6: Cross-site Scripting (XSS)
  test('should prevent XSS attacks via username and email fields', async ({ page }) => {
    const xssPayload = `<script>alert('XSS Attack');</script>`;

    await page.fill('#username-input', xssPayload);
    await page.fill('#email-input', xssPayload);
    await page.fill('#password-input', testUser.password);
    await page.fill('#confirm-password-input', testUser.password);
    await page.locator('#pdpa-checkbox').click();
    await page.locator('#register-button').click();

    // ตรวจสอบว่าไม่มี alert ขึ้นมา (ซึ่งเป็นสิ่งที่เราคาดหวัง)
    page.on('dialog', async dialog => {
      expect(dialog.message()).not.toContain('XSS Attack');
      await dialog.dismiss();
    });

    // ตรวจสอบว่าไม่มีโค้ด HTML ถูก render
    await expect(page.locator('#username-display')).not.toContainHTML(xssPayload);
  });

  // Test Case 7: SQL Injection
  test('should prevent SQL Injection attacks via username and email fields', async ({ page }) => {
    const sqlPayload = `admin'--`; // Payloads ทั่วไป
    const sqlPayload2 = `' OR 1=1--`;

    await page.fill('#username-input', sqlPayload);
    await page.fill('#email-input', sqlPayload2);
    await page.fill('#password-input', testUser.password);
    await page.fill('#confirm-password-input', testUser.password);
    await page.locator('#pdpa-checkbox').click();
    await page.locator('#register-button').click();

    // ตรวจสอบว่าการลงทะเบียนไม่สำเร็จด้วยข้อมูลที่เป็น SQL Injection
    await expect(page.locator('text=Registration Successful')).toBeHidden();
    // และตรวจสอบว่ามีข้อความ Error ที่เกี่ยวข้อง เช่น 'Invalid characters' หรือ 'User not found'
    // ซึ่งแสดงว่า Back-end ของคุณจัดการ SQL Injection ได้
  });
});