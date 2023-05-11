/// <reference types="cypress" />
it('Visits the "about" page on homepage', () => {

  cy.visit('/')

  cy.get('[data-cy="footer-link"]')
    .click({ force: true })

  cy.contains('Learn more')
    .click()

  cy.location('pathname')
    .should('eq', '/about')

  cy.contains('h1', 'About')  
    .should('be.visible')
  
});