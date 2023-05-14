const { Builder, By, Key, until } = require("selenium-webdriver");

(async function LoginTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to login page
    await driver.get("http://localhost:3000/peoples_budget/login");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // // Click on the "State Budget - 2022" button
    // await driver.findElement(By.id("budgetBtn")).click();

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    // Enter login credentials
    await driver.findElement(By.id("logId")).sendKeys("315649857");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await driver
      .findElement(By.id("logPassword"))
      .sendKeys("Password123", Key.RETURN);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // // Wait for the OldBudget component to render
    // await driver.wait(until.elementLocated(By.id("OldBudget")), 22000);

    // // Verify that the budget table is displayed
    // let totalBudget = await driver.findElement(By.id("budgetBtn")).getText();
    // if (totalBudget.isDisplayed()) {
    //   console.log("------------ Button test passed ------------");
    // } else {
    //   console.log("------------ Button test failed ------------");
    // }

    await new Promise((resolve) => setTimeout(resolve, 22000));

    // Navigate to Home page
    await driver.findElement(By.id("loginBtn")).click();

    // Wait for login to complete
    await driver.wait(
      until.urlIs("http://localhost:3000/peoples_budget/home"),
      10000
    );

    // Verify successful login
    let title = await driver.getTitle();
    if (title === "Home") {
      console.log("------------ Login test passed ------------");
    } else {
      console.log("------------ Login test failed ------------");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } finally {
    await driver.quit();
  }
})();
