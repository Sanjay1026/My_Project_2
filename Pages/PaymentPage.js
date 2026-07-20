class Paymentpage {
  constructor(page) {
    this.paymentHeading = page.locator("[class='heading']");
    this.nameOnCard = page.locator("[data-qa='name-on-card']");
    this.cardNumber = page.locator("[name='card_number']");
    this.cvv = page.locator("[name='cvc']");
    this.expiryMonth = page.locator('[name="expiry_month"]');
    this.exipiryYear = page.locator('[name="expiry_year"]');
    // this.payButton = page.locator("#submit");
    this.payButton = page.getByRole("button", { name: "Pay and Confirm Order" });
    this.paymentSuccessMessage = page.getByText("Your order has been placed successfully!");
  }

  async fillCardDetails(cardname, cardnumber, cvv, month, year) {
    await this.nameOnCard.fill(cardname);
    await this.cardNumber.fill(cardnumber);
    await this.cvv.fill(cvv);
    await this.expiryMonth.fill(month);
    await this.exipiryYear.fill(year);
    await this.payButton.click();
  }
}

export default Paymentpage;
