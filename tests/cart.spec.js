import { test, expect } from "@playwright/test";
import HomePage from "../Pages/HomePage";
import CartPage from "../Pages/CartPage";

test("TC11 - Verify Subscription in Cart page", async ({ page }) => {
  const homepage = new HomePage(page);
  const cartpage = new CartPage(page);
  const userEmail = "test22323@gmail.com";

  await page.goto("https://automationexercise.com/");
  // verify homepage
  await expect(homepage.homeIcon).toBeVisible();

  await homepage.navigateToCart();
  // verify title of subscription
  await expect(cartpage.subscriptionTitle).toBeVisible();
  await cartpage.subscribThroughCart(userEmail);
  // verify subscrib message
  await expect(cartpage.subscriptionSuccessMessage).toBeVisible();
});

test("TC17 - Remove Products From Cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const productName = "Blue Top";
  await page.goto("/");
  await expect(homePage.homeIcon).toBeVisible();
  await homePage.navigateToProducts();
  await productPage.addProductToCart(productName);
  await productPage.navigateToCart();
  await expect(page).toHaveURL("view_cart");
  await cartPage.removeProduct(productName);
});

test.only("TC18 - View Category Products", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("/");
  await expect(homePage.categoryHeading).toBeVisible();
  // women
  await homePage.womenCategory();
  // dress
  await homePage.subLinkOfWomen1();
  await expect(homePage.verifyHeadingOfCategory).toContainText("Women -  Dress Products");
  await homePage.menCategory();
  await homePage.subLinkOfMen1();
  await expect(homePage.verifyHeadingOfCategory).toContainText(" Men -  Tshirts Products");
});
