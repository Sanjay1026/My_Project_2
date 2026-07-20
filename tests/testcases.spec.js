import { test } from "@playwright/test";

test("Verify Test Cases Page", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // verify Homepage
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  await page.locator('[href="/test_cases"]').nth(0).click();
  await expect(page.locator("[class='title text-center'] b")).toHaveText("Test Cases");
});
