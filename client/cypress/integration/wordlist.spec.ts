import { WordListPage } from '../support/wordlist.po';

const page = new WordListPage();

describe('WordList', () => {

    before(() => {
        cy.task('seed:database');
    });

    beforeEach(() => {
        page.navigateTo();
    });

    afterEach(() => {
      cy.task('seed:database');
    });

    it('Should load wordlists', () => {
        page.getWordListCards().should('not.have.length', '0');
    });

    it('Should click view wordlist on a wordlist and go to the right URL', () => {
        page.getWordListCards().first().then((card) => {
          page.clickViewWordList(page.getWordListCards().first());
          cy.url().should('match', /^(https?|http):\/\/[^\s$.?#].[^\s]*$/g);
        });
    });

    it('Should click add wordlist and go to the right URL', () => {
        page.addWordListButton().click();
        cy.url().should(url => expect(url.endsWith('/packs/605bc9d893b2d94300a98753/new')).to.be.true);

    });

    it('Should click import wordlist and go to the right URL', () => {
        page.importWordListButton().click();
        cy.url().should(url => expect(url.endsWith('/packs/605bc9d893b2d94300a98753/import')).to.be.true);
    });

    it('Should change the status of the context pack to disabled and back', () =>{
      page.getEnableDisableButton().click();
      page.getEnableDisableButton().contains('enable');
      page.getEnableDisableButton().click();
      page.getEnableDisableButton().contains('disable');
    });

    it('Should change the name of the context pack and back', () => {
      page.getNameBox().click().type(' Test Pack');
      page.getSaveButton().click();
      cy.get('.mat-simple-snackbar').should('contain',`Birthday pack test pack Pack is Updated`);
    });

    it('Should show a confirmation message when delete context pack is clicked', () => {
        page.clickDeleteContextPack().click();
        page.getDeleteContextPackConfirmation().should('be.visible');
    });

    it('Should hide the confirmation message when cancel was clicked', () => {
        page.clickDeleteContextPack().click();
        page.getDeleteContextPackConfirmation().should('be.visible');
        page.getDeleteContextPackConfirmationCancel().click();
        page.getDeleteContextPackConfirmation().should('not.exist');
    });

    it('Should delete the context pack when confirmed', () => {
        page.clickDeleteContextPack().click();
        page.getDeleteContextPackConfirmation().should('be.visible');
        page.getDeleteContextPackConfirmDeleteButton().click();
        cy.url().should('match', /\/$/);
        page.getCpCards().should('have.length', 3);
    });

});
