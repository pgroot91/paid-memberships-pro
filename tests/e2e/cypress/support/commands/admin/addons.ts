import { ADDON_ITEM, UPSELL_POPUP } from "../../selectors/admin/addons";

export const assertUpsellPopup = (pluginName: string, licenseType: string) => {
  cy.get(UPSELL_POPUP.popup).as("popup");
  cy.get("@popup").should("be.visible");
  cy.get("@popup")
    .contains("h1", `Get ${pluginName} and more with a ${licenseType} license.`)
    .should("be.visible");
  cy.get("@popup")
    .contains("a", "View Plans and Pricing")
    .should(
      "have.attr",
      "href",
      "https://www.paidmembershipspro.com/pricing/?utm_source=plugin&utm_medium=pmpro-addons&utm_campaign=pricing&utm_content=pmpro-popup",
    )
    .and("be.visible");
  cy.get("@popup").contains("p", "Already purchased?").should("be.visible");
  cy.get("@popup")
    .contains("a", "Enter your license key here")
    .should(
      "have.attr",
      "href",
      `${Cypress.config("baseUrl")}/wp-admin/admin.php?page=pmpro-license`,
    )
    .and("be.visible");
  cy.get("@popup")
    .find(UPSELL_POPUP.closeButton)
    .should("have.attr", "title", "Close Popup")
    .and("be.visible")
    .click();
  cy.get("@popup").should("not.be.visible");
};

export const navigateToLicenseActivationPageFromUpsellPopup = () => {
  cy.get(UPSELL_POPUP.popup).as("popup");
  cy.get("@popup").should("be.visible");
  cy.get("@popup")
    .contains("a", "Enter your license key here")
    .should(
      "have.attr",
      "href",
      `${Cypress.config("baseUrl")}/wp-admin/admin.php?page=pmpro-license`,
    )
    .and("be.visible")
    .click();
  cy.location("pathname").should("contain", "admin.php");
  cy.location("search").should("contain", "page=pmpro-license");
};

export const installAddon = (addonName: string) => {
  cy.get(ADDON_ITEM.card)
    .contains(ADDON_ITEM.name, addonName)
    .as(`getItemCard`);
  cy.get(`@getItemCard`).scrollIntoView();
  cy.get(`@getItemCard`)
    .parents(ADDON_ITEM.card)
    .contains(ADDON_ITEM.button, "Install")
    .should("be.visible")
    .click();
};

export const activateAddon = (addonName: string) => {
  cy.get(ADDON_ITEM.card)
    .contains(ADDON_ITEM.name, addonName)
    .as("getItemCard");
  cy.get("@getItemCard").scrollIntoView();
  cy.get("@getItemCard")
    .parents(ADDON_ITEM.card)
    .contains(ADDON_ITEM.button, "Activate")
    .should("be.visible")
    .click();
};
