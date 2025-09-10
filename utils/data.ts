export const elements = [
  {
    locator: (page) =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo link",
    text: "Playwright",
    attribute: {
      type: "href",
      value: "/",
    },
  },
  {
    locator: (page) => page.getByRole("link", { name: "Docs" }),
    name: "Docs link",
    text: "Docs",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
  {
    locator: (page) => page.getByRole("link", { name: "API" }),
    name: "Api link",
    text: "API",
    attribute: {
      type: "href",
      value: "/docs/api/class-playwright",
    },
  },

  {
    locator: (page) => page.getByRole("link", { name: "Community" }),
    name: "Community link",
    text: "Community",
    attribute: {
      type: "href",
      value: "/community/welcome",
    },
  },
  {
    locator: (page) => page.getByRole("link", { name: "GitHub repository" }),
    name: "Github link",
    attribute: {
      type: "href",
      value: "https://github.com/microsoft/playwright",
    },
  },
  {
    locator: (page) => page.getByRole("link", { name: "Discord server" }),
    name: "Discord icon",
    attribute: {
      type: "href",
      value: "https://aka.ms/playwright/discord",
    },
  },
  {
    locator: (page) =>
      page.getByRole("button", { name: "Switch between dark and light" }),
    name: "Dark mode icon",
  },
  {
    locator: (page) => page.getByRole("button", { name: "Search (Ctrl+K)" }),
    name: "Search input",
  },
  {
    locator: (page) =>
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    name: "Main header",
  },
  {
    locator: (page) => page.getByRole("link", { name: "Get started" }),
    name: "Get started button",
  },
  {
    locator: (page) =>
      page.getByRole("link", { name: "Star microsoft/playwright on" }),
    name: "Star icon",
  },
  {
    locator: (page) =>
      page.getByRole("link", { name: "76k+ stargazers on GitHub" }),
    name: "Stargazer icon",
  },
  {
    locator: (page) =>
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    name: "Title",
    text: "Playwright enables reliable end-to-end testing for modern web apps.",
  },
  {
    locator: (page) => page.getByRole("link", { name: "Get started" }),
    name: "Get started button",
    text: "Get started",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
];

export const lightMods = ["light", "dark"];
