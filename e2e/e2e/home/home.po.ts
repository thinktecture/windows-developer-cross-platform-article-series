import { browser, by, element } from 'protractor';

export class HomePage {
  public navigateTo() {
    return browser.get('/');
  }

  public getWelcomeText() {
    return element(by.css('app-home h1')).getText();
  }
}
