const { Builder, By } = require("selenium-webdriver");

(async function ResultsTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to results page
    await driver.get("http://localhost:3000/peoples_budget/results");

    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Click on Algo 1 button
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Algo 1')]"))
      .click();

    // Verify graph 1 is displayed
    let graph1 = await driver.findElement(By.id("algo1"));

    if (!graph1.isDisplayed()) {
      console.log("------------ Results: Algo1 test failed ------------");
    } else {
      console.log("------------ Results: Algo1 test passed ------------");
    }

    // Wait for graph to load
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Click on Algo 2 button
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Algo 2')]"))
      .click();

    // Verify graph 2 is displayed
    let graph2 = await driver.findElement(By.id("algo2"));

    if (!graph2.isDisplayed()) {
      console.log("------------ Results: Algo2 test failed ------------");
    } else {
      console.log("------------ Results: Algo2 test passed ------------");
    }

    // Wait for graph to load
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Click on Both button
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Both')]"))
      .click();

    // Verify graph 3 is displayed
    let graph3 = await driver.findElement(By.id("both"));

    if (!graph3.isDisplayed()) {
      console.log("------------ Results: Both test failed ------------");
    } else {
      console.log("------------ Results: Both test passed ------------");
    }

    // Wait for graph to load
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
})();
