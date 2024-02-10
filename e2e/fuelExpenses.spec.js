import { expect } from '@playwright/test';
import { test } from '../src/fixture/fuelFuxture';

test.describe('Fuel Expences tests', () => {
  test('fuel expenses page for user with no cars', async ({ noCarsFuelPage, page }) => {
    await expect.soft(noCarsFuelPage.fuelExpensesPageBody).toHaveScreenshot('no_cars_user.png');
    await expect.soft(noCarsFuelPage.addExpenseBtn).toBeDisabled();
    await expect.soft(noCarsFuelPage.fuelPageTittle).toBeVisible();
    await expect.soft(noCarsFuelPage.fuelPageTittle).toHaveText('Fuel expenses');
    await expect.soft(noCarsFuelPage.emptyPanelImage).toBeVisible();
    await expect.soft(noCarsFuelPage.emptyPanelMessage).toHaveText('You don’t have any cars in your garage');
    const profilePage = await noCarsFuelPage.clickYourGarageHyperlink();
    await expect.soft(profilePage._page).toHaveURL('panel/garage');
  });

  test('fuel expenses page for user with no expenses', async ({ noExpensesFuelPage }) => {
    await expect.soft(noExpensesFuelPage.fuelExpensesPageBody).toHaveScreenshot('no_expenses_user.png');
    await expect.soft(noExpensesFuelPage.fuelPageTittle).toBeVisible();
    await expect.soft(noExpensesFuelPage.fuelPageTittle).toHaveText('Fuel expenses');
    await expect.soft(noExpensesFuelPage.emptyPanelImage).toBeVisible();
    await expect.soft(noExpensesFuelPage.emptyPanelMessage).toHaveText('You don’t have any fuel expenses filed in');
    await expect.soft(noExpensesFuelPage.addExpenseBtn).toBeEnabled();
    const addExpensePopup = await noExpensesFuelPage.openAddExpensePopup();
    await expect.soft(addExpensePopup.addExpensePopup).toBeVisible();
    await expect.soft(addExpensePopup.addExpensePopup).toContainText('Add an expense');
  });

  test('fuel expenses cars and table', async ({ carsAndExpensesFuelPage }) => {
    await expect.soft(carsAndExpensesFuelPage.fuelPageTittle).toBeVisible();
    await expect.soft(carsAndExpensesFuelPage.fuelPageTittle).toHaveText('Fuel expenses');
    await expect.soft(carsAndExpensesFuelPage.carSelectDropdown).toBeVisible();
    await carsAndExpensesFuelPage.carSelectDropdown.click();
    await expect.soft(carsAndExpensesFuelPage.carSelectDropdownMenu).toBeVisible();
    await expect.soft(carsAndExpensesFuelPage.lastCarInDropdown).toBeEnabled();
    await carsAndExpensesFuelPage.lastCarInDropdown.click();
    await expect.soft(carsAndExpensesFuelPage.fuelExpensesTable).toBeVisible();
    await expect.soft(carsAndExpensesFuelPage.tableDateHeader).toHaveText('Date');
    await expect.soft(carsAndExpensesFuelPage.tableMileageHeader).toHaveText('Mileage');
    await expect.soft(carsAndExpensesFuelPage.tableLitesHeader).toHaveText('Liters used');
    await expect.soft(carsAndExpensesFuelPage.tableCostHeader).toHaveText('Total cost');
  });

  test('user can delete fuel expense from the list', async ({ carsAndExpensesFuelPage }) => {
    await expect(carsAndExpensesFuelPage.fuelExpensesTable).toBeVisible();
    await carsAndExpensesFuelPage.expenseItem.first().hover();
    await expect.soft(carsAndExpensesFuelPage.expenseDeleteBtn.first()).toBeVisible();
    const removeEntryPopup = await carsAndExpensesFuelPage.openRemoveEntryPopup();
    await expect.soft(removeEntryPopup.removeEntryPopup).toBeVisible();
    await expect.soft(removeEntryPopup.removeEntryTitle).toHaveText('Remove entry');
    await removeEntryPopup.cancelRemoveEntryBtn.click();
    await expect.soft(removeEntryPopup.removeEntryPopup).not.toBeVisible();
    const { date, mileage } = await carsAndExpensesFuelPage.getFirstExpenseItemDetails();
    await carsAndExpensesFuelPage.firstExpenseItem.hover();
    await carsAndExpensesFuelPage.openRemoveEntryPopup();
    await expect.soft(removeEntryPopup.removeEntryText).toHaveText(`Do you really want to remove fuel expense entry from ${date}?`);
    await removeEntryPopup.removeEntryBtn.click();
    await expect.soft(carsAndExpensesFuelPage.firstExpenseItem).not.toHaveText(mileage);
  });

  test('user can edit fuel expense entry', async ({ carsAndExpensesFuelPage }) => {
    await expect(carsAndExpensesFuelPage.fuelExpensesTable).toBeVisible();
    await carsAndExpensesFuelPage.firstExpenseItem.hover();
    await expect.soft(carsAndExpensesFuelPage.expenseEditBtn.first()).toBeVisible();
    const editExpensePopup = await carsAndExpensesFuelPage.openEditExpensePopup();
    await expect.soft(editExpensePopup.editExpensePopup).toBeVisible();
    await expect.soft(editExpensePopup.editExpenseTitle).toHaveText('Edit an expense');
  });
});
