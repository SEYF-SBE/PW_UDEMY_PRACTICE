const { expect } = require("@playwright/test");

class OrdersReviewPage {
  constructor(page) {
    this.page = page;
    this.country = this.page.getByPlaceholder("Select Country");
    this.dropdown = this.page.locator(".ta-results");
    this.emailId = this.page.locator(".user__name [type='text']").first();
    this.submit = this.page.getByText("PLACE ORDER");
    this.orderConfirmationText = this.page.locator(".hero-primary");
    this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
  }
  async searchCountryAndSelect(countryCode, countryName) {
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

  async VerifyEmailId(username) {
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
module.exports = { OrdersReviewPage };
