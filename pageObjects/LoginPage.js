class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");  // Store only locator
        this.submit = page.locator("[value='Login']");  // Store only locator
    }

    async goToLoginLink() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(email, password) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.submit.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };
