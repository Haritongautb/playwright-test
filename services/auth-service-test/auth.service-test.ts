import { Page, test } from "@playwright/test";
export class AuthServiceTest {
  constructor(
    private readonly page: Page,
    private readonly baseUrl: string = process.env.TEST_BASE_URL!
  ) {}
}
