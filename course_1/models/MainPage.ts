import { test, expect, Page } from "@playwright/test";
import { IElements, LightModeEnum } from "../../types/types";

export class MainPage {
  readonly page: Page;
  readonly elements: IElements<{ type: string; value: string }>[];

  constructor(
    page: Page,
    elements: IElements<{ type: string; value: string }>[]
  ) {
    this.page = page;
    this.elements = elements;
  }

  async openMainPage() {
    await this.page.goto("https://playwright.dev/");
  }

  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      test.step(`Проверка отображения элементов навигации хедера ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () =>
          await expect.soft(locator(this.page)).toContainText(text));
      }
    }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        test.step(`Проверка аттрибутов href элемента ${name}`, async () => {
          await expect
            .soft(locator(this.page))
            .toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  async clickSwitchLightModeIcon() {
    await this.page
      .getByRole("button", {
        name: "Switch between dark and light",
      })
      .click({ clickCount: 3 });
  }

  async checkDataThemeAttributeValue() {
    await expect
      .soft(this.page.locator("html"))
      .toHaveAttribute("data-theme", "light");
  }

  async setLightMode(value: LightModeEnum) {
    await this.page.locator("html").evaluate((el, value) => {
      el.setAttribute("data-theme", value);
    }, value);
  }

  async checkLayoutWidthLightMode(value: LightModeEnum) {
    await expect(this.page).toHaveScreenshot(`pageWidth${value}Mode.png`);
  }
}
