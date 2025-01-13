const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../page-objects/POManager");

Before({ tags: "@Regression and @Validation" }, async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.manager = new POManager(this.page); // world constructor - this
});

BeforeStep(function () {
  console.log("------- next step -------");
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    console.log("preparing failed screenshot");
    await this.page.screenshot({
      path: "./features/failed_screenshotsTest/screenshot.png",
    });
  }
});

After(async function () {
  console.log("Fin du test");
});
