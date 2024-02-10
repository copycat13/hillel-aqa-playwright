import BaseComponent from '../../../components/BaseComponent';

export class EditExpensePopup extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.editExpensePopup = this._page.locator('.modal-content');
    this.editExpenseTitle = this._container.locator('.modal-title');
  }
}
