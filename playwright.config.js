// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    // for assertions
    timeout: 5000,
  },
  reporter: [["line"], ["allure-playwright"], ["html"]],
  use: {
    // here we put all metadata for project ( browserName, screenshots, retry execution number)
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "on", // "retain-on-failure",
  },

  /* Configure projects for major browsers */
});
