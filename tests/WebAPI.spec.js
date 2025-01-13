const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../Utils/APIUtils");

let accessToken;
let orderID;
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "France", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};

let response;

test.beforeAll("login", async ({ request }) => {
  const apiUtils = new APIUtils(request, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(() => {});

test("Login API End to End Test", async ({ page }) => {
  //const orderID = await createOrder();
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value); // pour stocker les cockies dans Session localStorage
  }, response.token);
  let quantity_product_cart_first;
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByRole("button", { name: " ORDERS" }).click();
  await page.locator("tbody tr").last().waitFor();
  const total_count_rows = await page.locator("tbody tr").count();
  //console.log(total_count_rows);
  for (let i = 0; i < total_count_rows; i++) {
    const rowId = await page
      .locator("tbody tr")
      .nth(i)
      .locator("th")
      .textContent();
    if (rowId === response.orderID) {
      await page
        .locator("tbody tr")
        .nth(i)
        .locator("td")
        .getByRole("button", { name: "View" })
        .click();
      break;
    }
  }
  expect(await page.locator(".col-text").textContent()).toContain(
    response.orderID
  );
});

// verification if order created is showing in hisyory page
// Precondition : create order
test("order test", async ({ request }) => {
  const response = await request.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: {
        orders: [
          { country: "France", productOrderedId: "6581ca399fd99c85e8ee7f45" },
        ],
      },
      headers: {
        Authorization: accessToken,
        "Content-type": "application/json",
      },
    }
  );
  expect(response.status()).toEqual(201);
  const orderJsonResponse = await response.json();
  expect(orderJsonResponse.message).toContain("Order Placed Successfully");
});
