import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('file:///Users/vadym.tymeichuk/Downloads/index.html');
})

test.skip('Advanced interactions', async ({page}) => {
    
    await page.hover('#hover-me');
    
    // expect(await page.locator('#hover-me').textContent()).toContain('Text Changed!');

    await expect(page.locator('#hover-me')).toHaveText('Text Changed!');

    // expect(await page.textContent('#hover-me')).toContain('Text Changed!');

    await page.click('#context-menu', {button: 'right'});
    await expect(page.locator('//body/div[2]')).toHaveText('Context Menu Appears!');

    await page.dblclick('#double-click');
    await expect(page.locator('img')).toHaveCount(1);

    await page.waitForTimeout(3000);

})

test.skip('Drag and Drop', async ({page}) => {

    await page.dragAndDrop('.drag-source', '.drop-target');
    await expect(page.locator('.drop-target')).toHaveText('Success');

    // alternative option
    await page.locator('.drag-source').hover();
    await page.mouse.down();
    await page.locator('.drop-target').hover();
    await page.mouse.up();

    await page.waitForTimeout(3000);
})

test.skip('Handling IFrame', async ({page}) => {

    const iframeElement = await page.frame({name: 'iframeName'});
    // const iframeElement = await page.locator('[name="iframeName"]');
    const inputSelecctor = '#iframe-input';

    if (iframeElement) {
        await iframeElement.type(inputSelecctor, 'Hello Playwright');
        expect(await iframeElement.locator(inputSelecctor).inputValue()).toContain('Hello Playwright');
    } else {
        console.error('Iframe is not available');
    }

    await page.waitForTimeout(3000);
})

test.skip('Handling IFrame - suggested by ChatGPT', async ({ page }) => {
  // 1. Navigate to the page containing the iframe

  // 2. Use frameLocator to pin down the iframe and its inner elements
  const frame = page.frameLocator('iframe[name="iframeName"]');
  const input = frame.locator('#iframe-input');

  // 3. Fill the input and assert its value
  await input.fill('Hello Playwright');
  await expect(input).toHaveValue('Hello Playwright');
});