import { expect, Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartProducts: Locator;
  readonly productsText: Locator;
  readonly cart: Locator;
  readonly orders: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = this.page.locator("div li").first();
    this.productsText = this.page.locator(".card-body b");
    this.cart = this.page.locator("[routerlink*='cart']");
    this.orders = this.page.getByRole("button", { name: " ORDERS" });
    this.checkoutBtn = this.page.getByRole("button", { name: "Checkout" });
  }

  async verifyProductIsDisplayed(productName: string) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }

  getProductLocator(productName: string) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}
// module.exports = { CartPage };
