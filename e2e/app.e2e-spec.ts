import { Ng2boxesPage } from './app.po';

describe('ng2boxes App', () => {
  let page: Ng2boxesPage;

  beforeEach(() => {
    page = new Ng2boxesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
