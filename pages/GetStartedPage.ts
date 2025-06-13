import { Page, Locator, expect } from '@playwright/test';

export class GetStartedPage {

    readonly page: Page;
    readonly registerButton: Locator;
    readonly fNameField: Locator;
    readonly lNameField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = this.page.getByTestId('new-user-register-button');
        this.fNameField = this.page.getByTestId('new-user-first-name-field');
        this.lNameField = this.page.getByTestId('new-user-last-name-field');
    }

    async fillInFirstName(fName: string) {
        await this.fNameField.fill(fName);

        return this;
    }

  async fillInLastName(lName: string) {
    await this.lNameField.fill(lName);

    return this;
  }

  async clickRegister() {

    await this.registerButton.click();

    return this;
  }

  async assertFnameError() {

    await expect(this.page.locator('.username.form-group .gl-field-error:not(.hidden)'))
        .toHaveText('Please create a username with only alphanumeric characters.');
  }
}