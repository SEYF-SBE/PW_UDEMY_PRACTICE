const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { POManager } = require("../../page-objects/POManager");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginPage = this.manager.getLoginPage();
    await loginPage.landing_loginPage();
    await loginPage.validLogin(username, password);
  }
);

When("add product {string} to Cart", async function (productName) {
  this.dashBoardPage = this.manager.getDashboardPage();
  await this.dashBoardPage.init_cart();
  await this.dashBoardPage.searchProduct(productName);
  await this.dashBoardPage.validationAddProduct();
  await this.dashBoardPage.navigateToCart();
});

Then(
  "Verify that the product {string} is displaying in the cart",
  async function (productName) {
    const cartPage = this.manager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();
  }
);

When("Enter valid details and Place the order", async function () {
  const orderReviewPage = this.manager.getOrdersReviewPage();
  await orderReviewPage.searchCountryAndSelect("fr", " France");
  this.orderId = await orderReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order in present in the OrderHistory", async function () {
  const ordersHistoryPage = this.manager.getOrdersHistoryPage();
  await this.dashBoardPage.navigateToOrders();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId())
  ).toBeTruthy();
});

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (usernameData, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const page_title = await this.page.title();
    await expect(this.page).toHaveTitle(page_title);
    const username = this.page.locator("#username");
    const pw = this.page.locator('[type="password"]');
    await username.fill(usernameData);
    // await page.locator('#password').fill('12345');
    await pw.fill(password);
    await this.page.locator("#signInBtn").click();
  }
);

Then("Verify Error message is displayed", async function () {
  // alerte d'erreur (auto-waiting)
  const alerte_message = await this.page.locator('[style*="block"]').textContent();
  console.log(alerte_message);
  await expect(this.page.locator('[style*="block"]')).toContainText(alerte_message);
});
