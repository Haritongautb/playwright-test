import { test, expect, Page, Locator } from "@playwright/test";
// I.
/* 
	1. Что такое name а getByRole("", {name: ""})
	Это читаемое пользователю имя элемента (accessible name).
	Обычно — тот текст, который ты видишь на кнопке/ссылке. Если текста нет, берётся из специальных атрибутов.
	Откуда берётся это “name”
	По упрощённым правилам ARIA, в таком порядке:
	 - aria-label="..."
	 - Текст внутри элемента (например, <button>Сохранить</button>)
	 - aria-labelledby="id" → текст связанного элемента
	 - alt у картинки внутри кнопки/ссылки
	 - Текст <label for="..."> для полей форм
	Важно: placeholder не считается именем.
	2.
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
// II. describe()
/* 
test.describe(...) в Playwright — это группа (сьют) тестов. Он сам ничего не тестирует; это контейнер, чтобы:
 - Сгруппировать связанные тесты под общим заголовком в репорте.
 - Задать общие хуки для группы: test.beforeAll/afterAll, test.beforeEach/afterEach.
 - Переопределить настройки/фикстуры для всех тестов внутри: test.use({...}).
 - Навесить общие аннотации: test.skip(...), test.fail(...), test.fixme(...) — сразу на всю группу.
 - Выбрать режим выполнения: параллельно/последовательно:
	- test.describe.parallel(...)
	- test.describe.serial(...) (тесты идут по очереди; при первом падении остальные в группе пропускаются)
	- или test.describe.configure({ mode: 'parallel' | 'serial' })
*/
// III. Аннотации
/* 
	Часто используемые
	не запускают тест вообще.
	1. test.skip() - Пропустить этот тест и не проверять его 
	не запускают тест вообще.
	2. test.fixme() - Тоже пропускает тест, но помечает его как «нужно починить» (отличается меткой в отчёте). Используют, когда тест сломан/фича недоделана.
	Запускает, но чтобы не было сообщений, нужно, чтобы в тесте реально была ошибка, иначе велезет красное сообщение - Expected to fail, but passed.
	3. test.fail() - Помечает тест как «ожидаемо падающий».
	Как это работает:
	 - Тест выполняется как обычно.
	 - Если внутри случается провал (ассерция упала / ошибка) — он считается EXPECTED FAIL и не краснит сборку.
	 - Если же тест вдруг прошёл, он помечается как unexpectedly passed (XPASS) и прогон считается ошибочным — чтобы ты убрал fail() и вернул тест к нормальному состоянию.
	Зачем:
	 - Держать сломанный тест в CI, но не ломать пайплайн, пока чинится баг/фича в работе.
	 - Фиксировать известные проблемы с пометкой причины.

	4. test.only() - Запускает в группе вуыскшиу только этот тест, других игнорит. Запускает один конкретный тест. Можно ставить сколько угодно only и тестирование будет только с этими only
*/
interface IElements<A> {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: A;
}
const elements: IElements<{ type: string; value: string }>[] = [
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
];
test.describe("Тесты главной страницы", () => {
  // test.beforeEach — это хук, который запускается перед каждым тестом test в текущей области (describe или файл). Иначе в каждом из test пришлось бы писать page.goto()
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });
  test("Проверка отображения элементов навигации", async ({ page }) => {
    // await page.goto("https://playwright.dev/");
    /* 
		test.step сам по себе ни на что не влияет — это чисто обёртка для репорта/трейса с названием шага. Остановится ли тест — зависит не от step, а от того, что происходит внутри шага.
		test.step — это способ логически сгруппировать кусок действий и дать ему имя.
		Шагает не браузером, а репортом: шаги видны в HTML-отчёте, в консоли при дебаге и в Trace Viewer. На поведение теста не влияет.
		Как работает:
		- Пишешь await test.step('Название шага', async () => { ... });
		- Всё внутри выполняется как обычно.
		- Если внутри случится ошибка/жёсткий expect — упадёт шаг и весь тест.
		- Можно вкладывать шаги и возвращать значение из шага.
		*/
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элементов навигации хедера ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test("Проверка названия элементов навигации header", async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () =>
          await expect.soft(locator(page)).toContainText(text));
      }
    });
    await expect(
      page.getByRole("link", { name: "Playwright logo Playwright" })
    ).toContainText("Playwright");
  });

  test("Проверка атрибутов href элементов навигации header", async ({
    page,
  }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка аттрибутов href элемента ${name}`, async () => {
          await expect
            .soft(locator(page))
            .toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test("Проверка переключения light mode", async ({ page }) => {
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
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toBeVisible();
    await expect.soft(page.getByRole("banner")).toContainText("Get started");
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toHaveAttribute("href", "/docs/intro");
  });
});
