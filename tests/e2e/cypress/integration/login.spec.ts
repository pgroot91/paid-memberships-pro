describe("Login", () => {
  context("Login via API", () => {
    beforeEach(() => {
      const admin = Cypress.env("admin");
      cy.loginByApi(admin.username, admin.password);
    });
    it("Visits the WordPress site", () => {
      cy.visit("/");
      cy.contains("a", "paid-memberships-pro");
    });
  });

  context("Login via form", () => {
    beforeEach(() => {
      const admin = Cypress.env("admin");
      cy.loginByForm(admin.username, admin.password);
    });
    it("Visits the WordPress site", () => {
      cy.visit("/");
      cy.contains("a", "paid-memberships-pro");
    });
  });
});
