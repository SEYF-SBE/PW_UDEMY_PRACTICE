import { LoginPage } from "./LoginPage";
import { DashBoardPage } from "./DashBoardPage";
import { CartPage } from "./CartPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { Page } from "@playwright/test";
//import { NavigationPage } from "./NavigationPage";

export class POManager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly dashBoardPage: DashBoardPage;
  readonly cartPage: CartPage;
  readonly ordersHistoryPage: OrdersHistoryPage;
  readonly ordersReviewPage: OrdersReviewPage;
  // readonly navigationPage: NavigationPage;

  constructor(page: Page) {
    this.page = page;
    //this.navigationPage = new NavigationPage(page);FIXME
    this.loginPage = new LoginPage(this.page);
    this.dashBoardPage = new DashBoardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashBoardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }

  // navigateTo() {
  //   return this.navigationPage;
  // }
}

module.exports = { POManager };
