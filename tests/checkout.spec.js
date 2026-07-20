import { test, expect } from "@playwright/test";
import testdata from "../testdata/register.json";
import paymentData from "../testdata/payment.json";
import logindata from "../testdata/logindata.json";
import { generateEmail } from "../utils/generateEmail";

import HomePage from "../Pages/HomePage";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Loginpage from "../Pages/LoginPage";
import Registrationpage from "../Pages/RegistrationPage";
import Paymentpage from "../Pages/PaymentPage";
import AccountCreatedPage from "../Pages/AccountCreatedPage ";
import { checkPrime } from "node:crypto";

test("TC14- Place Order: Register while Checkout", async ({ page }) => {
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const loginpage = new Loginpage(page);
  const registerpage = new Registrationpage(page);
  const paymentpage = new Paymentpage(page);
  const accountCreated = new AccountCreatedPage(page);

  let productName = "Blue Top";
  await page.goto("/");
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateToProducts();
  await productpage.verifyProductsPageLoaded();
  await productpage.addProductToCart(productName);
  await productpage.viewCart();
  await expect(cartpage.checkOutButton).toBeVisible();
  await cartpage.navigateToCheckOut();
  await cartpage.clickOnregister();

  // signup
  const data = testdata[0];
  data.email = generateEmail(); // random email

  await loginpage.enterSignupDetails(data.name, data.email);
  await registerpage.fillRegisterpage(data);

  // verify account created
  await expect(accountCreated.accountCreatedText).toHaveText("Account Created!");
  await accountCreated.clickContinue();

  // verify userName
  await expect(homepage.verifyUserName).toHaveText(data.name);

  // go to cart
  await homepage.navigateToCart();
  await cartpage.navigateToCheckOut();
  // verify address title
  await expect(cartpage.veirifyAddressTitle).toHaveText("Address Details");
  // verify address
  await expect(cartpage.verifyAddress).toContainText(data.address2);
  // verify product name
  await expect(cartpage.verifyProductnameInCart).toHaveText(productName);
  // discription
  await cartpage.enterDescription();
  // place order
  await cartpage.clickOnPlaceOrderButton();
  // place order
  await expect(page).toHaveURL(/payment/);
  // fill card details
  await paymentpage.fillCardDetails(
    paymentData.cardname,
    paymentData.cardnumber,
    paymentData.cvv,
    paymentData.month,
    paymentData.year,
  );

  // verify success message
  await expect(page).toHaveURL(/payment_done/);

  // click on delete account
  await homepage.clickOnDeleteAccount();

  await expect(homepage.accountDeletedMessage).toHaveText("Account Deleted!");
});

test("TC15 - Place Order: Register before Checkout", async ({ page }) => {
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const loginpage = new Loginpage(page);
  const paymentpage = new Paymentpage(page);

  const productName = "Blue Top";

  await page.goto("/");
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateTosignUp();
  const data = testdata[0];
  data.email = generateEmail();

  await loginpage.enterSignupDetails(data.name, data.email);
  await registerpage.fillRegisterpage(data);
  await expect(accountCreated.accountCreatedText).toHaveText("Account Created!");
  await accountCreated.clickContinue();
  await expect(homepage.verifyUserName).toBeVisible();

  await homepage.navigateToProducts();
  await productpage.addProductToCart(productName);
  await productpage.viewCart();
  await expect(page).toHaveURL(/view_cart/);
  await cartpage.navigateToCheckOut();
  await expect(page).toHaveURL(/checkout/);
  // verify address title
  await expect(cartpage.veirifyAddressTitle).toHaveText("Address Details");
  await expect(cartpage.verifyProductnameInCart).toHaveText(productName);
  await cartpage.enterDescription();
  await cartpage.clickOnPlaceOrderButton();
  await paymentpage.fillCardDetails(
    paymentData.cardname,
    paymentData.cardnumber,
    paymentData.cvv,
    paymentData.month,
    paymentData.year,
  );
  await expect(paymentpage.paymentSuccessMessage).toHaveText("Your order has been placed successfully!");
  await expect(page).toHaveURL(/payment_done/);
  await homepage.clickOnDeleteAccount();
  await expect(homepage.accountDeletedMessage).toHaveText("Account Deleted!");
});

test("TC 16 - Place Order: Login before Checkout", async ({ page }) => {
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const loginpage = new Loginpage(page);
  const registerpage = new Registrationpage(page);
  const paymentpage = new Paymentpage(page);
  const accountCreated = new AccountCreatedPage(page);

  const productName = "Blue Top";

  await page.goto("/");
  await expect(homepage.homeIcon).toBeVisible();
  await homepage.navigateTologin();
  await loginpage.enterLoginDetails(logindata.email, logindata.password);
  await expect(homepage.verifyUserName).toBeVisible();
  await homepage.navigateToProducts();
  await productpage.addProductToCart(productName);
  await productpage.navigateToCart();
  await expect(page).toHaveURL(/view_cart/);
  await cartpage.navigateToCheckOut();
  await expect(cartpage.veirifyAddressTitle).toHaveText("Address Details");
  await expect(cartpage.verifyProductnameInCart).toHaveText(productName);
  await cartpage.enterDescription();
  await cartpage.clickOnPlaceOrderButton();

  // payment details
  await paymentpage.fillCardDetails(
    paymentData.cardname,
    paymentData.cardnumber,
    paymentData.cvv,
    paymentData.month,
    paymentData.year,
  );
  await expect(page).toHaveURL(/payment_done/);
  await homepage.clickOnDeleteAccount();
  await expect(homepage.accountDeletedMessage).toHaveText("Account Deleted!"); //! deleted
});


 
