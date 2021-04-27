import { ImportContextPackPage } from 'cypress/support/import-contextPack.po';

describe('Import Context Pack', () => {
    const page = new ImportContextPackPage();

    before(() => {
        cy.task('seed:database');
      });

      beforeEach(() => {
        page.navigateTo();
      });

      it('should not enable the import button', () => {
          page.importButton().should('be.disabled');
      });
      it('should enable the cancel button', () => {
          page.cancelImportButton().should('be.enabled');
      });
});
