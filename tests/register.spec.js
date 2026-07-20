import { test, expect } from "@playwright/test";

test("Register User", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('//a[@href="/login"]').click();
  await expect(page.locator("[class='signup-form'] h2")).toHaveText("New User Signup!");

  //signup
  await page.getByPlaceholder("Name").fill("Test");
  await page.locator("//input [@data-qa='signup-email']").fill("test227654@gmail.com");
  await page.locator("//button[@data-qa='signup-button']").click();
  await expect(page.locator("[class='login-form'] h2").nth(0)).toHaveText("Enter Account Information");
  await page.locator("#id_gender1").click();
  await page.locator("#password").fill("test123");
  await page.locator("#days").selectOption("10");
  await page.locator("#months").selectOption("May");
  await page.locator("#years").selectOption("2010");
  await page.locator("#newsletter").check();
  await page.locator("[name='optin']").check();
  await page.getByLabel("First name").fill("Test");
  await page.getByLabel("Last name").fill("User");
  await page.locator("#company").fill("Test Company");
  await page.locator("#address1").fill("123 Test Street");
  await page.locator("#address2").fill("Apt 4B");
  await page.locator("#country").selectOption("Canada");
  await page.locator("#state").fill("karnataka");
  await page.locator("#city").fill("bangalore");
  await page.locator("#zipcode").fill("560001");
  await page.locator("#mobile_number").fill("1234567891");
  await page.locator("//button[@data-qa='create-account']").click();
  // verify account created
  await expect(page.locator("[class='title text-center']")).toHaveText("Account Created!");
  await page.locator("[class='btn btn-primary']").click();
  await expect(page.locator("li a b")).toHaveText("Test");

  // delete account;
  await page.locator('[href="/delete_account"]').click();
  //   verify account deleted
  await expect(page.locator('[class="title text-center"]')).toHaveText("Account Deleted!");
  await page.getByRole("link", { name: "Continue" });
});

test("Register user with existing email", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // verify Homepage
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('//a[@href="/login"]').click();
  // Veify login page
  await expect(page.locator("[class='signup-form'] h2")).toHaveText("New User Signup!");

  await page.getByPlaceholder("Name").fill("Chuki");
  await page.locator("//input [@data-qa='signup-email']").fill("test22323@gmail.com");
  await page.locator("//button[@data-qa='signup-button']").click();
  await expect(page.getByText("Email Address already exist!")).toBeVisible();
});
