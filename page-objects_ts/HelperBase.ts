import { expect, Page, Locator } from "@playwright/test";

export class HelperBase {
  readonly page: Page;

  //constructor(page: Page){
  constructor(page: Page) {
    this.page = page;
  }

  //async waitForNumberOfSections(timeInSeconds: number) {
  async waitForNumberOfSections(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}

// module.exports = { HelperBase };
