const { Builder, By } = require("selenium-webdriver");

(async function ResultsTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to results page
    await driver.get("http://localhost:3000/peoples_budget/results");

    await new Promise((resolve) => setTimeout(resolve, 20000));

    // Click on Algo 1 button
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Median Algorithm')]"))
      .click();

    // Verify graph 1 is displayed
    let graph1 = await driver.findElement(By.id("algo1"));

    if (graph1.isDisplayed()) {
      console.log("------------ Results: Algo1 test passed ------------");
    } else {
      console.log("------------ Results: Algo1 test failed ------------");
    }

    // Wait for graph to load
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Click on Algo 2 button
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Average Algorithm')]"))
      .click();

    // Verify graph 2 is displayed
    let graph2 = await driver.findElement(By.id("algo2"));

    if (graph2.isDisplayed()) {
      console.log("------------ Results: Algo2 test passed ------------");
    } else {
      console.log("------------ Results: Algo2 test failed ------------");
    }

    // Wait for graph to load
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
})();
