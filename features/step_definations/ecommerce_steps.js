const {setDefaultTimeout, When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");
const playwright = require("@playwright/test");
const { TIMEOUT } = require("dns");
//All steps is a simple world we can use the variable used in another block by this keyword, then access everywhere through world constructor
//10 second
setDefaultTimeout(50000);
Given('I login to Ecommerce application with {string} and {string}',{timeout: 10*1000}, async function (email, password) {
    // const browser = await playwright.chromium.launch({ headless: false });
    // const context =await browser.newContext();
    // const page =await context.newPage();
    // Write code here that turns the phrase above into concrete actions
    // this.poManager = new POManager(page);

    const loginPage = this.poManager.getLoginPage(); // Use the stored POManager
    await loginPage.goToLoginLink();
    await this.page.waitForLoadState('networkidle'); // Use this.page
    await loginPage.login(email, password);
    this.dashboardPage = this.poManager.getDashBoardPage();
    this.email = email;
    console.log(email);
    console.log(password);
    
    // this.email=email;
    //  console.log(email);
  });

  When('Add the following products to Cart', async function (dataTable) {
    let productToSelect = dataTable.raw().flat(); // Extracts values from table
    console.log("Products to Add:", productToSelect); 
//    const dashboardPage=this.poManager.getDashBoardPage();
 //   await dashboardPage.selectProduct(productToSelect); //send an array
    for (let product of productToSelect) {
        console.log(`Selecting product: ${product}`);
        await this.dashboardPage.selectProduct(product);
    }
});


  Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
  //  throw new Error("This step is intentionally failed!");
    console.log(productName);
  });

  When('Enter valid details and place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("test");
  });

  Then('Verify order in present OrderHistory', function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("test");
  });