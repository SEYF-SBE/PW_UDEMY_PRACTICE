class APIUtils {
  constructor(request, loginPayload) {
    this.request = request;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const response = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    // expect(response.ok()).toBeTruthy();
    // expect(response.status()).toEqual(200);
    const loginResponseJSON = await response.json();
    //expect(loginResponseJSON.status()).toEqual(200);
    const accessToken = loginResponseJSON.token;
    //console.log(accessToken);
    return accessToken;
  }
  async createOrder(orderPayload) {
    let reponse = {};
    reponse.token = await this.getToken();
    //console.log(await this.getToken());
    const responseOrder = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: reponse.token,
          "Content-type": "application/json",
        },
      }
    );
    // expect(responseOrder.status()).toEqual(201);
    const orderJsonResponse = await responseOrder.json();
    const orderID = orderJsonResponse.orders[0];
    reponse.orderID = orderID;
    return reponse;
  }
}
module.exports = { APIUtils };
