const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataOrder: {
        // Use a function to return the test data
            username: "ishaq8283@gmail.com",
            password: "Test@123",
            productName: "ZARA COAT 3"
        
        // Optional: you can define a method that executes before each test to set up any necessary conditions
        // You can also add a teardown method if needed
    }
});