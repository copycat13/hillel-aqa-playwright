export default class BaseComponent {
  constructor(page, container) {
    this._page = page;
    this._container = this._page.locator(container);
  }
}
