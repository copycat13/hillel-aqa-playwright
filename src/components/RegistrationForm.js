import ProfilePage from '../pages/ProfilePage';
import BaseComponent from './BaseComponent';

export default class RegistartionForm extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.nameInput = this._container.locator('#signupName');
    this.lastNameInput = this._container.locator('#signupLastName');
    this.emailInput = this._container.locator('#signupEmail');
    this.passwordInput = this._container.locator('#signupPassword');
    this.repeatPasswordInput = this._container.locator('#signupRepeatPassword');
    this.registerBtn = this._container.getByRole('button', { name: 'Register' });
    this.nameErrorMsg = this._container.locator('.form-group:nth-child(1) .invalid-feedback');
    this.lastNameErrorMsg = this._container.locator('.form-group:nth-child(2) .invalid-feedback');
    this.emailErrorMsg = this._container.locator('.form-group:nth-child(3) .invalid-feedback');
    this.passwordErrorMsg = this._container.locator('.form-group:nth-child(4) .invalid-feedback');
    this.repeatPasswordErrorMsg = this._container.locator('.form-group:nth-child(5) .invalid-feedback');
    this.profilePage = new ProfilePage(this._page);
  }

  async fillRegisterInformation(name, lastName, email, password, repeatPassword) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async clickRegisterBtn() {
    await this.registerBtn.click();
    return this.profilePage;
  }
}
