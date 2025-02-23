const {expect, test} = require("@playwright/test");
const {LoginPage}=require("../pageObjects/LoginPage");
const {DashboardPage} = require ("../pageObjects/DashboardPage");

test("Login with valid username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);  // Declare inside the test
    await loginPage.goToLoginLink();
    await page.waitForLoadState('networkidle'); // Ensure page loads completely
    await loginPage.login('ishaq8283@gmail.com','Test@123');
});

test("Add products to cart", async ({ page }) => {
    const productToSelect = ['ZARA COAT 3', 'ADIDAS ORIGINAL']; 
    const loginPage = new LoginPage(page);  // Declare inside the test
    await loginPage.goToLoginLink();
    await page.waitForLoadState('networkidle'); // Ensure page loads completely
    await loginPage.login('ishaq8283@gmail.com','Test@123');
    const dashboardPage=new DashboardPage(page);
    await dashboardPage.selectProduct(productToSelect);
  //  await page.pause();
});