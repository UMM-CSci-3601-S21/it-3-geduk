export class ImportContextPackPage {
  navigateTo() {
      return cy.visit('/import-cp');
    };
    importButton() {
      return cy.get('[data-test=confirmImportButton]');
    }
    cancelImportButton() {
      return cy.get('[data-test=confirmCancelImportButton]');
    };
}
