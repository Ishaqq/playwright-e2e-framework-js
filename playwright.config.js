// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
 timeout:30000,
 retries: 1, 
 workers : 1,
 expect: {
  timeout:5000,
 },
 // reporter: 'html',
 reporter: [
  ['line'], // Console output
  ['allure-playwright'] // Allure report
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName:'chromium',
    headless : false,
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors : true,
    permissions : ['geolocation'],
  //  ...devices['iPhone 11'],
   
  },

});
module.exports=config
