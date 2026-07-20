import { test, expect } from "@playwright/test";
import path from "path";
import Homepage from "../Pages/HomePage";

test("Login with userName and Password @Smoke", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('//a[@href="/login"]').click();
  await expect(page.locator("[class='login-form'] h2")).toHaveText("Login to your account");

  // login
  await page.locator("[data-qa='login-email']").fill("test227654@gmail.com");
  await page.locator("[data-qa='login-password']").fill("test123");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify username
  await expect(page.locator("li a b")).toHaveText("Test");
  console.log("--------------- Verified --------------------------");

  // delete account
  // await page.locator('[href="/delete_account"]').click();
  // //   verify account deleted
  // await expect(page.locator('[class="title text-center"]')).toHaveText("Account Deleted!");
});

test("Login with incorrect usetName and password", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // verify Homepage
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('//a[@href="/login"]').click();
  // Veify login page
  await expect(page.locator("[class='login-form'] h2")).toHaveText("Login to your account");

  // login
  await page.locator("[data-qa='login-email']").fill("tes23@gmail.com");
  await page.locator("[data-qa='login-password']").fill("test");
  await page.getByRole("button", { name: "Login" }).click();
  //! Verify error message
  await expect(page.locator("p", { hasText: "Your email or password is incorrect!" })).toBeVisible();
  //? or
  //   await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
});

test("logout User @regression", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // verify Homepage
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('//a[@href="/login"]').click();
  // Veify login page
  await expect(page.locator("[class='login-form'] h2")).toHaveText("Login to your account");

  // login
  await page.locator("[data-qa='login-email']").fill("test22323@gmail.com");
  await page.locator("[data-qa='login-password']").fill("test123");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify username
  await expect(page.locator("li a b")).toHaveText("Test");

  //logout
  await page.locator('[href="/logout"]').click();
  // Verify user is navigated to login page after logout
  await expect(page.locator("[class='login-form'] h2")).toHaveText("Login to your account");
});
