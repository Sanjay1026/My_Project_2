class Registrationpage {
  constructor(page) {
    this.page = page;
    this.gender1 = page.locator("#id_gender1");
    this.gender2 = page.locator("#id_gender2");
    this.passwordTF = page.locator("#password");
    this.day = page.locator("#days");
    this.month = page.locator("#months");
    this.year = page.locator("#years");
    this.checkBox1 = page.locator("#newsletter");
    this.checkBox2 = page.locator("[name='optin']");
    this.firstNameTF = page.getByLabel("First name");
    this.lastNameTF = page.getByLabel("Last name");
    this.companyTF = page.locator("#company");
    this.address1TF = page.locator("#address1");
    this.address2TF = page.locator("#address2");
    this.countryTF = page.locator("#country");
    this.stateTF = page.locator("#state");
    this.cityTF = page.locator("#city");
    this.zipcodeTF = page.locator("#zipcode");
    this.phnoTF = page.locator("#mobile_number");
    this.createAccButton = page.locator("//button[@data-qa='create-account']");
  }

  // async fillRegisterpage(
  //   pwd,
  //   day,
  //   month,
  //   year,
  //   firstName,
  //   lastName,
  //   company,
  //   address,
  //   address2,
  //   country,
  //   state,
  //   city,
  //   zipcode,
  //   mobileNumber,
  // ) {
  //   await this.gender2.click();
  //   await this.password.fill(pwd);
  //   await this.day.selectOption(day);
  //   await this.month.selectOption(month);
  //   await this.year.selectOption(year);
  //   await this.checkBox1.check();
  //   await this.checkBox2.check();
  //   await this.firstNameTF.fill(firstName);
  //   await this.lastNameTF.fill(lastName);
  //   await this.companyTF.fill(companyName);
  //   await this.addressTF.fill(address);
  //   await this.address2TF.fill(address2);
  //   await this.country.selectOption(country);
  //   await this.state.fill(state);
  //   await this.city.fill(city);
  //   await this.zipcode.fill(zipcode);
  //   await this.phno.fill(mobileNumber);
  //   await this.createAccButton.click();
  // }

  async fillRegisterpage(data) {
    await this.gender2.click();
    await this.passwordTF.fill(data.password);
    await this.day.selectOption(data.day);
    await this.month.selectOption(data.month);
    await this.year.selectOption(data.year);
    await this.checkBox1.check();
    await this.checkBox2.check();
    await this.firstNameTF.fill(data.firstName);
    await this.lastNameTF.fill(data.lastName);
    await this.companyTF.fill(data.company);
    await this.address1TF.fill(data.address1);
    await this.address2TF.fill(data.address2);
    await this.countryTF.selectOption(data.country);
    await this.stateTF.fill(data.state);
    await this.cityTF.fill(data.city);
    await this.zipcodeTF.fill(data.zipcode);
    await this.phnoTF.fill(data.mobileNumber);
    await this.createAccButton.click();
  }
}

export default Registrationpage;
