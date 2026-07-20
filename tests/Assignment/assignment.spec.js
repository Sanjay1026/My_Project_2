import { test, expect } from "@playwright/test";

test("Register user", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  //   await page.locator("//input[@id='customer.firstName']").fill("John");
  //   await page.locator("//input[@id='customer.lastName']").fill("Doe");
  //   await page.locator("//input[@id='customer.address.street']").fill("123 Main St");
  //   await page.locator("//input[@id='customer.address.city']").fill("mahadevpura");
  //   await page.locator("//input[@id='customer.address.state']").fill("Karnataka");
  //   await page.locator("//input[@id='customer.address.zipCode']").fill("560048");
  //   await page.locator("//input[@id='customer.phoneNumber']").fill("1234567890");
  //   await page.locator("//input[@id='customer.ssn']").fill("123-45-6789");
  //   await page.locator("//input[@id='customer.username']").fill("johndoe");
  //   await page.locator("//input[@id='customer.password']").fill("password123");
  //   await page.locator("//input[@id='repeatedPassword']").fill("password123");
  //   await page.getByRole("button", { name: "REGISTER" }).click();

  // login
  await page.locator("//input[@class='input' and @name='username']").fill("johndoe");
  await page.locator("//input[@class='input' and @name='password']").fill("password123");
  await page.getByRole("button", { name: "Log In" }).click();

  //?   open new account
  // await page.locator('//a[@href="openaccount.htm"]').click();
  // await page.locator("[id='type']").selectOption("SAVINGS");
  // await page.getByRole("button", { name: "Open New Account" }).click();
  // await expect(page.locator('[id="openAccountResult"] h1')).toHaveText("Account Opened!");

  //? transfer funds
  await page.locator('[href="transfer.htm"]').click();
  await page.locator("[id='amount']").fill("20");
  await page.locator("[id='fromAccountId']").selectOption("62517 ");
  await page.locator("[id='toAccountId']").selectOption("14121");
  await page.getByRole("button", { name: "Transfer" }).click();
  // validating
  await expect(page.locator("#showResult .title")).toHaveText("Transfer Complete!");

  //? pay bill
  await page.locator('//a[@href="billpay.htm"]').click();
  await page.locator("//input[@name='payee.name']").fill("John Doe");
  await page.locator("//input[@name='payee.address.street']").fill("123 Main St");
  await page.locator("//input[@name='payee.address.city']").fill("mahadevpura");
  await page.locator("//input[@name='payee.address.state']").fill("Karnataka");
  await page.locator("//input[@name='payee.address.zipCode']").fill("560048");
  await page.locator("//input[@name='payee.phoneNumber']").fill("1234567890");
  await page.locator("//input[@name='payee.accountNumber']").fill("123456789");
  await page.locator("//input[@name='verifyAccount']").fill("123456789");
  await page.locator("//input[@name='amount']").fill("40");
  await page.locator("//select [@name='fromAccountId']").selectOption("62517");
  await page.getByRole("button", { name: "Send Payment" }).click();
  await expect(page.locator("[id='billpayResult'] h1")).toHaveText("Bill Payment Complete");

  //? view transaction
  await page.locator('//a[@href="findtrans.htm"]').click();
  await page.locator("[id='accountId']").selectOption("62517");
  await page.locator("[id='transactionDate']").fill("07-03-2026");
  await page.locator("//button[@class='button']").nth(1).click();
  await expect(page.locator("[id='resultContainer'] h1")).toHaveText("Transaction Results");

  //? update profile
  await page.locator('//a[@href="updateprofile.htm"]').click();
  await page.locator("[id='customer.address.city']").fill("rajajinagar");
  await expect(page.locator("[id='updateProfileResult'] h1")).toHaveText("Profile Updated");

  //? logout
  await page.locator('//a[@href="logout.htm"]').click();
});
