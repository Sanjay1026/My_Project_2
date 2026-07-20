class Loginpage {
  constructor(page) {
    this.page = page;
    // signup
    this.username = page.getByPlaceholder("Name");
    this.signUpEmail = page.locator("//input [@data-qa='signup-email']");
    this.signUpButton = page.locator("//button[@data-qa='signup-button']");
    // Login
    this.userEmail = page.locator("[data-qa='login-email']");
    this.password = page.locator("[data-qa='login-password']");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async enterSignupDetails(userName, userEmail) {
    await this.username.fill(userName);
    await this.signUpEmail.fill(userEmail);
    await this.signUpButton.click();
  }

  async enterLoginDetails(userEmail, password) {
    await this.userEmail.fill(userEmail);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

export default Loginpage;
