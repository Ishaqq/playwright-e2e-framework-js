const { expect, test } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const { customtest } = require("../utils/test-base");
const { assert } = require("console");

//test.describe.configure({mode: 'parallel'}); //serial if one test depends on another
customtest(`@smoke : Client App login for custom fixture`, async ({ page, testDataOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    
    await loginPage.goToLoginLink();
    await page.waitForLoadState('networkidle'); // Ensure page loads completely
    
    // Use the username and password from testDataOrder
    await loginPage.login(testDataOrder.username, testDataOrder.password);
    
    const dashboardPage = poManager.getDashBoardPage();
    
    // Uncomment this if you want to select products after logging in
    // const productToSelect = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
    // await dashboardPage.selectProduct(productToSelect);
    
    //await page.pause(); // Pauses the test execution for debugging
});
