/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (username: string, password: string) => {
  cy.request({
    url: "/wp-login.php",
    method: "POST",
    form: true,
    body: {
      log: username,
      pwd: password,
      rememberme: "forever",
      testcookie: 1,
    },
    followRedirect: false,
  }).then((response) => {
    expect([200, 302]).to.include(response.status);

    // Confirm redirect to wp-admin if status 302
    if (response.status === 302) {
      expect(response.redirectedToUrl).to.include("/wp-admin/");
    }

    // Get the login cookie to extract user ID
    cy.getCookies().then((cookies) => {
      const loginCookie = cookies.find((c) =>
        c.name.startsWith("wordpress_logged_in"),
      );
      if (!loginCookie) throw new Error("Login cookie not found");

      const userId = loginCookie.value.split("|")[1];
      const localStorageKey = `WP_DATA_USER_${userId}`;

      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          "core/edit-post": {
            preferences: { features: { welcomeGuide: false } },
          },
        }),
      );
    });
  });
});

Cypress.Commands.add("loginByForm", (username: string, password: string) => {
  cy.session([username], () => {
    cy.visit("/wp-login.php");

    // Fill in login form
    cy.get("#user_login").should("be.visible").type(username, { delay: 50, log: false });
    cy.get("#user_pass")
      .should("be.visible")
      .type(password, { delay: 50, log: false });

    cy.get("#wp-submit").should("be.visible").click();

    // Get cookie and set Gutenberg preferences dynamically
    cy.getCookies().then((cookies) => {
      const loginCookie = cookies.find((c) =>
        c.name.startsWith("wordpress_logged_in"),
      );
      if (!loginCookie) throw new Error("Login cookie not found");

      const userId = loginCookie.value.split("|")[1];
      const localStorageKey = `WP_DATA_USER_${userId}`;

      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          "core/edit-post": {
            preferences: { features: { welcomeGuide: false } },
          },
        }),
      );
    });
  });
});
