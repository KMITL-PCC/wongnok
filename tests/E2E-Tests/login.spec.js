import {test, expect} from '@playwright/test';

test('Login test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    //wait for 2 seconds
    await page.waitForTimeout(2000);
    // Click on เข้าสู่ระบบ
    await page.getByRole('link', { name: 'เข้าสู่ระบบ' }).click();

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