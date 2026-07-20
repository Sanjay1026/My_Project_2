class HomePage {
  constructor(page) {
    this.page = page;
    this.login = page.locator('//a[@href="/login"]');
    this.products = page.locator('[href="/products"]');
    this.cart = page.locator('[href="/view_cart"] i');
    this.testcases = page.locator('[href="/test_cases"]');
    this.contactus = page.locator('[href="/contact_us"]');
    this.homeIcon = page.locator("[class='fa fa-home']");
    this.verifyUserName = page.locator("li a b");
    this.deleteAccount = page.locator('[href="/delete_account"]');
    this.accountDeletedMessage = page.locator('[data-qa="account-deleted"] ');

    // subscription
    this.subscriptionEmail = page.locator("#susbscribe_email");
    this.subscribeButton = page.locator("#subscribe");
    this.subscriptionTitle = page.locator("[class='single-widget'] h2");
    this.subscriptionSuccessMessage = page.getByText("You have been successfully subscribed");

    // left side
    this.categoryHeading = page.locator("[class='left-sidebar']");
    this.verifyHeadingOfCategory = page.locator(".title.text-center");
    this.linkForWomen = page.locator('[href="#Women"]');
    this.subLinkForWomen1 = page.locator('[href="/category_products/1"]');
    this.linkFormen = page.locator('[href="#Men"]');
    this.subLinkForMen1 = page.locator('[href="/category_products/3"]');
    // this.linkForKids=
  }

  async navigateTosignUp() {
    await this.login.click();
  }

  async navigateTologin() {
    await this.login.click();
  }

  async navigateToProducts() {
    await this.products.click();
  }

  async navigateToContactUs() {
    await this.contactus.click();
  }

  async navigateToCart() {
    await this.cart.click();
  }

  //-----------------------------------------------------------

  async subscribe(userEmail) {
    await this.subscriptionEmail.fill(userEmail);
    await this.subscribeButton.click();
  }

  async clickOnDeleteAccount() {
    await this.deleteAccount.click();
  }

  // ------ left side category

  // Men
  async womenCategory() {
    await this.linkForWomen.click();
  }

  async subLinkOfWomen1() {
    await this.subLinkForWomen1.click();
  }
  // women
  async menCategory() {
    await this.linkFormen.click();
  }

  async subLinkOfMen1() {
    await this.subLinkForMen1.click();
  }
}

export default HomePage;
