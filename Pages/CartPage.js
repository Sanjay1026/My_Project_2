import { text } from "node:stream/consumers";

class CartPage {
  constructor(page) {
    this.page = page;
    this.subscriptionTitle = page.locator("[class=single-widget] h2");
    this.subscriptionEmail = page.locator("#susbscribe_email");
    this.subscriptionButton = page.locator("#subscribe");
    this.subscriptionSuccessMessage = page.getByText("You have been successfully subscribed!");
    this.verifyProductnameInCart = page.locator(".cart_description h4 a");
    this.checkOutButton = page.locator("[class*='check_out']");
    this.registerButton = page.locator('p [href="/login"]');
    this.veirifyAddressTitle = page.getByRole("heading", { name: "Address Details" });
    this.verifyAddress = page.locator("[id=address_delivery]");
    this.discriptionArea = page.locator(".form-control");
    this.placeOrderButton = page.locator('[href="/payment"]');
    this.table = page.locator("tbody");
  }

  async subscribThroughCart(userEmail) {
    await this.subscriptionEmail.fill(userEmail);
    await this.subscriptionButton.click();
  }

  async navigateToCheckOut() {
    await this.checkOutButton.click();
  }

  async clickOnregister() {
    await this.registerButton.click();
  }

  async enterDescription() {
    await this.discriptionArea.fill("Please deliver as soon as possible");
  }

  async clickOnPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async removeProduct(productName) {
    const row = this.page.locator("tbody tr").filter({ has: this.page.locator("h4 a", { hasText: productName }) });

    await row.locator(".cart_quantity_delete").click();
  }

  // async verifyProductName(productName) {
  //   this.page.locator("tbody tr").filter({ has: this.page.locator("h4 a", { hasText: productName }) });
  // }
}

export default CartPage;

// [class='cart_description'] h4
