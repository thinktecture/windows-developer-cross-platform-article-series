import {StarWarsPlanetsPage} from './planets.po';

describe('StarWarsPlanetsPage', () => {
  let page: StarWarsPlanetsPage;

  beforeEach(() => {
    page = new StarWarsPlanetsPage();
  });

  it('should show the correct headline', () => {
      page.navigateTo();
      expect(page.getHeadlineText()).toEqual('List of Planets');
  });

  it('should load 10 planets', () => {
    page.navigateTo();
    expect(page.getPlanets().count()).toBe(10);
  });
});
