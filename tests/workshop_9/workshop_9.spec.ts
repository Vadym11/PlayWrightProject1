import {test, expect} from '@playwright/test';

test.describe('Running test with GitHub Actions', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    })

    test('Automating form submission in @githubActions', async ({page}) => {

        const newToDo = page.getByPlaceholder('What needs to be done?');
        await newToDo.fill('John Doe');
        await newToDo.press('Enter');
        await newToDo.fill('John Doe 1');
        await newToDo.press('Enter');

        const firstToDo = page.getByTestId('todo-item').nth(0);
        await firstToDo.getByRole('checkbox').check();
        const secondToDo = page.getByTestId('todo-item').nth(1);

        await expect(firstToDo).toHaveClass('completed');
        await expect(secondToDo).not.toHaveClass('completed');
    })

    test('Handling form in @githubActions', async ({page}) => {

        await page.fill('[placeholder="What needs to be done?"]', 'John Doe');
        await page.locator('[placeholder="What needs to be done?"]').press('Enter');

        const checkbox = page.locator('.toggle')
        await checkbox.check();
    })
})