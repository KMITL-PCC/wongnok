import { test, expect } from '@playwright/test';

test('register with OTP flow', async ({ request }) => {
  const email = 'test@example.com';
  const username = 'testuser';
  const password = 'P@ssword123';

  // Step 1: call send-otp
  await request.post('/auth/register/send-otp', {
    data: { username, email, password },
  });

  // Step 2: ดึง OTP จาก test API
  const otpRes = await request.get(`/test/otp?email=${email}`);
  const { otp } = await otpRes.json();

  // Step 3: verify OTP
  const res = await request.post('/auth/register/verify', {
    data: { email, otp },
  });

  const body = await res.json();
  expect(body.success).toBeTruthy();
});
