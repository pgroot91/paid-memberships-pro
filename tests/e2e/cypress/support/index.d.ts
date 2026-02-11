/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to log in via API
     * @example cy.loginByApi('admin', 'password123')
     */
    loginByApi(username: string, password: string): Chainable<void>;

    /**
     * Custom command to log in via Form (with session caching)
     * @example cy.loginByForm('admin', 'password123')
     */
    loginByForm(username: string, password: string): Chainable<void>;
  }
}
