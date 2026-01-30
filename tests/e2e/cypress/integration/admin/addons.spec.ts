import { ROUTES } from "../../support/routes";

describe("Paid Memberships Pro > Add Ons", { testIsolation: false }, () => {
  context("Search Functionality", { testIsolation: false }, () => {
    beforeEach("Login and Visit Addons Page", () => {
      const admin = Cypress.env("admin");
      cy.loginByForm(admin.username, admin.password);
      cy.visit(ROUTES.ADMIN_ADDONS);
    });
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
    beforeEach("Login and Visit Addons Page", () => {
      const admin = Cypress.env("admin");
      cy.loginByForm(admin.username, admin.password);
      cy.visit(ROUTES.ADMIN_ADDONS);
    });
    const categories = ["All", "Popular", "Free", "Premium"];
    categories.forEach((category) => {
      it(`Should be able to filter on Add On category: "${category}"`, () => {
        cy.contains(category);
      });
    });
  });

  context("Installation Functionality", { testIsolation: false }, () => {
    beforeEach("Login and Visit Addons Page", () => {
      const admin = Cypress.env("admin");
      cy.loginByForm(admin.username, admin.password);
      cy.visit(ROUTES.ADMIN_ADDONS);
    });
    it("Should be able to install an Add On", () => {});
  });

  context("No License, Upsell Notice", { testIsolation: false }, () => {
    beforeEach("Login and Visit Addons Page", () => {
      const admin = Cypress.env("admin");
      cy.loginByForm(admin.username, admin.password);
      cy.visit(ROUTES.ADMIN_ADDONS);
    });
    const addons = [
      { name: "Add PayPal Express", licenseType: "Standard" },
      { name: "Member Network Sites", licenseType: "Plus" },
    ];
    addons.forEach((addon) => {
      it(`Should not be able to install "${addon.name} (License: ${addon.licenseType})" without an active license, upsell popup should appear`, () => {
        cy.contains(addon.name);
      });
    });
  });
});
