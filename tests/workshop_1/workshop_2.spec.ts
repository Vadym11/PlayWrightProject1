import {test, expect} from '@playwright/test';
import { GitLabHomePage } from '../../pages/GitLabHomePage';
import { lstat } from 'fs';

test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
} )

const firstName = 'John';
const lastName = 'Doe';

test('Interacting with a webelement on GitLab POM', async ({page}) => {



    const gitLabHomePage = new GitLabHomePage(page);
    await gitLabHomePage.acceptCookies();

    const getStartedPage = await gitLabHomePage.clickGetFreeTrial();
    await getStartedPage.fillInFirstName(firstName);
    await getStartedPage.fillInLastName(lastName);
    await getStartedPage.clickRegister();
    await getStartedPage.assertFnameError();

    await page.waitForTimeout(3000);
})

test('Automating Form Submission', async ({page}) => {
    
    const newTodo = await page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('John Doe');
    await newTodo.press('Enter');
    await newTodo.fill('Avarage Joe');
    await newTodo.press('Enter');

    // const firstToDo = page.getByTestId('todo-title').nth(0);
    const firstToDo = page.getByTestId('todo-item').nth(0);
    await firstToDo.getByRole('checkbox').check();

    const secondToDo = page.getByTestId('todo-item').nth(1);

    await expect(secondToDo).not.toHaveClass('completed');
    await expect(firstToDo).toHaveClass('completed');

    await page.waitForTimeout(3000);
})

test('Handling form', async ({page}) => {
    const placeholderLocator = '[placeholder="What needs to be done?"]';

    await page.fill(placeholderLocator, 'John Doe');
    await page.locator(placeholderLocator).press('Enter');

    await page.locator('.toggle').check();

    await page.waitForTimeout(3000);
})