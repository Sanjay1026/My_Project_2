class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchProduct = page.locator("#search_product");
    this.searchButton = page.locator("[type='button']");
    this.allProductsDetails = page.locator("[class='product-image-wrapper']");
    this.verifyProductNameInProductDetailsPage = page.locator(".product-information h2");

    // left side
    this.brandHeading = page.locator(".brands_products h2");
    this.brandLink1 = page.locator('[href="/brand_products/Polo"]');
    this.brandLink2 = page.locator('[href="/brand_products/H&M"]');
    this.verifyBrandHeading = page.locator(".title.text-center");
  }

  async searchProductByName(productName) {
    await this.searchProduct.fill(productName);
    await this.searchButton.click();
  }

  async verifyProductsPageLoaded() {
    this.allProductsDetails.last().waitFor();
  }

  async addProductToCart(productName) {
    const firstProduct = this.page.locator(".product-image-wrapper", { hasText: productName }).last();
    await firstProduct.hover();
    await firstProduct.locator(".add-to-cart").first().click();
  }

  async continueshopping() {
    await this.page.locator("[class*='btn btn-success']").click();
  }

  async navigateToCart() {
    await this.page.locator('li [href="/view_cart"]').click();
  }

  //```````````````````
  async viewProduct(productId) {
    // for all product , just change id
    await this.page.locator(`[href="/product_details/${productId}"]`).click();
  }

  // left side ---------------

  async clickOnBrand1() {
    await this.brandLink1.click();
  }

  async clickOnBrand2() {
    await this.brandLink2.click();
  }
}

export default ProductPage;
