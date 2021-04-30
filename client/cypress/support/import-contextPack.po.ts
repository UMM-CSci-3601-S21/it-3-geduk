export class ImportContextPackPage {
  navigateTo() {
      return cy.visit('http://localhost:4200/');
    };
    mainImportButton(){
      return cy.get('[data-test=importCpButton]');
    }
    importButton() {
      return cy.get('[data-test=confirmImportButton]');
    }
    cancelImportButton() {
      return cy.get('[data-test=confirmCancelImportButton]');
    };
    uploadButton(){
      return cy.get('[data-test=confirmUploadButton]');
    }
}
