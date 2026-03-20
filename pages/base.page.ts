import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async waitForVisible(locator: Locator, timeout = Number(process.env.DEFAULT_TIMEOUT)): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout }); 
  }

  async acceptDialog(timeout = 5000): Promise<string> {
    const dialog = await this.page.waitForEvent('dialog', { timeout });
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
