const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: "tests/e2e/cypress/downloads",
  fixturesFolder: "tests/e2e/cypress/fixtures",
  screenshotsFolder: "tests/e2e/cypress/reports/screenshots",
  videosFolder: "tests/e2e/cypress/reports/videos",
  video: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    specPattern: ["tests/e2e/cypress/integration/**/*.spec.{js,jsx,ts,tsx}", "tests/e2e/cypress/api/**/*.spec.{js,jsx,ts,tsx}"],
    supportFile: "tests/e2e/cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--window-size=1920,1080");
          launchOptions.args.push("--force-device-scale-factor=1");
          return launchOptions;
        }
      });
    },
  },
  env: {
    MAILPIT_URL: "http://localhost:8025",
  },
});
