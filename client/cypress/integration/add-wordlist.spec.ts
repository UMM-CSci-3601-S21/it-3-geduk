import { AddWordListPage } from '../support/add-wordlist.po';

describe('Add Wordlist', () => {
  const page = new AddWordListPage();


  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });


  it('Should enable and disable the save button', () => {
    page.addWordListButton().should('be.disabled');
    page.getWordListName().type('sada');
    page.addWordListButton().should('be.enabled');
  });

  it('Should not enable the save button if the word list name contains special character or punctuation', () => {
    page.addWordListButton().should('be.disabled');
    page.getWordListName().type('أنا أحبك?+;');
    page.addWordListButton().should('be.disabled');
  });

  it('Should add a word', () => {
    page.addWord({ word: 'Boo', forms: [], type: 'nouns' });
    page.getWordCards().should('have.length', '1');
  });


  it('Should delete a word', () => {
    page.addWord({ word: 'Joshua', forms: [], type: 'nouns' });
    page.getWordCards().should('have.length', '1');
    cy.get('.word-card').first().trigger('mouseover');
    page.deleteWordButton().eq(1).click({ force: true });
    page.getWordCards().should('have.length', '0');
  });
  it('Should type a word and get a suggestion', () => {
    page.typeWord({ word: 'Chicken', forms: [], type: 'noun' });
    cy.wait(2000);
    page.addWordButton().should('be.enabled');

  });

  it('Should add a wordlist', () => {
    page.addWordList({
      name: 'funpack',
      enabled: true,
      nouns: [{ word: 'clown', forms: ['clowns'] }],
      adjectives: [{ word: 'heavy', forms: ['heavy', 'heavier', 'heavily'] }],
      verbs: [{ word: 'laugh', forms: ['laugh', 'laughing', 'laughed'] }],
      misc: [{ word: 'to', forms: [] }]
    });
    cy.url().should(url => expect(url.endsWith('/packs/605bc9d893b2d94300a98753')).to.be.true);
  });

  it('Should fail to add a duplicate word list', () => {
    page.addWordList({
      name: 'birthday',
      enabled: true,
      nouns: [{ word: 'clown', forms: ['clowns'] }],
      adjectives: [{ word: 'heavy', forms: ['heavy', 'heavier', 'heavily'] }],
      verbs: [{ word: 'laugh', forms: ['laugh', 'laughing', 'laughed'] }],
      misc: [{ word: 'to', forms: [] }]
    });
    cy.get('.mat-simple-snackbar').should('contain',`There is already a Word List with the name birthday in the context pack`);
  });

});
