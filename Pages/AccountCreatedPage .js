class AccountCreatedPage {
  constructor(page) {
    this.page = page;
    this.accountCreatedText = page.locator("[class='title text-center']");
    this.continueButton = page.locator("[class='btn btn-primary']");
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

export default AccountCreatedPage;
