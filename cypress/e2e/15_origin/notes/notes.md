# Switching origin in Cypress
Cypress was built to be a development companion. Because of this it has chosen a design that different from other automation tools out there. Cypress runs from inside the browser, which means that navigating to another origin will affect the whole browser environment, including Cypress code itself. 

This is why cross-origin support landed in Cypress as late as version 10. Its implementation was preceeded by many architectural changes that allowed this feature to finally be released.

`cy.origin()` was built with a 3rd party login use case in mind. In other words, access to a third party server is more or less temporary and it’s assumed, that after a quick interaction with 3rd party site, you will return back to the original `baseUrl`.

A pseudocode example might look like this:

```js
  // visit login paghe
  cy.visit('/login')

  cy.get('[data-cy="signin-button"]')
    .click()

  // sign in redirects to 3rd party
  cy.origin('https://auth.com', () => {

    cy.get('#email')
      .type('filip@example.com')

    cy.get('#password')
      .type('Asdf.1234#')
  })

  // after login, we return back
  cy.location('pathname')
    .should('eq', '/home')
```

All interaction that happens on 3rd party server will be wrapped inside `cy.origin()` command.

`cy.origin()` is inteded to be used with `cy.session()` for 3rd party login situation. Combining these two commands helps with cases where a third party server can be blocked by captcha. Since only a single login might be needed when using `cy.session()` the login attempts are limited and chances of triggering captcha are way lower.

Another use-case for entering 3rd party servers are payment gates. These have usually an extra layer of protection. For example, payment gates rarely allow to be displayed inside an iframe. This is why they implement framebusting techniques that prevent the code from being embedded in an iframe. Since Cypress runs inside an iframe, this poses a problem for payment gates. One way Cypress tries to tackle this by manually rewriting the framebusting code on the fly. This works for many sites out there, but it’s still in experimental mode. To enable this, add the following to your `cypress.config.js` file:

```
experimentalModifyObstructiveThirdPartyCode: true
```

## Useful reading
- [docs for cy.origin() command](https://docs.cypress.io/api/commands/origin)
- [list of experimental features](https://docs.cypress.io/guides/references/experiments)
- [cy.session() documentation](https://docs.cypress.io/api/commands/session)