const {expect, test} = require("@playwright/test");

test("Dialogue Frames and Event Listen", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#alertbtn").click();
     page.on("dialog", dialog=>dialog.dismiss());

    await page.locator("#mousehover").hover();
//    await page.getByRole("link", {hastext : 'Top'}).click();
    
await page.locator('//a[text()="Top"]').click(); // Using XPath
const framePage =  page.frameLocator("#courses-iframe");
const textCheck= await framePage.locator("h2 span strong").textContent();
console.log(textCheck);
//await page.pause();
});

test("Screenshot and visual Testing", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialscreenshot.png' });
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: 'screenshot.png'});
    //comparing screenshot
    expect(await page.screenshot({path: 'screenshot.png'})).toMatchSnapshot("partialscreenshot.png");

})