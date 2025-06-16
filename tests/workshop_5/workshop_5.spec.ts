import {test, expect, Cookie} from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test.beforeEach('Handling alerts', async ({page}) => {
    const filePath = path.join(__dirname, 'index.html');
    const fileUrl = pathToFileURL(filePath).href;

    await page.goto(fileUrl);
})

test('Opening new window and navigating back', async ({context, page}) => {

    const pagePromise = context.waitForEvent('page');

    await page.click('#openNewWindow');

    const newPage = await pagePromise;

    await newPage.waitForLoadState();

    console.log(await newPage.title());

    await expect(newPage.getByRole('heading', {name: ''}).nth(0)).toBeVisible();
})

test('Add cookie', async ({page}) => {

    await page.click('#setCookie');

    const cookies = await page.context().cookies('');

    let sessionCookie: Cookie | undefined;

    // this is equivalent to the forEach loop below
    // sessionCookie = cookies.find(cookies => cookies.name === 'session');

    cookies.forEach((cookie) => {
        if (cookie.name === 'session') {
            sessionCookie = cookie;
        }
    })

    console.log(sessionCookie);

    console.log(sessionCookie?.name);

    await expect(sessionCookie).toBeDefined();
})

test.only('Delete cookie', async ({page}) => {

    // setting cookies
    await page.click('#setCookie');

    const cookies = await page.context().cookies('');
    let sessionCookie: Cookie | undefined;

    cookies.forEach((cookie) => {
        if (cookie.name === 'session') {
            sessionCookie = cookie;
        }
    })

    console.log(sessionCookie);

    console.log(sessionCookie?.name);

    await expect(sessionCookie).toBeDefined();

    // deleteing cookies
    await page.click('#deleteCookie');

    const deletedCookies = await page.context().cookies('');
    let deletedSessionCookies: Cookie | undefined;

    deletedCookies.forEach((cookie) => {
        if (cookie.name === 'session') {
            deletedSessionCookies = cookie;
        }
    })

    console.log('This shoud be empty:', deletedSessionCookies);
    // console.log(deletedCookies);

    await expect(deletedSessionCookies).toBeUndefined();

})