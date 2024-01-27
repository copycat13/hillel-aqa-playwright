import BaseComponent from './BaseComponent';
import RegistartionForm from './RegistrationForm';

export default class LoginForm extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.registrationForm = new RegistartionForm(this._page);
    this.registrationBtn = this._container.getByRole('button', { name: 'Registration' });
  }

  async clickRegistrationBtn() {
    await this.registrationBtn.click();
    return this.registrationForm;
  }
}
