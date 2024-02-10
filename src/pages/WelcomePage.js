import BasePage from './BasePage';
import Header from '../components/Header';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.header = new Header(page);
  }

  async navigateTo() {
    await super.navigate();
  }
}
