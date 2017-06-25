import {browser, by, element} from 'protractor';

export class StarWarsPlanetsPage {
  public navigateTo() {
    return browser.get('/#/starwars/list/planets/1');
  }

  public getHeadlineText() {
    return element(by.css('h1')).getText();
  }

  public getPlanets() {
    return element.all(by.css('.table tbody tr'));
  }
}
