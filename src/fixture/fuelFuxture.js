const base = require('@playwright/test');
const { chromium } = require('@playwright/test');
import ProfilePage from '../pages/ProfilePage';

export const test = base.test.extend({
  noCarsFuelPage: async ({}, use) => {
    const chrome = await chromium.launch({ headless: false });
    const context = await chrome.newContext({ storageState: 'no_cars_user.json' });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);
    await profilePage.navigateTo();
    const fuelExpensesPage = await profilePage.clickFuelExpensesBtn();
    await use(fuelExpensesPage);
  },

  noExpensesFuelPage: async ({}, use) => {
    const chrome = await chromium.launch({ headless: false });
    const context = await chrome.newContext({ storageState: 'no_expenses_user.json' });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);
    await profilePage.navigateTo();
    const fuelExpensesPage = await profilePage.clickFuelExpensesBtn();
    await use(fuelExpensesPage);
  },

  carsAndExpensesFuelPage: async ({}, use) => {
    const chrome = await chromium.launch({ headless: false });
    const context = await chrome.newContext({ storageState: 'cars_and_expenses_user.json' });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);
    await profilePage.navigateTo();
    const fuelExpensesPage = await profilePage.clickFuelExpensesBtn();
    await use(fuelExpensesPage);
  },
});
