export const assertUpsellPopup = (pluginName: string, licenseType: string) => {
  cy.get(".pmpro-upsell-modal").should("be.visible");
  cy.get(".pmpro-upsell-modal .pmpro-upsell-modal-close").click();
  cy.get(".pmpro-upsell-modal").should("not.exist");
}   


export const installAddon = (addonName: string) => {
  cy.contains(".pmpro-addon-card", addonName)
    .find(".pmpro-addon-install-button")
    .click();  
}