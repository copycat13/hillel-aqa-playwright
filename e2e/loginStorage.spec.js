import { test } from '@playwright/test';
import WelcomePage from '../src/pages/WelcomePage';

const usersData = {
  noCarsUser: {
    login: 'aqa-nocars@user.com',
    password: 'Test!123',
  },
  noExpensesUser: {
    login: 'aqa-noexpenses@user.com',
    password: 'Test!123',
  },
  carsAndExpensesUser: {
    login: 'aqa-cars&expenses@user.com',
    password: 'Test!123',
  },
};

test.describe('Users from fuel expenses tests', () => {
  test('login as user without cars', async ({ page }) => {
    const user = usersData.noCarsUser;
    await login(page, user.login, user.password);
    await page.context().storageState({ path: 'no_cars_user.json' });
  });

  test('login as user without expenses', async ({ page }) => {
    const user = usersData.noExpensesUser;
    await login(page, user.login, user.password);
    await page.context().storageState({ path: 'no_expenses_user.json' });
  });

  test('login as user with cars and expenses', async ({ page }) => {
    const user = usersData.carsAndExpensesUser;
    await login(page, user.login, user.password);
    await page.context().storageState({ path: 'cars_and_expenses_user.json' });
  });
});

export async function login(page, email, password) {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigateTo();
  const loginForm = await welcomePage.header.clickLoginBtn();
  await loginForm.loginWithCredentials(email, password);
  await page.waitForSelector('app-garage');
}
