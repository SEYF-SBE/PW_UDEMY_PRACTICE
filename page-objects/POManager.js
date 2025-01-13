const { LoginPage } = require("./LoginPage");
const { DashBoardPage } = require("./DashBoardPage");
const { CartPage } = require("./CartPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");
const { NavigationPage } = require("./NavigationPage");

class POManager {
  constructor(page) {
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

  navigateTo() {
    return this.navigationPage;
  }
}

module.exports = { POManager };
