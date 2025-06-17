import {test, expect} from '@playwright/test';
import { PageObject } from './page/Page';
import path from 'path';
import { pathToFileURL } from 'url';
import * as testData from './testData.json'

test.describe('POM example', () => {

    let pageObject: PageObject;

    test.beforeEach(async ({browser}) => {
        const filePath = path.join(__dirname, 'index.html');
        const fileUrl = pathToFileURL(filePath).href;

        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open(fileUrl)
    })

    for(const data of Object.values(testData)) {
        if (data.testName === 'Test 1 - Fill Input' || data.testName === 'Test 1 - Negative test') {
            test.only(data.testName, async () => {
                await pageObject.fillFirstName(data.firstName);
                await pageObject.fillAge(data.age);
                if (data.isStudent) {
                    await pageObject.checkIsStudent();
                }
                
                await pageObject.applyData();

                expect(await pageObject.text(pageObject.displayFirstName)).toBe(data.expectedFirstName);
                expect(await pageObject.text(pageObject.displayAge)).toBe(data.expectedAge);
                expect(await pageObject.text(pageObject.displayIsStudent)).toBe(data.expectedIsStudent);
            })
        }
    }
})