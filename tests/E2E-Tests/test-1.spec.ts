import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');

  // await page.getByRole('textbox', { name: 'Username' }).fill('test01');
  await page.getByRole('textbox', { name: 'Username' }).fill('teset');
  await page.waitForTimeout(500); // หน่วงเวลา 0.5 วินาที

  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('test1234');
  await page.getByRole('textbox', { name: 'Confirm Password' , exact: true  }).fill('test1234');
  // await page.getByText('UsernameEmailPlease enter a').click();
  // await page.locator('UsernameEmailPlease enter a').click();
  await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).click();
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  // await page.getByRole('button', { name: 'Register' }).click();
  //wait fpr 2 seconds
  await page.waitForTimeout(2000);
});