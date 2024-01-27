import BasePage from './BasePage';
import ProfileSettingsPage from './ProfileSettingsPage';

export default class ProfilePage extends BasePage {
  constructor(page) {
    super(page, '/panel/garage');
    this.settingBtn = this._page.getByText('Settings').last();
    this.profileSettingsPage = new ProfileSettingsPage(this._page);
  }

  async clickSettingBtn() {
    await this.settingBtn.click();
    return this.profileSettingPage;
  }
}
