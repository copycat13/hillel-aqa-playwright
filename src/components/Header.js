import BaseComponent from './BaseComponent';
import LoginForm from './LoginForm';

export default class Header extends BaseComponent {
  constructor(page) {
    super(page, '.header');
    this.loginForm = new LoginForm(this._page);
    this.signInBtn = this._container.getByRole('button', { name: 'Sign In' });
  }

  async clickLoginBtn() {
    await this.signInBtn.click();
    return this.loginForm;
  }
}
