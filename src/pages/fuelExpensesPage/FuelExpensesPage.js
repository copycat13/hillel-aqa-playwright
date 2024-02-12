import BasePage from '../BasePage';
import ProfilePage from '../ProfilePage';
import AddExpensePopup from './components/AddExpensePopup';
import { EditExpensePopup } from './components/EditExpensePopup';
import { RemoveEntryPopup } from './components/RemoveEntryPopup';

export default class FuelExpensesPage extends BasePage {
  constructor(page) {
    super(page, '/panel/expanses');
    this.fuelExpensesPageBody = this._page.locator('.global-layout');
    this.fuelPageTittle = this._page.getByRole('heading');
    this.addExpenseBtn = this._page.getByRole('button', { name: 'Add an expense' });
    this.carSelectDropdown = this._page.locator('#carSelectDropdown');
    this.carSelectDropdownMenu = this._page.locator('.car-select-dropdown_menu');
    this.lastCarInDropdown = this._page.locator('.car-select-dropdown_item').last();
    this.fuelExpensesTable = this._page.locator('.expenses_table tr').first();
    this.tableDateHeader = this._page.locator('th:nth-child(1)');
    this.tableMileageHeader = this._page.locator('th:nth-child(2)');
    this.tableLitesHeader = this._page.locator('th:nth-child(3)');
    this.tableCostHeader = this._page.locator('th:nth-child(4)');
    this.emptyPanelImage = this._page.locator('.panel-empty > svg');
    this.emptyPanelMessage = this._page.locator('.panel-empty_message');
    this.yourGarageHyperlink = this.emptyPanelMessage.getByRole('link', { name: 'your garage' });
    this.expenseItem = this._page.locator('.expenses_table > tbody > tr');
    this.firstExpenseItem = this.expenseItem.first();
    this.expenseDeleteBtn = this._page.locator('.expenses_table > tbody > tr button.btn-delete');
    this.expenseEditBtn = this._page.locator('.expenses_table > tbody > tr button.btn-edit');
    this.profilePage = new ProfilePage(this._page);
    this.addExpensePopup = new AddExpensePopup(this._page);
    this.removeEntryPopup = new RemoveEntryPopup(this._page);
    this.editExpensePopup = new EditExpensePopup(this._page);
  }

  async openAddExpensePopup() {
    await this.addExpenseBtn.click();
    return this.addExpensePopup;
  }

  async clickYourGarageHyperlink() {
    await this.yourGarageHyperlink.click();
    return this.profilePage;
  }

  async openRemoveEntryPopup() {
    await this.expenseDeleteBtn.first().click();
    return this.removeEntryPopup;
  }

  async openEditExpensePopup() {
    await this.expenseEditBtn.first().click();
    return this.editExpensePopup;
  }

  async getFirstExpenseItemDetails() {
    const firstExpenseItemText = await this.firstExpenseItem.innerText();
    const [date, mileage] = firstExpenseItemText.split('\t');
    return { date, mileage };
  }
}
