import { test, expect } from "@playwright/test";
/* 
 - expect.soft(...) — это мягкая проверка в Playwright.
 - Что делает: если ассерция не проходит, тест не прерывается сразу, а продолжается дальше.
 - Как репортится: все ошибки мягких проверок накапливаются, и в конце тест всё равно пометится FAILED, если хотя бы одна soft-проверка упала.
 - Зчем нужно: удобно, когда хочешь проверить несколько независимых элементов и увидеть все несоответствия за один прогон, а не падать на первом.
*/
/* 
	Проверили элементы навигации
	на то, что они отображаются на странице - toBeVisible()
	имеют корректное название - toContainText();
	имеют корректные аттрибуты href, чтобы при клике на данные элементы совершался ожидаемый переход в ожидаемое место - toHaveAttribute("href", "/docs/intro");
	проверка клика и light-dark mode - .click({ clickCount: 3 }); .toHaveAttribute("data-theme", "light");
*/
test("Проверка отображения элементов навигации", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toBeVisible();
  await expect.soft(page.getByRole("link", { name: "Docs" })).toBeVisible();
  await expect.soft(page.getByRole("link", { name: "API" })).toBeVisible();
  await expect
    .soft(page.getByRole("button", { name: "Node.js" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Community" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "GitHub repository" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Discord server" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("button", { name: "Switch between dark and light" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("button", { name: "Search (Ctrl+K)" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("heading", { name: "Playwright enables reliable" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Star microsoft/playwright on" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "76k+ stargazers on GitHub" }))
    .toBeVisible();
});
test("Проверка названия элементов навигации header", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toContainText("Playwright");

  await expect
    .soft(page.getByLabel("Main", { exact: true }))
    .toContainText("Docs");
  await expect
    .soft(page.getByLabel("Main", { exact: true }))
    .toContainText("API");
  await expect
    .soft(page.getByLabel("Main", { exact: true }))
    .toContainText("Node.js");
  await expect
    .soft(page.getByLabel("Main", { exact: true }))
    .toContainText("Community");
});
test("Проверка атрибутов href элементов навигации header", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toHaveAttribute("href", "/");

  await expect
    .soft(page.getByRole("link", { name: "Docs" }))
    .toHaveAttribute("href", "/docs/intro");
  await expect
    .soft(page.getByRole("link", { name: "API" }))
    .toHaveAttribute("href", "/docs/api/class-playwright");
  await expect
    .soft(page.getByRole("link", { name: "Community" }))
    .toHaveAttribute("href", "/community/welcome");
  await expect
    .soft(page.getByRole("link", { name: "GitHub repository" }))
    .toHaveAttribute("href", "https://github.com/microsoft/playwright");
  await expect
    .soft(page.getByRole("link", { name: "Discord server" }))
    .toHaveAttribute("href", "https://aka.ms/playwright/discord");
});
test("Проверка переключения light mode", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  // или так
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click({ clickCount: 3 });
  // или так
  // await page
  //   .getByRole("button", { name: "Switch between dark and light" })
  //   .dblclick();
  await expect
    .soft(page.locator("html"))
    .toHaveAttribute("data-theme", "light");
});
test("Проверка заголовка страницы", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect
    .soft(page.getByRole("heading", { name: "Playwright enables reliable" }))
    .toBeVisible(); // проверка на данный элемент отображается на странице
  await expect
    .soft(page.getByRole("heading", { name: "Playwright enables reliable" }))
    .toContainText(
      "Playwright enables reliable end-to-end testing for modern web apps."
    ); // проверка наличии необходимого текста на этом элементе
  await page.getByRole("link", { name: "Get started" }).click();
});
test("Проверка кнопки Get started", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toBeVisible();
  await expect.soft(page.getByRole("banner")).toContainText("Get started");
  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toHaveAttribute("href", "/docs/intro");
});
