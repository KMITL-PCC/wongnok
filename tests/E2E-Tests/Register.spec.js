import { test, expect } from '@playwright/test';

test('Register with mocked OTP Email', async ({ page }) => {

  await page.goto('http://localhost:3000/register');

  // wait 1000 ms
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'username' }).fill('AA');
  // wait 500 ms
  await page.waitForTimeout(500); 

  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('test1234');
  await page.getByRole('textbox', { name: 'Confirm Password' , exact: true  }).fill('test1234');
  
  await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).click();

  // await page.route('**/api/send-otp', async route => {
  //   await route.fulfill({
  //       status: 200,
  //       body: JSON.stringify({ otp: '12345' }),
  //     });
  //   });

  await page.getByRole('button', { name: 'Register', exact: true }).click();

  //wait fpr 2 seconds
  // await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'OTP Code' }).fill('12345');
  await page.getByRole('button', { name: 'Verify Account' }).click();

  // wiat for 2 seconds
  await expect(page.getByText('Registration Successful')).toBeVisible();

  //wiat for 3 seconds
  await page.waitForTimeout(3000);

  // await page.goto('http://localhost:3000');
  // await page.waitForTimeout(2000);

});