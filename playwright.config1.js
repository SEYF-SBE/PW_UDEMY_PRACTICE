// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  use: {
    launchOptions: {
      // Maximize viewport - viewport in projects-use must be null
      args: ["--start-maximized"],
    },
  },
  testDir: "./tests",
  // to retrie tests (flaky tests)
  // retries: 2,
  // workers config
  // workers: 1, // just 1 worker will work (no parallelism)
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    // for assertions
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        // here we put all metadata for project ( browserName, screenshots, retry execution number)
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "on", // "retain-on-failure",
        ...devices["iPhone 11 Pro Max"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        // video: "retain-on-failure",
        ignoreHTTPSErrors: true,
        //permissions: ['geolocation'],
        trace: "on",
        viewport: null,
        // viewport: { width: 720, height: 720 }, to test mobile viewport for example
      },
    },
  ],

  /* Configure projects for major browsers */
});

// to make this project executing with this config file :
// npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js
// tell what project u will execute :
// npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=chrome
