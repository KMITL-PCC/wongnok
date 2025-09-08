import {test, expect} from '@playwright/test';

test('Login test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('link', { name: 'เข้าสู่ระบบ' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Testuser108');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test1234');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    //wait for navigation to complete

    await page.waitForURL('http://localhost:3000/');
});