/// <reference types="cypress" />

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: "tests/e2e/cypress/downloads",
  fixturesFolder: "tests/e2e/cypress/fixtures",
  screenshotsFolder: "tests/e2e/cypress/reports/screenshots",
  videosFolder: "tests/e2e/cypress/reports/videos",
  watchForFileChanges: false,
  video: true,
  requestTimeout: 20000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    specPattern: ["tests/e2e/cypress/integration/**/*.spec.{js,jsx,ts,tsx}", "tests/e2e/cypress/api/**/*.spec.{js,jsx,ts,tsx}"],
    supportFile: "tests/e2e/cypress/support/e2e.ts",
    setupNodeEvents(on, config) {},
  },
  env: {
    MAILPIT_URL: "http://localhost:8025",
  },
  experimentalWebKitSupport: true
});
