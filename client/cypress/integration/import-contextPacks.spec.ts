import { ImportContextPackPage } from 'cypress/support/import-contextPack.po';

describe('Import Context Pack', () => {
    const page = new ImportContextPackPage();

    before(() => {
        cy.task('seed:database');
      });

      beforeEach(() => {
        page.navigateTo();
      });
      it('should click the import button on main page', () => {
        page.mainImportButton().click();
      });

      it('should enable the cancel button', () => {
        page.mainImportButton().click();
        page.cancelImportButton().should('be.enabled');
        page.cancelImportButton().click();
      });

      it('should click the upload button', () => {
        page.mainImportButton().click();
        page.uploadButton().click();
    });
    it('should not enable the import button', () => {
        page.importButton().should('be.disabled');
  });
});
