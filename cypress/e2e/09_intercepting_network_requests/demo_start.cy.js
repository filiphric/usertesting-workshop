/// <reference types="cypress" />

it.only('board has no lists', () => {

  cy.visit('/board/1')

  cy.get('[data-cy=list]')
    .should('not.exist')
  
});

it('deleting a list', () => {

  cy.visit('/board/1')

  cy.get('[data-cy="list-options"]')
    .click()

  cy.get('[data-cy="delete-list"]')
    .click()

});