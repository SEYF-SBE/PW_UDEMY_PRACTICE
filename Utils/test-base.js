const base = require("@playwright/test");

exports.customtest = base.test.extend({
  // here we défine our costum fixture
  testDataForOrder: {
    username: "adilooq1@hotmail.fr",
    password: "A123456789*a",
    productName: "ADIDAS ORIGINAL",
  },
});
