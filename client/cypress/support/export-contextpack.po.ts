export class ExportContextPackPage {
  navigateTo() {
    return cy.visit('/packs/605bc9d893b2d94300a98753');
  }
  exportContextPackButton(){
    return cy.get('[data-test=exportContextPackButton]');
  }
  cancelButton(){
    return cy.get('[data-test=confirmCancelImportButton]');
  }

  downJsonButton(){
    return cy.get('[data-test=downloadButton]');
  }

  viewContextPackJsonButton(){
    return cy.get('[data-test="showJsonButton"]');
  }
}
