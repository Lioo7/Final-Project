const { Builder, By, Key, until } = require("selenium-webdriver");

(async function LoginTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to login page
    await driver.get("http://localhost:3000/peoples_budget/login");
    await new Promise(resolve => setTimeout(resolve, 1000));


    // Enter login credentials
    await driver.findElement(By.id("logId")).sendKeys("315649785");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.id("logPassword")).sendKeys("PaSS@257254", Key.RETURN);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Navigate to Home page
    await driver.findElement(By.id('loginBtn')).click();

    // Wait for login to complete
    await driver.wait(until.urlIs("http://localhost:3000/peoples_budget/home"),10000);

    // Verify successful login
    let title = await driver.getTitle();
    if (title === "Login") {
      console.log("------------ Login test failed ------------");
    } else {
      console.log("------------ Login test passed ------------");
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // // Click on Sign up link
    // await driver.findElement(By.id("toSign")).click();

    // // Wait for logout to complete
    // await driver.wait(
    //   until.urlIs("http://localhost:3000/peoples_budget/sign_up"),
    //   10000
    // );

    // // Verify successful logout
    // title = await driver.getTitle();
    // if (title === "Login") {
    //   console.log("------------ Logout test2 passed ------------");
    // } else {
    //   console.log("------------ Logout test2 failed ------------");
    // }

  } finally {
    await driver.quit();
  }
})();

// assert.notStrictEqual(title, 'Login', 'Login test failed: title is still Login page');
