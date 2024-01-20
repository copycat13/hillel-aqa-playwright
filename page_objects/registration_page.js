export class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  get nameInput() {
    return this.page.locator('#signupName');
  }

  get lastNameInput() {
    return this.page.locator('#signupLastName');
  }

  get emailInput() {
    return this.page.locator('#signupEmail');
  }

  get passwordInput() {
    return this.page.locator('#signupPassword');
  }

  get repeatPasswordInput() {
    return this.page.locator('#signupRepeatPassword');
  }

  get registerBtn() {
    return this.page.getByRole('button', { name: 'Register' });
  }

  get settingsBtn() {
    return this.page.getByText('Settings').last();
  }

  get removeAccountBtn() {
    return this.page.locator('.btn-danger-bg');
  }

  get removeBtn() {
    return this.page.locator('.btn-danger');
  }

  get nameInputError() {
    return this.page.locator('.form-group:nth-child(1) .invalid-feedback');
  }

  get lastNameInputError() {
    return this.page.locator('.form-group:nth-child(2) .invalid-feedback');
  }

  get emailInputError() {
    return this.page.locator('.form-group:nth-child(3) .invalid-feedback');
  }

  get passwordInputError() {
    return this.page.locator('.form-group:nth-child(4) .invalid-feedback');
  }

  get repeatPasswordInputError() {
    return this.page.locator('.form-group:nth-child(5) .invalid-feedback');
  }

  async fillRegisterInformation(name, lastName, email, password, repeatPassword) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }
}
