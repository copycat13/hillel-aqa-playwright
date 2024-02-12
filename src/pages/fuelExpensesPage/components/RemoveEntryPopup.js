import BaseComponent from '../../../components/BaseComponent';

export class RemoveEntryPopup extends BaseComponent {
  constructor(page) {
    super(page, '.modal-content');
    this.removeEntryPopup = this._page.locator('.modal-content');
    this.removeEntryTitle = this._container.locator('.modal-title');
    this.removeEntryText = this._container.locator('.modal-body');
    this.removeEntryBtn = this._container.getByRole('button', { name: 'Remove' });
    this.cancelRemoveEntryBtn = this._container.getByRole('button', { name: 'Cancel' });
    this.expenseEditBtn = this._container.locator('button.btn-edit');
  }
}
