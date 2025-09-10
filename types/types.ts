import { Locator, Page } from "@playwright/test";

export interface IElements<A> {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: A;
}

export enum LightModeEnum {
  LIGHT = "light",
  DARK = "dark",
}
