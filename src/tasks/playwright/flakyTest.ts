// Why is this flaky?
test("login", async ({ page }) => {
  page.click("#login");
  await page.fill("#user", "a");
  await page.fill("#pass", "b");
  await page.click("#submit");
