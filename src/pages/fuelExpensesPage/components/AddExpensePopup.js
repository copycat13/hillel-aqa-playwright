import { expect } from '@playwright/test';
import { test } from '../../../fixture/fuelFuxture';
import BaseComponent from '../../../components/BaseComponent';

export default class AddExpensePopup extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.addExpensePopup = this._page.locator('.modal-content');
    this.carSelect = this._container.locator('#addExpenseCar');
    this.dateSelect = this._container.locator('#addExpenseDate');
    this.milageInput = this._container.locator('#addExpenseMileage');
    this.litersInput = this._container.locator('#addExpenseLiters');
    this.totalCostInput = this._container.locator('#addExpenseTotalCost');
    this.addExpenseBtn = this._container.getByRole('button', { name: 'Add' });
    this.cancelBtn = this._container.getByRole('button', { name: 'Cancel' });
    this.errorMsg = this._container.locator('.invalid-feedback');
  }

  async fill(car, milage, liters, totalCost) {
    return test.step('Fill add an expense form', async () => {
      await this.carSelect.selectOption({ label: car });
      await this.milageInput.fill(milage.toString());
      await this.litersInput.fill(liters.toString());
      await this.totalCostInput.fill(totalCost.toString());
    });
  }

  async addExpense(car, milage, liters, totalCost) {
    await this.fill(car, milage, liters, totalCost);
    await this.addExpenseBtn.click();
  }

  async checkError(error) {
    await expect(this.errorMsg).toHaveText(error);
  }
}
