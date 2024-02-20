import BasePage from './BasePage';

export default class ProfilePage extends BasePage {
  constructor(page) {
    super(page, 'panel/profile');
    this.profileName = this._page.locator('p.profile_name');
  }
}
