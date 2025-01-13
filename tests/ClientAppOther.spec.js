const { test, expect } = require("@playwright/test");

test("connection test", async ({ page }) => {
  let quantity_product_cart_first;
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(page).toHaveTitle("Let's Shop");

  await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole("button", { name: "Login" }).click();
  //await page.waitForLoadState('networkidle'); // pour attendre et assurer la charge de tous les élements de la page
  await page.locator(".card-body").last().waitFor(); // to make the next step wait - not autowaiting
  let quantity_product_cart = await page
    .locator('[routerlink="/dashboard/cart"]')
    .locator("label")
    .textContent();
  if (isNaN(parseInt(quantity_product_cart))) {
    quantity_product_cart_first = 0;
  }
  console.log("First = " + quantity_product_cart_first);
  const titles_cards = await page.locator(".card-body b").allTextContents();

  await page
    .locator(".card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  // const count = await products.count();
  // for (let i = 0; i < count; i++) {
  //   if (
  //     (await products.nth(i).locator("b").textContent()) === "ADIDAS ORIGINAL"
  //   ) {
  //     //add product to cart list
  //     await products
  //       .nth(i)
  //       .getByRole("button", { name: "Add To Cart" })
  //       .click();
  //     break;
  //   }
  // }
  await expect(page.getByRole("alert")).toContainText("Product Added To Cart");
  console.log(quantity_product_cart_first);
  const second_quantity = parseInt(
    await page
      .locator('[routerlink="/dashboard/cart"]')
      .locator("label")
      .textContent()
  );
  console.log(second_quantity);
  expect(second_quantity).toBeGreaterThan(quantity_product_cart_first);
  if (second_quantity === quantity_product_cart_first + 1) {
    console.log("addition to the cart has correctely affectued");
  }

  // await page.locator('[routerlink="/dashboard/cart"]').click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/dashboard/cart"
  );

  // check if product is in the cart
  const title_products_in_cart = await page
    .locator(".cart li h3")
    .textContent();
  console.log(title_products_in_cart);
  // wait to items are visible on the page
  await page.locator("div li").last().waitFor();
  const bool = await page.getByText("ADIDAS ORIGINAL").isVisible();
  expect(bool).toBeTruthy();

  await page.getByRole("button", { name: "Checkout" }).click();
  // await page.evaluate(() => {
  //   document.body.style.transform = "scale(0.6)";
  // });

  await page.getByPlaceholder("Select Country").pressSequentially("fr");
  await page.getByRole("button", { name: " France" }).nth(1).click();
  // const dropdown = page.locator(".ta-results");
  // await dropdown.waitFor();
  // const optionsCount = dropdown.locator("button").count();
  // for (let i = 0; i < optionsCount; i++) {
  //   const text = await dropdown.locator("button").nth(i).textContent();
  //   if (text === " France") {
  //     await dropdown.locator(".ta-item").nth(2).click();
  //     break;
  //   }
  // }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    "anshika@gmail.com"
  );
  //await page.getByLabel("Name on Card ").fill("xxxx");
  //await page.locator(".action__submit").click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  const id_order = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  const id_splited = id_order.split("|");
  const orderID = id_splited[1].trim();
  console.log(orderID);

  // check the order list
  await page.getByRole("button", { name: " ORDERS" }).click();
  await page.locator("tbody tr").last().waitFor();
  const total_count_rows = await page.locator("tbody tr").count();
  console.log(total_count_rows);
  for (let i = 0; i < total_count_rows; i++) {
    const rowId = await page
      .locator("tbody tr")
      .nth(i)
      .locator("th")
      .textContent();
    if (rowId === orderID) {
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
    orderID
  );
});
