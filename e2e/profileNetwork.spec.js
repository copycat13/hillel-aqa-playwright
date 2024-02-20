import { test, expect } from '@playwright/test';
import { login } from './loginStorage.spec';
import GaragePage from '../src/pages/GaragePage';

const modifiedData = {
  data: {
    name: 'Network',
    lastName: 'Intercept',
  },
};

test.describe('Network test', () => {
  test.only('change user name and last name', async ({ page }) => {
    await login(page, 'aqa-homework19@user.com', 'Test!123');
    await page.route('**/users/profile', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(modifiedData),
      });
    });
    const garagePage = new GaragePage(page);
    const profilePage = await garagePage.clickProfileBtn();
    await expect(profilePage.profileName).toHaveText('Network Intercept');
  });
});
