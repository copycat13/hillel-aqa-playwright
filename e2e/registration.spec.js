import { test, expect } from '@playwright/test';
import WelcomePage from '../src/pages/WelcomePage';
import RegistartionForm from '../src/components/RegistrationForm';
import SettingsPage from '../src/pages/SettingsPage';

test.describe('New user registration', () => {
  test.beforeEach('go to registartion form', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();
    const loginForm = await welcomePage.header.clickLoginBtn();
    await loginForm.clickRegistrationBtn();
  });

  test('should register user with valid data and delete user', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('Riki', 'Maru', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    const profilePage = await registrationForm.clickRegisterBtn();
    await expect(page).toHaveURL('/panel/garage');
    await profilePage.clickSettingBtn();
    const settingsPage = new SettingsPage(page);
    await settingsPage.deleteAccount();
    await expect(page).toHaveURL('/');
  });

  test('should show error for each field with empty inputs', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('', '', '', '', '');
    await registrationForm.repeatPasswordInput.blur();
    await expect.soft(registrationForm.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.nameErrorMsg).toHaveText('Name required');
    await expect.soft(registrationForm.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.lastNameErrorMsg).toHaveText('Last name required');
    await expect.soft(registrationForm.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.emailErrorMsg).toHaveText('Email required');
    await expect.soft(registrationForm.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.passwordErrorMsg).toHaveText('Password required');
    await expect.soft(registrationForm.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.repeatPasswordErrorMsg).toHaveText('Re-enter password required');
    await expect.soft(registrationForm.registerBtn).toBeDisabled();
  });

  test('should show error for each field with wrong data', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('111', '111', '111', '111', '111');
    await registrationForm.repeatPasswordInput.blur();
    await expect.soft(registrationForm.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.nameErrorMsg).toHaveText('Name is invalid');
    await expect.soft(registrationForm.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.lastNameErrorMsg).toHaveText('Last name is invalid');
    await expect.soft(registrationForm.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.emailErrorMsg).toHaveText('Email is incorrect');
    await expect.soft(registrationForm.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.passwordErrorMsg).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect.soft(registrationForm.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.repeatPasswordErrorMsg).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect.soft(registrationForm.registerBtn).toBeDisabled();
  });

  test('should show error when only one symbol in Name & Last name fields', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('R', 'M', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    await expect.soft(registrationForm.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.nameErrorMsg).toHaveText('Name has to be from 2 to 20 characters long');
    await expect.soft(registrationForm.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.lastNameErrorMsg).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect.soft(registrationForm.registerBtn).toBeDisabled();
  });

  test('should show error when more than 20 symbols are in Name & Last name fields', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('Rrrrrrrrrrrrrrrrrrrrr', 'Mmmmmmmmmmmmmmmmmmmmm', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    await expect.soft(registrationForm.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.nameErrorMsg).toHaveText('Name has to be from 2 to 20 characters long');
    await expect.soft(registrationForm.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.lastNameErrorMsg).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect.soft(registrationForm.registerBtn).toBeDisabled();
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    const registrationForm = new RegistartionForm(page);
    await registrationForm.fillRegisterInformation('Riki', 'Maru', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!321');
    await registrationForm.repeatPasswordInput.blur();
    await expect.soft(registrationForm.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationForm.repeatPasswordErrorMsg).toHaveText('Passwords do not match');
    await expect.soft(registrationForm.registerBtn).toBeDisabled();
  });
});
