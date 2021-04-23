

export class DisplayContextPacksComponent {

    navigateTo() {
        return cy.visit('http://localhost:4200/');
    }

    getCpCards() {
        return cy.get('.context-pack-display app-cp-card');
    }

    addCpButton() {
        return cy.get('[data-test=addCpButton]');
    }


   getWordListCards() {
        return cy.get('.wordlist-cards');
    }

    clickViewCp(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=viewContextPackButton]').click();
    }

    clickDeleteCp(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=deleteContextPackButton]').click();
    }

    getDeleteCpConfirmation(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=deleteConfirmationButton]').click();
    }

    clickButton() {
      return cy.get('[data-test=button]').click({multiple: true});
    }

}
