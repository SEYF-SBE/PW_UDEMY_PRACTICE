import {test as base} from "@playwright/test";

interface TestDataForOrder {
  username: string,
  password: string,
  productName: string,
};

export const customtest = base.extend<{testDataForOrder:TestDataForOrder}>({
  // here we défine our costum fixture
  testDataForOrder: {
    username: "adilooq1@hotmail.fr",
    password: "A123456789*a",
    productName: "ADIDAS ORIGINAL",
  },
});
