const { Page } = require("@playwright/test");

class HelperBase {
  //readonly page: Page;

  //constructor(page: Page){
  constructor(page) {
    this.page = page;
  }

  //async waitForNumberOfSections(timeInSeconds: number) {
  async waitForNumberOfSections(timeInSeconds) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}

module.exports = { HelperBase };
