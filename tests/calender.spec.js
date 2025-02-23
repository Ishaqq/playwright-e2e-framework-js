const {test, expect}= require("@playwright/test");

test("Validation of Calender",async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2010";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const datePicker = page.locator('.react-date-picker__wrapper');
    await datePicker.click();

    const yearsLabel = page.locator(".react-calendar__navigation .react-calendar__navigation__label");
    await yearsLabel.click(); // Open year selection
    await yearsLabel.click(); // Go to decade view

    const prevButton = page.locator(".react-calendar__navigation__prev-button");
    const nextButton = page.locator(".react-calendar__navigation__next-button");

    let yearFound = false;

    while (!yearFound) {
        const yearLocator = page.locator('.react-calendar__decade-view__years > button');
        const yearsCount = await yearLocator.count();

        let firstYear = await yearLocator.first().textContent();
        let lastYear = await yearLocator.nth(yearsCount - 1).textContent();

        firstYear = parseInt(firstYear.trim(), 10);
        lastYear = parseInt(lastYear.trim(), 10);

        // ✅ Check if the target year is visible
        for (let i = 0; i < yearsCount; ++i) {
            const yearText = await yearLocator.nth(i).textContent();
            const yearValue = parseInt(yearText.trim(), 10);

            if (yearValue === parseInt(year)) {
                await yearLocator.nth(i).click(); // Select year
                yearFound = true;
                break;
            }
        }

        // ✅ If target year is greater, navigate forward
        if (!yearFound && year > lastYear) {
            await nextButton.click();
            await page.waitForTimeout(500); // Small delay for UI update
        }

        // ✅ If target year is smaller, navigate backward
        else if (!yearFound && year < firstYear) {
            await prevButton.click();
            await page.waitForTimeout(500);
        }
    }

    // ✅ Select the month
    await page.locator(`.react-calendar__year-view__months button:nth-child(${monthNumber})`).click();

    // ✅ Select the date
    await page.locator(`.react-calendar__month-view__days button:has-text("${date}")`).click();

    
    const inputs = await page.locator(".react-date-picker__inputGroup input:visible");
   console.log(await inputs.count());
    for (let index = 0; index <inputs.count(); index++)
    {
        console.log(index);
        console.log("DFSAFDASDF");
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

  //  await page.pause();
});