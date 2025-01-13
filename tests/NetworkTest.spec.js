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
const fakePayloadOrders = { data: [], message: "No Orders" };

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

  //mocking
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const responseA = await page.request.fetch(route.request()); // fetch response - real response (API response)
      let body = JSON.stringify(fakePayloadOrders);
      route.fulfill({
        responseA,
        body,
      }); // il renvoie la réponse au navigateur (fake response => browser )
      //intercepting response - API response => fake response (mocking) => browser => render data on front
    }
  );

  await page.getByRole("button", { name: " ORDERS" }).click();
  await page.pause();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4").textContent());
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
