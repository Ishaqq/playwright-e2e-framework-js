const {expect, test} = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager"); 
//Json -> String -> Js
const dataSet=JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

test("Login with valid username and password", async ({ page }) => {
  //  const productToSelect = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
  const productToSelect = dataSet.products.map(product => product.name);
  console.log(productToSelect);
    const poManager = new POManager(page); 
     const loginPage=poManager.getLoginPage();
    await loginPage.goToLoginLink();
    await page.waitForLoadState('networkidle'); // Ensure page loads completely
    await loginPage.login(dataSet.username,dataSet.password);
    const dashboardPage=poManager.getDashBoardPage();
    await dashboardPage.selectProduct(productToSelect);
   // await page.pause();
});

