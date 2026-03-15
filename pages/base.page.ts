import { Locator, Page } from '@playwright/test';
import { config } from '../config/env.config';

/**
 * Base page class with common functionality for all page objects.
 * Provides consistent navigation, waiting strategies, and dialog handling.
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async waitForVisible(locator: Locator, timeout = config.visibleTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async acceptDialog(timeout = 5000): Promise<string> {
    const dialog = await this.page.waitForEvent('dialog', { timeout });
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
