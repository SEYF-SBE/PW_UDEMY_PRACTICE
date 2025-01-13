const { test, expect } = require("@playwright/test");

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});
test("hidden element Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto('https://google.com');
  // await page.goBack();
  // await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("java popup Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
});

test("hover Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#mousehover").hover();
  await page.getByRole("link", { name: "Reload" }).click();
});

test("frame handeling Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
  await expect(
    framesPage.getByText("Join 13,522 Happy Subscibers!")
  ).toHaveText("Join 13,522 Happy Subscibers!");
});

test("Screenshot", async ({ page }) => {
  const inputLocator = page.locator("#displayed-text");
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await inputLocator.screenshot({
    path: "./test-results/screenshots/eleScrsht.png",
  });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "./test-results/screenshots/scrsht.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
  // screenshot comparaison
});

test("Visual comaraison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.screenshot({ path: "./test-results/screenshots/landing.png" });
  await page.locator("#hide-textbox").click();
  expect(await page.screenshot()).toMatchSnapshot(
    "./test-results/screenshots/landing.png"
  );
});
