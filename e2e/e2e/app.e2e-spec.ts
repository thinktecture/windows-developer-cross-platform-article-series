import { ProtractorExamplePage } from './app.po';

describe('protractor-example App', () => {
  let page: ProtractorExamplePage;

  beforeEach(() => {
    page = new ProtractorExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
