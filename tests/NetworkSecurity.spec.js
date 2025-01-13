const { test, expect, request } = require("@playwright/test");

// call API (to show details of an order) and try to change the id order => forbiden page

test("Security test request intercet", async ({ page }) => {
  // login
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator('[type="submit"]').click();
  await page.locator(".card-body").last().waitFor();

  // reach order page
  await page.getByRole("button", { name: " ORDERS" }).click();
  await page.locator("tbody tr").last().waitFor();

  // intercep API call when user click on view button
  //prepare playwright to intercep and change id before clicking button 'view'
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=675ea221e2b5443b1ff3e0et",
      })
  );
  await page
    .locator("tbody tr td")
    .getByRole("button", { name: "View" })
    .first()
    .click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  ); // we must have any response
});

test("Test Abort - serveur down simulation - no response", async ({
  browser,
}) => {
  // API response => bloc the response
  const context = await browser.newContext();
  const page = await context.newPage();
  //page.route("**/*.css", (route) => route.abort());
  page.route("**/*.{jpg, png, jpeg}", (route) => route.abort());
  // to get all links calling
  page.on("request", (request) => console.log(request.url()));
  // get all url and status of responses
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const page_title = await page.title();
  await expect(page).toHaveTitle(page_title);

  // blocing Images
  const username = page.locator("#username");
  const pw = page.locator('[type="password"]');
  await username.fill("rahulshettyacademy");
  await pw.fill("learning");
  await page.locator("#signInBtn").click();
});
