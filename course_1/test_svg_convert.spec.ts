import { test, expect } from "@playwright/test";

test("First step for testing svg convert", async ({ page }) => {
  await page.goto(process.env.TEST_BASE_URL!);
  await expect(
    page.locator(".yf_modal_content.yf_login_content")
  ).toBeVisible();
  await page.locator("#email").fill(process.env.TEST_EMAIL!);
  await page.locator("#password").fill(process.env.TEST_PASSWORD!);
  await page.locator("#_submit").click();

  await expect(
    page.locator(".yf_navbar_menu_profile"),
    "Login is success!"
  ).toBeVisible();
});
