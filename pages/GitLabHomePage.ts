import { Page, Locator } from '@playwright/test';
import { GetStartedPage } from './GetStartedPage';

export class GitLabHomePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly getFreeTrialLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    this.getFreeTrialLink = page
      .locator('.navigation-bottom-right')
      .getByRole('link', { name: 'Get free trial' });
  }

  async goto() {
    await this.page.goto('https://gitlab.com/');

    return this;
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();

    return this;
  }

  async clickGetFreeTrial() {
    await this.getFreeTrialLink.click();

    return new GetStartedPage(this.page);
  }

}