import { test, expect } from "@playwright/test";
import { customtest } from "../Utils_ts/test-base";
import { POManager } from "../page-objects_ts/POManager";
//conveting json => string => js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/dataTest.json")));

import { faker } from "@faker-js/faker/locale/fr";

test("connection test", async ({ page }) => {
  // console.log(faker.person.firstName());
  const manager = new POManager(page);
  const loginPage = manager.getLoginPage();
  const dashBoardPage = manager.getDashboardPage();
  const cartPage = manager.getCartPage();
  const orderReviewPage = manager.getOrdersReviewPage();
  const ordersHistoryPage = manager.getOrdersHistoryPage();

  await loginPage.landing_loginPage();
  await loginPage.validLogin(
    dataSet.dashboard.username,
    dataSet.dashboard.password
  );

  await dashBoardPage.init_cart();
  await dashBoardPage.searchProduct(dataSet.dashboard.productName);
  await dashBoardPage.validationAddProduct();
  await dashBoardPage.navigateToCart();

  await cartPage.verifyProductIsDisplayed(dataSet.dashboard.productName);
  await cartPage.checkout();

  await orderReviewPage.searchCountryAndSelect("fr", " France");
  let orderId: any = await orderReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashBoardPage.navigateToOrders();

  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

for (const data of dataSet.BDD_Data) {
  test(`@Web connection test for product : ${data.productName}`, async ({
    page,
  }) => {
    const manager = new POManager(page);
    const loginPage = manager.getLoginPage();
    const dashBoardPage = manager.getDashboardPage();
    const cartPage = manager.getCartPage();
    const orderReviewPage = manager.getOrdersReviewPage();
    const ordersHistoryPage = manager.getOrdersHistoryPage();

    await loginPage.landing_loginPage();
    await loginPage.validLogin(data.username, data.password);

    await dashBoardPage.init_cart();
    await dashBoardPage.searchProduct(data.productName);
    await dashBoardPage.validationAddProduct();
    await dashBoardPage.navigateToCart();

    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkout();

    await orderReviewPage.searchCountryAndSelect("fr", " France");

    let orderId: any = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrders();

    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

customtest(
  "@Web test with costum fixture - test-base.js",
  async ({ page, testDataForOrder }) => {
    const manager = new POManager(page);
    const loginPage = manager.getLoginPage();
    const dashBoardPage = manager.getDashboardPage();
    const cartPage = manager.getCartPage();
    const orderReviewPage = manager.getOrdersReviewPage();
    const ordersHistoryPage = manager.getOrdersHistoryPage();

    await loginPage.landing_loginPage();
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password
    );

    await dashBoardPage.init_cart();
    await dashBoardPage.searchProduct(testDataForOrder.productName);
    await dashBoardPage.validationAddProduct();
    await dashBoardPage.navigateToCart();

    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkout();

    await orderReviewPage.searchCountryAndSelect("fr", " France");
    let orderId: any = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrders();

    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  }
);
