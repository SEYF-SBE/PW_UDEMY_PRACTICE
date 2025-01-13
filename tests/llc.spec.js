import { test, expect } from "@playwright/test";

test("playwright loctors", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page
    .locator("form")
    .getByLabel("Check me out if you Love IceCreams!")
    .check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Male");
  await page.getByPlaceholder("Password").fill("12345");
  await page.getByRole("button", { has: 'value="Submit"' }).click();

  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card").filter({hasText:'Nokia Edge'})
    .getByRole("button", { name: "Add " })
    .click();
});
