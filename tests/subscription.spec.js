import { test, expect } from "@playwright/test";
import HomePage from "../Pages/HomePage";

test("Verify Subscription in home page", async ({ page }) => {
  let homepage = new HomePage(page);
  const userEmail = "test22323@gmail.com";

  await page.goto("https://automationexercise.com/");
  // verify Homepage
  await expect(homepage.homeIcon).toBeVisible();

  await expect(homepage.subscriptionTitle).toBeVisible();
  await homepage.subscribe(userEmail);
  await expect(homepage.subscriptionSuccessMessage).toBeVisible();
});
