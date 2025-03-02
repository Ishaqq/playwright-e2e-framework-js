const {setDefaultTimeout, When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");
const playwright = require("@playwright/test");
const { TIMEOUT } = require("dns");
//All steps is a simple world we can use the variable used in another block by this keyword, then access everywhere through world constructor
//10 second
setDefaultTimeout(50000);
Given('I am on the home page of Ecommerce', async function () {

    this.loginPage = this.poManager.getLoginPage(); // Use the stored POManager
    await this.loginPage.goToLoginLink();
    await this.page.waitForLoadState('networkidle'); // Use this.page
  });

  When('I login to the given Ecommerce application with {string} and {string}', async function (email, password) {
    await this.loginPage.login(email, password);
    this.dashboardPage = this.poManager.getDashBoardPage();
    this.email = email;
    console.log(email);
    console.log(password);
});


Then('I got an error', function () {
    // Write code here that turns the phrase above into concrete actions
  //  throw new Error("This step is intentionally failed!");
  throw new Error("This step is intentionally failed!");
    console.log("test");
  });
