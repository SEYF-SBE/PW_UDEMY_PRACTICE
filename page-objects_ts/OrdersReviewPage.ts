import { expect, Page, Locator } from "@playwright/test";

export class OrdersReviewPage {
  readonly page: Page;
  readonly country: Locator;
  readonly dropdown: Locator;
  readonly emailId: Locator;
  readonly submit: Locator;
  readonly orderConfirmationText: Locator;
  readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = this.page.getByPlaceholder("Select Country");
    this.dropdown = this.page.locator(".ta-results");
    this.emailId = this.page.locator(".user__name [type='text']").first();
    this.submit = this.page.getByText("PLACE ORDER");
    this.orderConfirmationText = this.page.locator(".hero-primary");
    this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
  }
  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.country.pressSequentially(countryCode);
    await this.dropdown.waitFor();
    await this.page.getByRole("button", { name: countryName }).nth(1).click();
    // const optionsCount = await this.dropdown.locator("button").count();
    // for (let i = 0; i < optionsCount; ++i) {
    //   const text = await this.dropdown.locator("button").nth(i).textContent();
    //   if (text.trim() === countryName) {
    //     await this.dropdown.locator("button").nth(i).click();
    //     break;
    //   }
    // }
  }

  async VerifyEmailId(username: string) {
    await expect(this.emailId).toHaveText(username);
  }

  async SubmitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. "
    );
    return await this.orderId.textContent();
  }
}
// module.exports = { OrdersReviewPage };
