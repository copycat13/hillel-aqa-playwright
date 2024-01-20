import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page_objects/registration_page';

test.describe('New user registration', () => {
  test.beforeEach('navigate to registration form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();
  });

  test('should register user with valid data and delete user', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('Riki', 'Maru', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    await registrationPage.registerBtn.click();
    await expect(page).toHaveURL('/panel/garage');
    await registrationPage.settingsBtn.click();
    await registrationPage.removeAccountBtn.click({ force: true });
    await registrationPage.removeBtn.click();
    await expect(page).toHaveURL('/');
  });

  test('should show error for each field with empty inputs', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('', '', '', '', '');
    await registrationPage.repeatPasswordInput.blur();
    await expect.soft(registrationPage.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.nameInputError).toHaveText('Name required');
    await expect.soft(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.lastNameInputError).toHaveText('Last name required');
    await expect.soft(registrationPage.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.emailInputError).toHaveText('Email required');
    await expect.soft(registrationPage.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.passwordInputError).toHaveText('Password required');
    await expect.soft(registrationPage.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.repeatPasswordInputError).toHaveText('Re-enter password required');
    await expect.soft(registrationPage.registerBtn).toBeDisabled();
  });

  test('should show error for each field with wrong data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('111', '111', '111', '111', '111');
    await registrationPage.repeatPasswordInput.blur();
    await expect.soft(registrationPage.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.nameInputError).toHaveText('Name is invalid');
    await expect.soft(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.lastNameInputError).toHaveText('Last name is invalid');
    await expect.soft(registrationPage.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.emailInputError).toHaveText('Email is incorrect');
    await expect.soft(registrationPage.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.passwordInputError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect.soft(registrationPage.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.repeatPasswordInputError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect.soft(registrationPage.registerBtn).toBeDisabled();
  });

  test('should show error when only one symbol in Name & Last name fields', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('R', 'M', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    await expect.soft(registrationPage.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.nameInputError).toHaveText('Name has to be from 2 to 20 characters long');
    await expect.soft(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.lastNameInputError).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect.soft(registrationPage.registerBtn).toBeDisabled();
  });

  test('should show error when more than 20 symbols are in Name & Last name fields', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('Rrrrrrrrrrrrrrrrrrrrr', 'Mmmmmmmmmmmmmmmmmmmmm', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!123');
    await expect.soft(registrationPage.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.nameInputError).toHaveText('Name has to be from 2 to 20 characters long');
    await expect.soft(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.lastNameInputError).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect.soft(registrationPage.registerBtn).toBeDisabled();
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillRegisterInformation('Riki', 'Maru', 'aqa-rikimaru@gmail.com', 'Test!123', 'Test!321');
    await registrationPage.repeatPasswordInput.blur();
    await expect.soft(registrationPage.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect.soft(registrationPage.repeatPasswordInputError).toHaveText('Passwords do not match');
    await expect.soft(registrationPage.registerBtn).toBeDisabled();
  });
});
