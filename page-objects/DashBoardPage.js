const { expect } = require("@playwright/test");

class DashBoardPage {
  //quantity_product_cart_first;
  quantity_product_cart_first;
  constructor(page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productsText = this.page.locator(".card-body b");
    this.cart = this.page
      .getByRole("listitem")
      .getByRole("button", { name: "Cart" });
    // this.addToCartButton = getByRole("button", { name: "Add To Cart" });
    this.orders = this.page.getByRole("button", { name: " ORDERS" });
  }

  async init_cart() {
    let quantity_product_cart = await this.cart.textContent();
    if (isNaN(parseInt(quantity_product_cart))) {
      this.quantity_product_cart_first = 0;
    }
    console.log("First = " + this.quantity_product_cart_first);
  }

  async searchProduct(product) {
    // const titles_cards = await this.productsText.allTextContents();

    await this.products
      .filter({ hasText: product })
      .getByRole("button", { name: "Add To Cart" })
      .click();
  }

  async validationAddProduct() {
    await expect(this.page.getByRole("alert")).toContainText(
      "Product Added To Cart"
    );
    //console.log(this.quantity_product_cart_first);
    const second_quantity = parseInt(await this.cart.textContent());
    console.log(second_quantity);
    //expect(second_quantity).toBeGreaterThan(this.quantity_product_cart_first);
    if (second_quantity === this.quantity_product_cart_first + 1) {
      console.log("addition to the cart has correctely affectued");
    }
  }

  async navigateToCart() {
    await this.cart.click();
    await expect(this.page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/cart" //FIXME
    );
  }

  async navigateToOrders() {
    await this.orders.click();
    await this.page.locator("tbody tr").last().waitFor();
  }
}

module.exports = { DashBoardPage };
