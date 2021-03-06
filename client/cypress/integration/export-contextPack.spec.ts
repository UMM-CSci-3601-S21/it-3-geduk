import { ExportContextPackPage } from 'cypress/support/export-contextpack.po';

describe('Export Contextpack', () => {
  const page = new ExportContextPackPage();


  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });
  it('the export context pack button should be clicked', () => {
    page.exportContextPackButton().click();
  });
  it('the cancel button should be clicked', () => {
    page.exportContextPackButton().click();
    page.cancelButton().click();
  });

  it('the json should be downloaded', () => {
    page.exportContextPackButton().click();
    page.downJsonButton().click();
  });

  it('the json should be viewable', () => {
    page.exportContextPackButton().click();
    page.viewContextPackJsonButton().click();
  });
}
);
