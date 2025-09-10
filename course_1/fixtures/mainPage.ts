import { test as base } from "@playwright/test";
import { MainPage } from "../models/MainPage";
import { elements } from "../../utils/data";

type MyFixtures = {
  mainPage: MainPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page, elements);
    await mainPage.openMainPage();

    await use(mainPage);
  },
});
export { expect } from "@playwright/test";
