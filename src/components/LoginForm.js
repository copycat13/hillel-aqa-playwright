import BaseComponent from './BaseComponent';
import RegistartionForm from './RegistrationForm';
import ProfilePage from '../pages/ProfilePage';

export default class LoginForm extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.registrationForm = new RegistartionForm(this._page);
    this.registrationBtn = this._container.getByRole('button', { name: 'Registration' });
    this.emailInput = this._container.locator('#signinEmail');
    this.passwordInput = this._container.locator('#signinPassword');
    this.loginBtn = this._container.getByRole('button', { name: 'Login' });
  }

  async clickRegistrationBtn() {
    await this.registrationBtn.click();
    return this.registrationForm;
  }

  async loginWithCredentials(email, password) {
    await this.fill(email, password);
    await this.loginBtn.click();
    return new ProfilePage(this._page);
  }

  async fill(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
}
