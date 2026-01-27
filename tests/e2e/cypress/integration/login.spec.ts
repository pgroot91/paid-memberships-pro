describe("Login", () => {
  beforeEach(() => {
    const admin = Cypress.env("admin");
    cy.loginByForm(
      admin.username,
      admin.password,
    );
  });
  it("Visits the WordPress site", () => {
    cy.visit("/");
    cy.contains("a", "paid-memberships-pro");
  });
  it("Visits the WordPress site", () => {
    cy.visit("/");
    cy.contains("a", "paid-memberships-pro");
  });
  it("Visits the WordPress site", () => {
    cy.visit("/");
    cy.contains("a", "paid-memberships-pro");
  });
});
