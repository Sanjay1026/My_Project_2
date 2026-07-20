class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.quantity = page.locator("#quantity");
    this.addingToCartButton = page.locator(".btn.btn-default.cart");
    this.viewCartLink = page.locator('p [href="/view_cart"]');
  }

  async setQuantity(quantity) {
    await this.quantity.fill(quantity);
  }

  async addToCart() {
    await this.addingToCartButton.click();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}

export default ProductDetailsPage;
