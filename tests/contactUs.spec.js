import { test } from "@playwright/test";
import Homepage from "../Pages/HomePage";

test("Contact us Form", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // verify Homepage
  let homePage = new Homepage(page);
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
  // await page.locator('[href="/contact_us"]').click();
  await homePage.navigateToContactUs();
  await expect(page.locator("[class='title text-center']", { hasText: "Get In Touch" })).toBeVisible();
  await page.getByPlaceholder("Name").fill("Test");
  await page.locator("//input[@name='email']").fill("test@gmail.com");
  await page.getByPlaceholder("Subject").fill("Test Subject");
  await page.getByPlaceholder("Message").fill("Test Message");

  const filePath = path.join(__dirname, "testfile.txt");
  console.log("File Path:", filePath); //C:\Users\sanja\OneDrive\Desktop\Automation\tests\testfile.txt
  await page.locator("//input[@name='upload_file']").setInputFiles(filePath);

  page.once("dialog", (dialog) => {
    dialog.accept();
  });
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("[class='status alert alert-success']")).toHaveText(
    "Success! Your details have been submitted successfully.",
  );
  await page.locator("[class='btn btn-success']").click();
  //verify home page
  await expect(page.locator("[class='fa fa-home']")).toBeVisible();
});
