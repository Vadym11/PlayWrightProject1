import {test, expect} from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test.describe('User registration tests', () => {

    const firstName = 'Vadym';
    const lastName = 'Tymeichuk';
    const address = '9 Hyde Court';
    const number = '0870300747';
    const error = 'Please fill in all fields.';


    test.beforeEach(async ({page}) => {
        const filePath = path.join(__dirname, 'index.html');
        const fileUrl = pathToFileURL(filePath).href;
        
        await page.goto(fileUrl);
    })

    test('Register with valid data', async ({page}) => {

        const locators = ['#firstName', '#lastName', '#address', '#number']
        const values = [firstName, lastName, address, number];

        for (let i = 0; i < locators.length; i++) {
            await page.fill(locators[i], values[i]);
        }

        // await page.locator('#firstName').fill(firstName);
        // await page.locator('#lastName').fill(lastName);
        // await page.locator('#address').fill(address);
        // await page.locator('#address').fill(number);

        await page.click('#register');

        await expect(page.getByRole('heading', {name: 'Registered Data'})).toBeVisible();

        const locators1 = ['#displayFirstName', '#displayLastName', '#displayAddress', '#displayNumber']
        for (let i = 0; i < locators1.length; i++) {
            await expect(page.locator(locators1[i])).toHaveText(values[i]);
        }
    })

    test('Register with 2 empty fields', async ({page}) => {
        
        await page.fill('#firstName', firstName);
        await page.fill('#lastName', lastName);

        await page.click('#register');

        await expect(page.locator('#error')).toHaveText('error');

    })

    test('Register with empty fields', async ({page}) => {

        await page.click('#register');

        await expect(page.locator('#error')).toHaveText(error);

    })

})