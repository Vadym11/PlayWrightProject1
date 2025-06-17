import {test, expect} from '@playwright/test';
import { PageObject } from './page/Page';
import path from 'path';
import { pathToFileURL } from 'url';

test.describe('POM example', () => {

    let pageObject: PageObject;

    test.beforeEach(async ({browser}) => {
        const filePath = path.join(__dirname, 'index.html');
        const fileUrl = pathToFileURL(filePath).href;

        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open(fileUrl)
    })

    test('Test 1: fill all fields', async () => {
        
        await pageObject.fillFirstName('John');
        await pageObject.fillAge('33');
        await pageObject.checkIsStudent();

        await pageObject.applyData();

        expect(await pageObject.text(pageObject.displayFirstName)).toBe('John');
        expect(await pageObject.text(pageObject.displayAge)).toBe('33');
        expect(await pageObject.text(pageObject.displayIsStudent)).toBe('Yes');
    })
})