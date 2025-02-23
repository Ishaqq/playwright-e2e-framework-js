const {expect, test} = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager"); 
//Json -> String -> Js
const dataSet=JSON.parse(JSON.stringify(require('../utils/placeOrderTestDataMultiple.json')));

//for(const data of dataSet){
dataSet.forEach(data => {
test(`Client App login for ${data.user}`, async ({ page }) => {
  //  const productToSelect = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
  const productToSelect = data.products.map(product => product.name);
  console.log(productToSelect);
  console.log("Test data multiple time");
    const poManager = new POManager(page); 
     const loginPage=poManager.getLoginPage();
    await loginPage.goToLoginLink();
    await page.waitForLoadState('networkidle'); // Ensure page loads completely
    await loginPage.login(data.username,data.password);
    const dashboardPage=poManager.getDashBoardPage();
    await dashboardPage.selectProduct(productToSelect);
   // await page.pause();
});
});