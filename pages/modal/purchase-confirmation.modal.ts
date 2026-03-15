import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { config } from '../../config/env.config';

/**
 * Thank you / purchase confirmation modal (sweet-alert) shown after placing an order.
 * Displays: Id, Amount, Card Number, Name, Date.
 */
export class PurchaseConfirmationModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly successMessage = this.page.locator('.sweet-alert h2');
  readonly confirmationDetailsBlock = this.page.locator('.sweet-alert p');
  readonly confirmButton = this.page.locator('.sweet-alert button:has-text("OK")');

  async getSuccessMessage(): Promise<string> {
    await this.waitForVisible(this.successMessage);
    return (await this.successMessage.textContent()) ?? '';
  }

  async clickOk(): Promise<void> {
    await this.confirmButton.click();
  }
}
