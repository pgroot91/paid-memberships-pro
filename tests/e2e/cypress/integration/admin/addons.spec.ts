import { assertUpsellPopup, installAddon, navigateToLicenseActivationPageFromUpsellPopup } from "../../support/commands/admin/addons";
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

    it("Should be able to install and activate the add-on: PayFast Gateway", () => {
    });

    it("Should be able to install another add-on", () => {});
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
        installAddon(addon.name);
        assertUpsellPopup(addon.name, addon.licenseType);
      });
    });

    it("Should be able to navigate to the license page from the upsell popup", () => {
      installAddon("Email Confirmation");
      navigateToLicenseActivationPageFromUpsellPopup();
    });
  });
});
