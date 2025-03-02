const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");
const path = require("path");
const fs = require("fs");

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page); // Store POManager in World
});

Before({tags: '@foo'}, async function () {
    console.log("it will execute before scenario tag with foo");
})
BeforeStep ( function(){
console.log("This will execute before every step")
});
AfterStep(async function ({ result, pickle }) {
    if (result.status === Status.FAILED) {
        const screenshotDir = path.resolve("reports/screenshots"); // Store screenshots inside 'reports/screenshots'
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const screenshotName = `${pickle.name.replace(/[^a-zA-Z0-9]/g, "_")}.png`; // Sanitize file name
        const screenshotPath = path.join(screenshotDir, screenshotName);

        await this.page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(`📸 Screenshot captured: ${screenshotPath}`);

        // Attach screenshot for HTML report
        this.attach(fs.readFileSync(screenshotPath), "image/png");
        // Attach the screenshot to the Cucumber report
    }
});

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});