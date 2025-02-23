const {test,expect}= require('@playwright/test');
const { promises } = require('dns');

//test('First playwright test',async function(){
test('First playwright test',async ({browser})=>{
//chrome - plugins / cookies
const context=await browser.newContext();
const page= await context.newPage();
await page.goto('https://www.google.com/');
console.log(await page.title());
 await expect(page).toHaveTitle('Google');

});

test('First page test',async ({page})=>{
    //chrome - plugins / cookies
    const url='https://rahulshettyacademy.com/loginpagePractise/';
    const userNameLoc=page.locator('//label[text()="Username:"]/following-sibling::input');
    const passwordLoc= page.getByLabel('password');
    const submitButtonLoc=page.locator('#signInBtn');
    const alertTextEle=page.locator('.alert[style*="block"]');
    const cardTitleLoc=page.locator(".card-title a");

    await page.goto(url);
    console.log(await page.title());
     await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
await userNameLoc.fill('myUsername');
await passwordLoc.fill("test");
//await page.getByRole('button', { name: 'signin' }).click();
await submitButtonLoc.click();
const alert=await alertTextEle.textContent();
console.log(alert);
await expect(alert).toBe('Incorrect username/password.');
await expect(alertTextEle).toContainText('Incorrect username/password.');
     

await userNameLoc.fill('');
await passwordLoc.fill("");
await userNameLoc.fill('rahulshettyacademy');
await passwordLoc.fill("learning");
//await page.getByRole('button', { name: 'signin' }).click();
await submitButtonLoc.click();

// const firstElement=await cardTitleLoc.first().textContent();
// const countEle=await cardTitleLoc.count();
// console.log(firstElement);
await page.waitForLoadState('networkidle');
const allContents=await cardTitleLoc.allTextContents();
console.log(allContents);
//console.log(countEle);

await page.waitForLoadState('networkidle');
await page.locator(".card-body a").first().waitFor();
const titles = await page.locator(".card-body a").allTextContents();

console.log(titles);
await page.waitForTimeout(5000); // Waits for 3 seconds

    });

    test('ui controls',async ({page})=>{
        const url='https://rahulshettyacademy.com/loginpagePractise/';
    const userNameLoc=page.locator('//label[text()="Username:"]/following-sibling::input');
    const passwordLoc= page.getByLabel('password');
    const submitButtonLoc=page.locator('#signInBtn');
    const dropDownLoc=page.locator('select.form-control');
    const radioButtonLoc=page.locator('.radiotextsty');
    const radioButtonLoc2=page.getByRole('radio', { value: 'user' });
        page.goto(url);
    await userNameLoc.fill('rahulshettyacademy');
    await passwordLoc.fill("learning");
    await dropDownLoc.selectOption('Teacher');
 //   radioButtonLoc.last().click();
    await page.getByText(' User',{ exact: true }).click();
    await page.locator('#okayBtn').click();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(page.locator('[href*="documents-request"]')).toHaveAttribute("class", "blinkingText");
    await page.waitForTimeout(5000);
  //  await page.pause();
    });

    test('Test new window tab',async ({browser})=>{
        const context =await browser.newContext();
        const page =await context.newPage();
        const url='https://rahulshettyacademy.com/loginpagePractise/';
        await page.goto(url);
        const userNameLoc=page.locator('//label[text()="Username:"]/following-sibling::input');
        const [newTab]=await Promise.all([
            context.waitForEvent('page'),
            page.locator('[href*="documents-request"]').click()
        ])
        await newTab.waitForLoadState();
        const textNew=await newTab.locator('.red').textContent();
        console.log(textNew);
        const arrayText=textNew.split('@');
        const domain=arrayText[1].split(" ")[0];
        console.log(domain);
        await page.bringToFront();
        await userNameLoc.fill(domain);
        await newTab.waitForTimeout(5000);


    });