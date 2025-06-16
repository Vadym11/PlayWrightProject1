import {test, expect} from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test.beforeEach('Handling alerts', async ({page}) => {
    const filePath = path.join(__dirname, 'index.html');
    const fileUrl = pathToFileURL(filePath).href;

    await page.goto(fileUrl);
})

test.skip('Handling alerts', async ({page}) => {

    // this will accept an alert multiple times whenever it appears
    // to do it once only we should use page.once
    let alertMessage: string = '';
    page.on('dialog', async(dialog) => {
        

        expect(dialog.type()).toBe('alert');
        alertMessage = dialog.message();

        await dialog.accept();
    })

    await page.click('#show-alert');
    expect(alertMessage).toBe('This is a simple alert.');

    await page.waitForTimeout(3000);

})

test.skip('Handling alerts - confirm handling', async ({page}) => {

    // this will accept an alert multiple times whenever it appears
    // to do it once only we should use page.once

    let alertMessage: string = '';
    let counter: number = 0;
    page.on('dialog', async(dialog) => {

        if (counter == 0) {
            expect(dialog.type()).toBe('confirm');
        } else {
            expect(dialog.type()).toBe('alert');
            alertMessage = dialog.message();
        }

        await dialog.dismiss();
        counter++;
    })

    await page.click('#show-confirm');
    expect(alertMessage).toBe('You clicked Cancel.');

    await page.waitForTimeout(1000);
})

test('Handling pop up', async ({page}) => {

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup')
    ]);

    await popup.waitForLoadState();

    await popup.close();

    if (popup) {
        expect(popup.url()).toBe('https://example.com/');
    }

    await page.waitForTimeout(1000);
})