import { expect, test } from "@playwright/test";
import HomePage from "../Pages/HomePage";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";

test("TC8 - Verify All Products and product detail page", async ({ page }) => {
  let homepage = new HomePage(page);
  let productpage = new ProductPage(page);
  await page.goto("https://automationexercise.com/");
  // verify HomePage
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  // await page.locator('[href="/products"]').click();
  await homepage.navigateToProducts();
  await // verify product page

  await page.locator("[class='product-image-wrapper']").last().waitFor();
  const productCount = await page.locator("[class='product-image-wrapper']").count();
  console.log("Products Count: " + productCount);
  // verify product page
  await expect(page).toHaveURL(/products/);
  // adding to cart
  await page.locator('[href="/product_details/1"]').click();

  // verify product in cart
  await expect(page.locator("[class='product-information'] h2")).toBeVisible();
  await expect(page.locator("[class='product-information'] p").filter({ hasText: "Category" })).toBeVisible();
  await expect(page.locator("[class='product-information'] span span")).toBeVisible();
  await expect(page.locator("[class='product-information'] p b").filter({ hasText: "Availability:" })).toBeVisible();
  await expect(page.locator("[class='product-information'] p b").filter({ hasText: "Condition:" })).toBeVisible();
  await expect(page.locator("[class='product-information'] p b").filter({ hasText: "Brand:" })).toBeVisible();
});

test("TC9 - Search products", async ({ page }) => {
  let homepage = new HomePage(page);
  let productpage = new ProductPage(page);

  const productName = "Pure Cotton V-Neck T-Shirt";

  await page.goto("https://automationexercise.com/");
  // verify Homepage
  // await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateToProducts();
  // verify product page
  await productpage.verifyProductsPageLoaded();
  await expect(page).toHaveURL(/products/);
  // search product
  await productpage.searchProductByName(productName);
  // verify
  await expect(page.locator("[class='productinfo text-center'] p")).toContainText("Pure Cotton V-Neck");
});

test("TC12 - Add products to cart", async ({ page }) => {
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);

  await page.goto("https://automationexercise.com/");
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateToProducts();
  await expect(page).toHaveURL(/products/);

  const productName1 = "Blue Top";
  const productName2 = "Men Tshirt";

  await productpage.addProductToCart(productName1);
  await productpage.continueshopping();
  await productpage.addProductToCart(productName2);
  await productpage.viewCart();

  let count = await page.locator("tbody tr").count();
  console.log(count);

  // const product1 = page.locator('[id="product-1"]');
  // const product2 = page.locator('[id="product-2"]');

  // const table = page.locator("tbody");
  // await expect(product1.locator("[class='cart_price'] p")).toContainText("500");
  // await expect(product1.locator("[class='cart_quantity'] button")).toContainText("1");
  // await expect(product1.locator("[class='cart_total'] p")).toContainText("500");
  // //
  // await expect(product2.locator("[class='cart_price'] p")).toContainText("400");
  // await expect(product2.locator("[class='cart_quantity'] button")).toContainText("1");
  // await expect(product2.locator("[class='cart_total'] p")).toContainText("400");
});

test("TC13 - Verify Product quantity in Cart", async ({ page }) => {
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const productDetails = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);

  await page.goto("https://automationexercise.com/");
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateToProducts();
  await expect(page).toHaveURL(/products/);

  // view product
  await productpage.viewProduct("1");
  await expect(productpage.verifyProductNameInProductDetailsPage).toHaveText("Blue Top");
  await productDetails.setQuantity("4");
  // add to cart
  await productDetails.addToCart();
  // view cart
  await productDetails.viewCart();
  await expect(cartPage.verifyProductnameInCart).toHaveText("Blue Top");
});

test("TC19 -  View & Cart Brand Products", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await page.goto("/");

  await homePage.navigateToProducts();
  //Verify that Brands are visible on left side bar
  await expect(productPage.brandHeading).toBeVisible();
  await productPage.clickOnBrand1();
  // Verify that user is navigated to brand page
  await expect(productPage.verifyBrandHeading).toContainText("Brand - Polo Products");
  await productPage.clickOnBrand2();
  //Verify that user is navigated to brand page
  await expect(productPage.verifyBrandHeading).toContainText("Brand - H&M Products");
});

test.only("TC20 -  Search Products and Verify Cart After Login", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  let productName = "Women";
  await page.goto("/");
  await homePage.navigateToProducts();
  await productPage.verifyProductsPageLoaded();
  //Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/products/);
  await productPage.searchProductByName(productName);
  // await productPage.addProductToCart();
  let countofproduct = await productPage.allProductsDetails.count();
  console.log(countofproduct);

  for (let i = 0; i < countofproduct; i++) {
    // const allProducts = await productPage.allProductsDetails.nth(i);
    // const namesOfProducts = await allProducts.locator("p").nth(i).textContent();
    // console.log(namesOfProducts);
    // await productPage.addProductToCart(namesOfProducts);
    // await productPage.continueshopping();
  }

  await productPage.navigateToCart();
  await page.waitForTimeout(5000);
});

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Click on 'Products' button
// 4. Verify user is navigated to ALL PRODUCTS page successfully
// 5. Enter product name in search input and click search button
// 6. Verify 'SEARCHED PRODUCTS' is visible
// 7. Verify all the products related to search are visible
// 8. Add those products to cart
// 9. Click 'Cart' button and verify that products are visible in cart
// 10. Click 'Signup / Login' button and submit login details
// 11. Again, go to Cart page
// 12. Verify that those products are visible in cart after login as well
