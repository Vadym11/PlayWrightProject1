import {test} from '@playwright/test';
import { GitLabHomePage } from '../../pages/GitLabHomePage';
import { lstat } from 'fs';

test.beforeEach(async ({page}) => {
    await page.setViewportSize({width:1366, height:728})
    await page.goto('https://gitlab.com/');
} )

test.skip('Basic Navigation', async ({page})=> {
    await page.waitForTimeout(3000);
    page.reload;
})

test('Interacting with a webelement on GitLab', async ({page}) => {

    await page.click('#onetrust-accept-btn-handler');
    // await page.getByRole('link', {name: 'Get free trial'}).click;

    await page.locator('[class="navigation-bottom-right"]').getByRole('link', {name: 'Get free trial'}).click();

    // await page.click('[name="Get free trial"]');

    await page.waitForTimeout(3000);
})

const firstName = 'John';
const lastName = 'Doe';

test('Interacting with a webelement on GitLab POM', async ({page}) => {
    // const gitLabHome = new GitLabHomePage(page);

    const gitLabHomePage = new GitLabHomePage(page);
    // await gitLabHomePage.goto();
    await gitLabHomePage.acceptCookies();

    const getStartedPage = await gitLabHomePage.clickGetFreeTrial();
    await getStartedPage.fillInFirstName(firstName);
    await getStartedPage.fillInLastName(lastName);
    await getStartedPage.clickRegister();
    await getStartedPage.assertFnameError();

    // await page.goto('https://gitlab.com/');

    // await page.click('#onetrust-accept-btn-handler');
    // // await page.getByRole('link', {name: 'Get free trial'}).click;

    // await page.locator('[class="navigation-bottom-right"]').getByRole('link', {name: 'Get free trial'}).click();

    // // await page.click('[name="Get free trial"]');

    await page.waitForTimeout(3000);
})