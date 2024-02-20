import BasePage from './BasePage';
import SettingsPage from './SettingsPage';
import FuelExpensesPage from './fuelExpensesPage/FuelExpensesPage';
import ProfilePage from './ProfilePage';

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page, '/panel/garage');
    this.addCarBtn = this._page.getByRole('button', { name: 'Add car' });
    this.fuelExpensesBtn = this._page.getByText('Fuel Expenses').last();
    this.settingsBtn = this._page.getByText('Settings').last();
    this.profileBtn = this._page.getByText('Profile').last();
    this.settingsPage = new SettingsPage(this._page);
    this.profilePage = new ProfilePage(this._page);
  }

  async clickFuelExpensesBtn() {
    await this.fuelExpensesBtn.click();
    return new FuelExpensesPage(this._page);
  }

  async clickSettingsBtn() {
    await this.settingsBtn.click();
    return this.settingsPage;
  }

  async clickProfileBtn() {
    await this.profileBtn.click();
    return this.profilePage;
  }

  async navigateTo() {
    await super.navigate();
  }
}
