import BasePage from './BasePage';

export default class ProfileSettingsPage extends BasePage {
  constructor(page) {
    super(page, '/panel/settings');
    this.removeAccountBtn = this._page.locator('.btn-danger-bg');
    this.removeBtn = this._page.locator('.btn-danger');
  }

  async deleteAccount() {
    await this.removeAccountBtn.click({ force: true });
    await this.removeBtn.click();
  }
}
