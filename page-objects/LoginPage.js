const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    //await page.waitForLoadState("networkidle"); // pour attendre et assurer la charge de tous les élements de la page
    await this.page.locator(".card-body").last().waitFor(); // to make the next step wait - not autowaiting
  }

  async landing_loginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client"); //FIXME
    await expect(this.page).toHaveTitle("Let's Shop");
  }
}

module.exports = { LoginPage };
