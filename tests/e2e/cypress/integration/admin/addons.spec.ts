import { ROUTES } from "../../support/routes";

describe("Paid Memberships Pro > Add Ons", { testIsolation: false }, () => {
  beforeEach("Login and Visit Addons Page", () => {
    const admin = Cypress.env("admin");
    cy.loginByForm(admin.username, admin.password);
    cy.visit(ROUTES.ADMIN_ADDONS);
  });

  context("Search Functionality", { testIsolation: false }, () => {
    const addons = [
      "Add PayPal Express",
      "Member Network Sites",
      "PayFast Gateway",
    ];
    addons.forEach((addon) => {
      it(`Should be able to search for Add On: "${addon}"`, () => {
        cy.contains(addon);
      });
    });
  });

  context("Filter Functionality", { testIsolation: false }, () => {
    const categories = ["All", "Popular", "Free", "Premium"];
    categories.forEach((category) => {
      it(`Should be able to filter on Add On category: "${category}"`, () => {
        cy.contains(category);
      });
    });
  });

  context("Installation Functionality", { testIsolation: false }, () => {
    it("Should be able to install an Add On", () => {});
  });

  context("No License, Upsell Notice", { testIsolation: false }, () => {
    const addons = ["Add PayPal Express", "Member Network Sites"];
    addons.forEach((addon) => {
      it(`Should not be able to install a premium Add On "${addon}" without an active license, upsell popup should appear`, () => {
        cy.contains(addon);
      });
    });
  });
});
